import connection from "../../db/db.js";
import log from "../../system/logs.js";
import handleResponse from "../../utils/handleResponse.js";
import { checkCourseEnrollment } from "./getCourseData.js";
const enrollCourse = (req, res) => {
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
        { msg: "YOU ARE ENROLLED ALREADY" },
        null
      );
      return;
    }

    const enrollment_id = Math.round(Math.random() * 100000000);
    let query =
      "INSERT INTO enrollments (enrollment_id,student_id,course_id,progress) VALUES (?,?,?,?)";

    await connection
      .promise()
      .query(query, [enrollment_id, student_id, course_id, 0]);
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
      "Error enrolling course",
      null,
      500,
      null,
      "Failed to enroll course"
    );
  }
}
export default enrollCourse;
