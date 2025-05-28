import handleResponse from "../../utils/handleResponse.js";
import {
  checkCourseEnrollmentModel,
  getCourseNotEnrolledModel,
  getCoursesModel,
} from "../../models/courseModel.js";
let response = null;
const getCourseDataController = (req, res) => {
  response = res;
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    const { course_id, student_id, role } = JSON.parse(body);

    if (role === "admin") {
      await getCourseQ(course_id, student_id, role);
      return;
    }
    if (await checkCourseEnrollment(student_id, course_id)) {
      await getCourseQ(course_id, student_id, role);
    } else {
      await getCourseQNotEnrolled(course_id);
    }
  });
};

async function getCourseQ(course_id, student_id) {
  try {
    const [courseData, courseDataMaterialCompletion] = await getCoursesModel(
      course_id,
      student_id
    );
    const [
      {
        title,
        description,
        price,
        discount,
        duration,
        category,
        tabs,
        image_url,
        lessons,
        created_date,
      },
    ] = courseData[0];

    const objData = {
      title,
      description,
      price,
      discount,
      duration,
      category,
      tabs,
      image_url,
      lessons,
      created_date,
    };

    handleResponse(
      response,
      null,
      null,
      200,
      null,
      {
        msg: [objData, courseDataMaterialCompletion[0]],
        enrolled: true,
      },
      null
    );
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error SELECT course data at getCourseDataController : ",
      null,
      500,
      null,
      "Error to SELECT Course Data"
    );
  }
}
async function getCourseQNotEnrolled(course_id) {
  try {
    const [courseData, courseMaterial, allowedCourseMaterial] =
      await getCourseNotEnrolledModel(course_id);
    const [
      {
        title,
        description,
        price,
        discount,
        duration,
        category,
        tabs,
        image_url,
        created_date,
      },
    ] = courseData[0];

    const objData = {
      title,
      description,
      price,
      discount,
      duration,
      category,
      tabs,
      image_url,
      created_date,
    };
    handleResponse(
      response,
      null,
      null,
      200,
      null,
      {
        msg: [objData, courseMaterial[0], allowedCourseMaterial[0]],
        enrolled: false,
      },
      null
    );
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error SELECT course data: ",
      null,
      500,
      null,
      "Error to SELECT Course Data"
    );
  }
}
export async function checkCourseEnrollment(user_id, course_id) {
  try {
    const result = await checkCourseEnrollmentModel(user_id, course_id);
    return Boolean(result[0].length);
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error SELECT enrollment data: ",
      null,
      500,
      null,
      "Error to SELECT enrollments"
    );
  }
}

export default getCourseDataController;
