const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

function load(relativePath) {
  const filename = path.resolve(__dirname, relativePath);
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = module.paths;
  loaded.require = (id) =>
    id === "@/config/config" ? { default: "/backend" } : require(id);
  loaded._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    filename,
  );
  return loaded.exports;
}
const { imageUrl } = load("../src/lib/imageUrl.ts");
const { apiResponse } = load("../src/lib/apiResponse.ts");

test("remote images bypass the backend uploads proxy", () => {
  const url =
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800";
  assert.equal(imageUrl(url), url);
  assert.equal(
    imageUrl(" https://example.com/avatar.jpg "),
    "https://example.com/avatar.jpg",
  );
});
test("uploaded filenames and public assets resolve without duplicate prefixes", () => {
  for (const value of [
    "photo.jpg",
    "uploads/photo.jpg",
    "/uploads/photo.jpg",
    "/backend/uploads/photo.jpg",
  ]) {
    assert.equal(imageUrl(value), "/backend/uploads/photo.jpg");
  }
  assert.equal(imageUrl("/person.png"), "/person.png");
  assert.equal(imageUrl(null, "/web.jpg"), "/web.jpg");
  assert.equal(imageUrl("https:/images.example.com/broken.jpg"), "/person.png");
});
test("proxy failures and invalid JSON produce usable errors", async () => {
  const unavailable = await apiResponse(
    new Response("Internal Server Error", { status: 502 }),
  );
  assert.equal(unavailable.status, false);
  assert.match(unavailable.msg, /temporarily unavailable/);
  assert.equal(unavailable.redirect, false);
  assert.equal(
    (await apiResponse(new Response("Not found", { status: 404 }))).msg,
    "Page is not found",
  );
  assert.match(
    (await apiResponse(new Response("not json"))).msg,
    /unexpected response/,
  );
});
test("API successes and validation errors preserve response data", async () => {
  const success = await apiResponse(
    Response.json({ status: true, data: [{ id: 1 }], nextPage: 2 }),
  );
  assert.deepEqual(success, {
    status: true,
    msg: [{ id: 1 }],
    redirect: true,
    nextPage: 2,
  });
  const failure = await apiResponse(
    Response.json({ status: false, data: "Invalid password" }),
  );
  assert.equal(failure.msg, "Invalid password");
  assert.equal(failure.redirect, false);
});
const { backendFetch, getBackendStatus, subscribeBackendStatus } = load(
  "../src/lib/backendStatus.ts",
);
test("backend transport reports 403, server failures and connection loss to the shared screen", async () => {
  const previousFetch = global.fetch;
  const previousWindow = global.window;
  global.window = {};
  let notifications = 0;
  const unsubscribe = subscribeBackendStatus(() => notifications++);
  try {
    for (const code of [403, 500, 503]) {
      global.fetch = async () => new Response("Failure", { status: code });
      await assert.rejects(
        backendFetch("/backend/test"),
        /temporarily unavailable/,
      );
    }
    global.fetch = async () => {
      throw new TypeError("fetch failed");
    };
    await assert.rejects(backendFetch("/backend/test"));
    assert.equal(getBackendStatus(), true);
    assert.equal(notifications, 4);
    global.fetch = async () =>
      Response.json({ status: false, data: "Invalid field" }, { status: 400 });
    const validation = await backendFetch("/backend/test");
    assert.equal(validation.status, 400);
    assert.equal(notifications, 4);
  } finally {
    unsubscribe();
    global.fetch = previousFetch;
    if (previousWindow === undefined) delete global.window;
    else global.window = previousWindow;
  }
});
