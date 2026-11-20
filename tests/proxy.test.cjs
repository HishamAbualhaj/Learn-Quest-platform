const { test, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
require("next/dist/server/node-environment");
const { NextRequest } = require("next/server");
const {
  unstable_doesMiddlewareMatch,
} = require("next/experimental/testing/server");

// Load the real TypeScript proxy without adding a test runner dependency.
const filename = path.resolve(__dirname, "../src/proxy.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = module.paths;
loaded.require = (id) =>
  id === "./config/config"
    ? { API_SERVER_BASE_URL: "https://backend.test" }
    : require(id);
loaded._compile(compiled, filename);
const { proxy, config } = loaded.exports;
const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
});

function mockBackend({
  role,
  maintenance = 1,
  brokenSession = false,
  brokenMaintenance = false,
} = {}) {
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    const data = url.endsWith("/session")
      ? brokenSession
        ? null
        : {
            loggedIn: !!role,
            userData: role ? [{ student_id: 1, role, password: "secret" }] : [],
          }
      : brokenMaintenance
        ? null
        : [{ status: maintenance }];
    return Response.json({ status: true, data });
  };
  return calls;
}

function request(route, cookie = "") {
  return new NextRequest(`https://learn.test${route}`, { headers: { cookie } });
}
function redirectPath(response) {
  const location = response.headers.get("location");
  return location ? new URL(location).pathname : null;
}

test("guests can read course and blog details but private pages require login", async () => {
  const calls = mockBackend();
  assert.equal(redirectPath(await proxy(request("/student/allcourses"))), null);
  assert.equal(
    redirectPath(await proxy(request("/student/allcourses/1"))),
    null,
  );
  assert.equal(redirectPath(await proxy(request("/student/blog/1"))), null);
  for (const route of [
    "/student/profile",
    "/student/editprofile",
    "/student/mycourses",
    "/student/chat",
    "/dashboard",
    "/student/allcourses-private",
  ])
    assert.equal(redirectPath(await proxy(request(route))), "/login", route);
  assert.equal(redirectPath(await proxy(request("/login/"))), null);
  assert.ok(calls.every(({ url }) => url.endsWith("/getMaintenace")));
});

test("session and maintenance checks start concurrently with timeouts", async () => {
  const pending = [];
  global.fetch = (url, options) =>
    new Promise((resolve) => {
      assert.equal(options.cache, "no-store");
      assert.ok(options.signal instanceof AbortSignal);
      pending.push(() =>
        resolve(
          Response.json({
            status: true,
            data: url.endsWith("/session")
              ? { loggedIn: true, userData: [{ role: "user" }] }
              : [{ status: 1 }],
          }),
        ),
      );
    });
  const result = proxy(request("/student/mycourses", "session_id=valid"));
  assert.equal(pending.length, 2);
  pending.forEach((resolve) => resolve());
  assert.equal(redirectPath(await result), null);
});

test("role checks protect dashboard segments and allow real course details", async () => {
  mockBackend({ role: "user" });
  assert.equal(
    redirectPath(await proxy(request("/dashboard/users", "session_id=valid"))),
    "/",
  );
  mockBackend({ role: "admin" });
  for (const route of [
    "/dashboard/users",
    "/student/allcourses/1",
    "/student/blog/1",
    "/student/profile",
    "/student/editprofile",
    "/student/mycourses",
    "/student/chat",
  ]) {
    assert.equal(
      redirectPath(await proxy(request(route, "session_id=valid"))),
      null,
    );
  }
  assert.equal(
    redirectPath(await proxy(request("/dashboard-other", "session_id=valid"))),
    null,
  );
  assert.equal(
    redirectPath(await proxy(request("/login", "session_id=valid"))),
    "/",
  );
});

test("maintenance allows only its page and validated admin dashboard", async () => {
  mockBackend({ maintenance: 0 });
  assert.equal(redirectPath(await proxy(request("/"))), "/maintenance");
  assert.equal(redirectPath(await proxy(request("/maintenance"))), null);
  mockBackend({ role: "admin", maintenance: 0 });
  assert.equal(
    redirectPath(
      await proxy(request("/dashboard/maintenance", "session_id=valid")),
    ),
    null,
  );
  assert.equal(
    redirectPath(await proxy(request("/dashboard-other", "session_id=valid"))),
    "/maintenance",
  );
  mockBackend();
  assert.equal(redirectPath(await proxy(request("/maintenance"))), "/");
});

