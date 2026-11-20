const { test } = require("node:test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  Module = require("node:module"),
  ts = require("typescript");
function load(relative, mocks = {}) {
  const filename = path.resolve(__dirname, "..", relative);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const loaded = new Module(filename, module);
  loaded.filename = filename;
  loaded.paths = module.paths;
  loaded.require = (id) =>
    Object.hasOwn(mocks, id)
      ? mocks[id]
      : require(path.resolve(path.dirname(filename), id));
  loaded._compile(source, filename);
  return loaded.exports;
}
const flags = load("back-end/utils/publication.js");
test("publication accepts explicit booleans and rejects featured drafts and ambiguous values", () => {
  assert.deepEqual(flags.publicationFlags({}), {
    published: false,
    featured: false,
  });
  assert.deepEqual(flags.publicationFlags({ published: 1, featured: true }), {
    published: true,
    featured: true,
  });
  assert.throws(
    () => flags.publicationFlags({ published: false, featured: true }),
    /Publish/,
  );
  for (const value of ["false", "true", 2, null])
    assert.throws(() => flags.publicationFlags({ published: value }));
});
function model() {
  const calls = [];
  const db = {
    promise: () => ({
      query: async (sql, values) => {
        calls.push({ sql, values });
        return sql.startsWith("UPDATE") ? [{ affectedRows: 1 }] : [[]];
      },
    }),
  };
  const content = load("back-end/models/contentModel.js", {
    "../config/db.js": { default: db },
    "../utils/generateId.js": { default: () => 123 },
    "../utils/publication.js": flags,
  });
  return { content, calls, db };
}
test("landing includes only featured published records across all four content types", async () => {
  const { content, calls } = model();
  await content.landingContent();
  assert.equal(calls.length, 4);
  for (const call of calls)
    assert.match(call.sql, /WHERE published=1 AND featured=1/);
  assert.ok(calls.some((c) => c.sql.includes("FROM faqs")));
  assert.ok(calls.some((c) => c.sql.includes("FROM testimonials")));
});
test("visibility updates are parameterized, whitelist their target and never feature a draft", async () => {
  const { content, calls } = model();
  await assert.rejects(
    content.setVisibility("courses", 1, { published: false, featured: true }),
    /Publish/,
  );
  assert.equal(calls.length, 0);
  await assert.rejects(
    content.setVisibility("courses; DROP TABLE user", 1, {
      published: true,
      featured: false,
    }),
    /Unknown/,
  );
  await content.setVisibility("blogs", 22, {
    published: false,
    featured: false,
  });
  assert.deepEqual(calls[0].values, [0, 0, 22]);
  assert.match(
    calls[0].sql,
    /UPDATE blog SET published=\?,featured=\? WHERE blog_id=\?/,
  );
});
test("FAQ and testimonial validation happens before database writes", async () => {
  const { content, calls } = model();
  await assert.rejects(
    content.saveContent("faqs", { question: "", answer: "Answer" }),
    /question/,
  );
  await assert.rejects(
    content.saveContent("testimonials", {
      name: "A",
      role: "Learner",
      quote: "Useful",
      stars: 6,
    }),
    /Stars/,
  );
  assert.equal(calls.length, 0);
  await content.saveContent("faqs", {
    question: "A question?",
    answer: "An answer.",
    published: true,
    featured: true,
    sort_order: 2,
  });
  assert.deepEqual(calls[0].values, [
    123,
    "A question?",
    "An answer.",
    2,
    1,
    1,
  ]);
});
test("public blog reads exclude drafts; authorized admin view can list drafts", async () => {
  const { db, calls } = model();
  const blog = load("back-end/models/blogModel.js", {
    "../config/db.js": { default: db },
    "../utils/deleteImage.js": { default: async () => {} },
    "../utils/generateId.js": { default: () => 1 },
    "../utils/getImageUrl.js": { default: async () => null },
  });
  await blog.getBlogModel({ page: 1 });
  await blog.getBlogModel({ blog_id: 1 });
  await blog.getBlogModel({ page: 1, admin: true });
  assert.match(calls[0].sql, /published=1/);
  assert.match(calls[1].sql, /published=1 AND blog_id=\?/);
  assert.match(calls[2].sql, /WHERE 1=1/);
});
test("public course search and enrolled course lists exclude drafts", async () => {
  const { db, calls } = model();
  const course = load("back-end/models/courseModel.js", {
    "../config/db.js": { default: db },
    "../utils/generateId.js": { default: () => 1 },
  });
  await course.getCoursesSearchModel(null, null, 1);
  await course.getEnrolledCoursesModel(null, null, 1, 7);
  assert.match(calls[0].sql, /WHERE published=1/);
  assert.match(calls[1].sql, /c.published=1/);
  assert.match(calls[2].sql, /c.published=1/);
});

test("admin course listings retain access to drafts", async () => {
  const { db, calls } = model();
  const course = load("back-end/models/courseModel.js", {
    "../config/db.js": { default: db },
    "../utils/generateId.js": { default: () => 1 },
  });
  await course.getCoursesSearchModel(null, null, 1, 10, true);
  assert.match(calls[0].sql, /WHERE 1=1/);
});
