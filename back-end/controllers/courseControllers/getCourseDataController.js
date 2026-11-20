import handleResponse from "../../utils/handleResponse.js";
import {
  checkCourseEnrollmentModel,
  getCourseNotEnrolledModel,
  getCoursesModel,
} from "../../models/courseModel.js";
const getCourseDataController = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", async () => {
    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: false, data: "Invalid request." }));
      return;
    }
    try {
      const { course_id, admin_edit } = payload;
      const user = req.authUser;
      const enrolled = await checkCourseEnrollment(user?.student_id, course_id);
      const canEdit = user?.role === "admin" && admin_edit === true;
      let course,
        materials,
        previews = [];
      if (enrolled || canEdit) {
        const [rows, lessons] = await getCoursesModel(
          course_id,
          user.student_id,
        );
        course = rows[0][0];
        materials = lessons[0];
      } else {
        const [rows, lessons, allowed] =
          await getCourseNotEnrolledModel(course_id);
        course = rows[0][0];
        materials = lessons[0];
        previews = allowed[0];
      }
      if (!course || (!canEdit && !course.published)) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: false, data: "Course not found." }));
        return;
      }
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        { msg: [course, materials, previews], enrolled },
        null,
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error loading course details",
        null,
        500,
        null,
        "Unable to load this course.",
      );
    }
  });
};
export async function checkCourseEnrollment(user_id, course_id) {
  if (!user_id) return false;
  const [rows] = await checkCourseEnrollmentModel(user_id, course_id);
  return rows.length > 0;
}
export default getCourseDataController;