test("malformed checks fail safely without redirect loops", async () => {
  mockBackend({ brokenSession: true });
  assert.equal(
    redirectPath(await proxy(request("/dashboard", "session_id=bad"))),
    "/login",
  );
  mockBackend({ brokenMaintenance: true });
  const unavailable = await proxy(request("/"));
  assert.equal(redirectPath(unavailable), null);
  assert.equal(unavailable.status, 503);
  assert.equal(
    new URL(unavailable.headers.get("x-middleware-rewrite")).pathname,
    "/unavailable",
  );
  assert.equal((await proxy(request("/maintenance"))).status, 503);
});

test("connection failures show service unavailable without granting access or clearing session cookies", async () => {
  global.fetch = async () => {
    throw Object.assign(new Error("fetch failed"), {
      cause: { code: "ECONNREFUSED" },
    });
  };
  for (const route of ["/", "/login", "/dashboard", "/student/mycourses"]) {
    const response = await proxy(request(route, "session_id=existing"));
    assert.equal(response.status, 503);
    assert.equal(redirectPath(response), null);
    assert.equal(
      new URL(response.headers.get("x-middleware-rewrite")).pathname,
      "/unavailable",
    );
    assert.equal(response.headers.get("set-cookie"), null);
    assert.equal(response.headers.get("Retry-After"), "10");
  }
  assert.equal((await proxy(request("/unavailable"))).status, 200);
});

test("failed HTTP responses and invalid JSON cannot authorize a request", async () => {
  for (const failure of [
    () => new Response("failure", { status: 500 }),
    () => new Response("invalid json"),
  ]) {
    global.fetch = async (url) =>
      url.endsWith("/session")
        ? failure()
        : Response.json({ status: true, data: [{ status: 1 }] });
    assert.equal(
      redirectPath(await proxy(request("/dashboard", "session_id=bad"))),
      "/login",
    );
  }
});

test("current request receives validated session and backend-only fields stay private", async () => {
  mockBackend({ role: "user" });
  const response = await proxy(
    request("/student/mycourses", "session_id=valid; user-session=forged"),
  );
  const sessionCookie = response.cookies.get("user-session");
  assert.equal(JSON.parse(sessionCookie.value).userData[0].role, "user");
  assert.equal(JSON.parse(sessionCookie.value).userData[0].password, undefined);
  assert.equal(sessionCookie.httpOnly, true);
  assert.equal(sessionCookie.secure, true);
  assert.match(
    response.headers.get("x-middleware-request-cookie"),
    /user-session=/,
  );
  assert.ok(
    !response.headers.get("x-middleware-request-cookie").includes("forged"),
  );
  const unchanged = await proxy(
    request(
      "/student/mycourses",
      `session_id=valid; user-session=${encodeURIComponent(sessionCookie.value)}`,
    ),
  );
  assert.equal(unchanged.headers.get("set-cookie"), null);
});

test("a forged session cookie never grants access without a real session", async () => {
  mockBackend();
  const forged = encodeURIComponent(
    JSON.stringify({ loggedIn: true, userData: [{ role: "admin" }] }),
  );
  assert.equal(
    redirectPath(await proxy(request("/dashboard", `user-session=${forged}`))),
    "/login",
  );
});

test("logout clears session without backend checks", async () => {
  const calls = mockBackend();
  const response = await proxy(request("/logout", "user-session=stale"));
  assert.equal(calls.length, 0);
  assert.equal(response.cookies.get("user-session").value, "");
  assert.equal(redirectPath(response), null);
});

test("matcher skips backend and assets while retaining page requests", () => {
  for (const url of [
    "/backend/session",
    "/api/test",
    "/_next/static/a.js",
    "/favicon.ico",
    "/font.woff2",
    "/photo.webp",
  ]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, url }), false, url);
  }
  for (const url of [
    "/",
    "/dashboard/users",
    "/student/allcourses/1",
    "/apiary",
    "/backend-info",
  ]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, url }), true, url);
  }
});
