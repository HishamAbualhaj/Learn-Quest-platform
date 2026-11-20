const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const { EventEmitter } = require("node:events");
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
const policy = load("back-end/middleware/accessPolicy.js");
const response = (
  res,
  err,
  _,
  success,
  failure,
  data,
  failData,
  nextPage = null,
  status = true,
) => {
  res.writeHead(err ? failure : success);
  res.end(
    JSON.stringify({
      status: err ? false : status,
      data: err ? failData : data,
      nextPage,
    }),
  );
};
function invoke(controller, body, authUser) {
  return new Promise((resolve, reject) => {
    const req = new EventEmitter();
    req.authUser = authUser;
    const res = {
      writeHead(code) {
        this.code = code;
      },
      end(raw) {
        resolve({ code: this.code, ...JSON.parse(raw) });
      },
    };
    try {
      controller(req, res);
      req.emit("data", JSON.stringify(body));
      req.emit("end");
    } catch (e) {
      reject(e);
    }
  });
}
const actor = {
  student_id: 7,
  role: "admin",
  first_name: "Alex",
  email: "alex@example.test",
};
test("public reads use exact paths and every learning mutation requires a session", () => {
  for (const route of [
    "/getCourseData",
    "/getBlogData",
    "/getReviews",
    "/getComments",
    "/getCourses",
    "/uploads/cover.jpg",
  ])
    assert.equal(policy.isPublicRequest(route), true, route);
  for (const route of [
    "/enrollCourse",
    "/addReview",
    "/addComment",
    "/completeCourse",
    "/updateUser",
    "/handleUploads",
    "/getUserData",
    "/getCoursesAdmin",
    "/getCoursesAnything",
    "/getBlogDataExtra",
  ])
    assert.equal(policy.isPublicRequest(route), false, route);
});
test("API rejects absent/expired sessions, permits admins as learners and restricts admin actions", async () => {
  let databaseCalls = 0;
  const { default: auth } = load("back-end/middleware/authLogin.js", {
    "../models/systemModel.js": {
      validateSessionModel: async (id) => {
        databaseCalls++;
        if (id === "outage") throw Error("unavailable");
        return [id === "valid" ? [{ user_id: 7 }] : []];
      },
    },
    "../models/userModel.js": { getUsersModel: async () => [[actor]] },
    "./accessPolicy.js": policy,
  });
  async function run(url, cookie = "") {
    const req = { url, headers: { cookie } };
    let status;
    let result;
    await auth(
      req,
      {
        writeHead(code) {
          status = code;
        },
        end(raw) {
          result = JSON.parse(raw);
        },
      },
      () => {
        result = "next";
      },
    );
    return { req, status, result };
  }
  for (const route of [
    "/enrollCourse",
    "/addReview",
    "/addComment",
    "/completeCourse",
    "/updateUser",
    "/handleUploads",
  ])
    assert.equal((await run(route)).status, 403);
  assert.equal(databaseCalls, 0);
  assert.equal((await run("/addComment", "session_id=expired")).status, 403);
  for (const route of ["/getCourseData", "/getReviews", "/getComments"])
    assert.equal((await run(route)).result, "next");
  const admin = await run("/addComment", "session_id=valid");
  assert.equal(admin.result, "next");
  assert.equal(admin.req.authUser.student_id, 7);
  assert.equal((await run("/addReview", "session_id=outage")).status, 503);
  assert.equal((await run("/getReviews", "session_id=outage")).result, "next");
  actor.role = "user";
  assert.equal((await run("/addCourse", "session_id=valid")).status, 403);
  assert.equal((await run("/enrollCourse", "session_id=valid")).result, "next");
  actor.role = "admin";
});
test("public course data ignores forged identity and role; locked URLs require enrollment or verified admin editing", async () => {
  let privateReads = 0;
  let checkedId;
  let enrolled = false;
  const course = { course_id: 1, title: "A course" };
  const models = {
    checkCourseEnrollmentModel: async (id) => {
      checkedId = id;
      return [enrolled ? [{ enrollment_id: 1 }] : []];
    },
    getCoursesModel: async () => {
      privateReads++;
      return [
        [[course]],
        [[{ title: "Private lesson", url: "private-video" }]],
      ];
    },
    getCourseNotEnrolledModel: async () => [
      [[course]],
      [[{ title: "Locked lesson" }]],
      [[{ title: "Preview", url: "preview-video" }]],
    ],
  };
  const { default: controller } = load(
    "back-end/controllers/courseControllers/getCourseDataController.js",
    {
      "../../utils/handleResponse.js": { default: response },
      "../../models/courseModel.js": models,
    },
  );
  const guest = await invoke(
    controller,
    { course_id: 1, student_id: 7, role: "admin", admin_edit: true },
    null,
  );
  assert.equal(guest.code, 200);
  assert.equal(guest.data.enrolled, false);
  assert.equal(privateReads, 0);
  assert.equal(checkedId, undefined);
  assert.equal(guest.data.msg[1][0].url, undefined);
  assert.equal(guest.data.msg[2][0].url, "preview-video");
  const admin = await invoke(controller, { course_id: 1 }, actor);
  assert.equal(admin.data.enrolled, false);
  assert.equal(checkedId, 7);
  assert.equal(privateReads, 0);
  const edit = await invoke(
    controller,
    { course_id: 1, admin_edit: true },
    actor,
  );
  assert.equal(edit.data.msg[1][0].url, "private-video");
  enrolled = true;
  const learner = await invoke(
    controller,
    { course_id: 1, student_id: 999 },
    actor,
  );
  assert.equal(learner.data.enrolled, true);
  assert.equal(checkedId, 7);
  const ordinary = await invoke(
    controller,
    { course_id: 1, admin_edit: true },
    { ...actor, role: "user" },
  );
  assert.equal(ordinary.data.enrolled, true);
  enrolled = false;
  const unprivileged = await invoke(
    controller,
    { course_id: 1, role: "admin", admin_edit: true },
    { ...actor, role: "user" },
  );
  assert.equal(unprivileged.data.msg[1][0].url, undefined);
});
test("comments and enrollment use the authenticated actor rather than posted user fields", async () => {
  let saved;
  const { default: comment } = load(
    "back-end/controllers/blogControllers/addCommentController.js",
    {
      "../../utils/handleResponse.js": { default: response },
      "../../api/system/logs.js": { default: async () => {} },
      "../../models/blogModel.js": {
        addCommentModel: async (data) => {
          saved = data;
        },
      },
    },
  );
  assert.equal(
    (
      await invoke(
        comment,
        {
          student_id: 999,
          first_name: "Forged",
          email: "forged",
          comment_text: "Hello",
          blog_id: 1,
        },
        actor,
      )
    ).status,
    true,
  );
  assert.equal(saved.student_id, 7);
  const { default: enroll } = load(
    "back-end/controllers/courseControllers/enrollCourseController.js",
    {
      "../../utils/handleResponse.js": { default: response },
      "../../api/system/logs.js": { default: async () => {} },
      "../courseControllers/getCourseDataController.js": {
        checkCourseEnrollment: async () => false,
      },
      "../../models/userModel.js": {
        increaseCourseJoinedModel: async () => {},
      },
      "../../models/courseModel.js": {
        enrollCourseModel: async (studentId) => {
          saved = studentId;
        },
      },
    },
  );
  assert.equal(
    (await invoke(enroll, { student_id: 999, course_id: 1 }, actor)).status,
    true,
  );
  assert.equal(saved, 7);
});
test("admin reviews follow the same enrollment rule and store the session identity", async () => {
  let saved;
  let enrolled = true;
  const { default: review } = load(
    "back-end/controllers/reviewControllers/addReviewController.js",
    {
      "../../utils/handleResponse.js": { default: response },
      "../../api/system/logs.js": { default: async () => {} },
      "../../controllers/courseControllers/getCourseDataController.js": {
        checkCourseEnrollment: async () => enrolled,
      },
      "../../utils/generateId.js": { default: () => 123 },
      "../../models/reviewModel.js": {
        checkHasReviewModel: async () => [[]],
        addReviewModel: async (...values) => {
          saved = values;
        },
        getCourseStarsModel: async () => [[{ avg: 5 }]],
        updateCourseStarModel: async () => {},
      },
    },
  );
  assert.equal(
    (
      await invoke(
        review,
        {
          student_id: 999,
          review_text: "Useful course",
          stars: 5,
          course_id: 1,
        },
        actor,
      )
    ).status,
    true,
  );
  assert.equal(saved[1], 7);
  enrolled = false;
  assert.equal(
    (
      await invoke(
        review,
        {
          student_id: 999,
          review_text: "Useful course",
          stars: 5,
          course_id: 1,
        },
        actor,
      )
    ).status,
    false,
  );
});
