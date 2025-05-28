import { enrollCourseModel } from "../../models/courseModel.js";
import log from "../../api/system/logs.js";
import handleResponse from "../../utils/handleResponse.js";
import { checkCourseEnrollment } from "../courseControllers/getCourseDataController.js";
const enrollCourseController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    enrollCourseQ(JSON.parse(body), res);
  });
};

async function enrollCourseQ(
  { student_id, course_id, course_title, first_name, email },
  res
) {
  try {
    if (await checkCourseEnrollment(student_id, course_id)) {
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "YOU ARE ENROLLED ALREADY",
        null
      );
      return;
    }
    await enrollCourseModel(student_id, course_id);

    await log(
      res,
      student_id,
      `User: ${first_name} enrolled course : ${course_title} `,
      email
    );
    handleResponse(res, null, null, 200, null, "ENROLLED SUCCESSFULLY", null);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error enrolling course at enrollCourseController : ",
      null,
      500,
      null,
      "Failed to enroll course"
    );
  }
}
export default enrollCourseController;
