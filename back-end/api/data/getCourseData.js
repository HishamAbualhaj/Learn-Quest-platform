import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
let response = null;
const getCourseData = (req, res) => {
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
      getCourseQ(course_id, student_id, role);
    } else {
      getCourseQNotEnrolled(course_id);
    }
  });
};

async function getCourseQ(course_id, student_id) {
  try {
    const query_getCourseData = "SELECT * FROM courses WHERE course_id = ?";

    const query_getCourseMaterialCompletion = `SELECT     
                                  m.*,
                                  coalesce(c.isCompleted,0) AS isCompleted
                                  FROM      
                                  coursematerials m LEFT JOIN      
                                  completeionmaterial c ON m.material_id = c.material_id AND c.student_id = ? WHERE m.course_id = ? ORDER BY m.created_date ASC`;

    const courseData = await connection
      .promise()
      .query(query_getCourseData, [course_id]);

    const courseDataMaterialCompletion = await connection
      .promise()
      .query(query_getCourseMaterialCompletion, [student_id, course_id]);

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
      "Error SELECT course data: ",
      null,
      500,
      null,
      {
        msg: "Error to SELECT Course Data",
      }
    );
  }
}
async function getCourseQNotEnrolled(course_id) {
  try {
    const query = "SELECT * FROM courses WHERE course_id = ?";

    const query_2 =
      "SELECT material_id,title,subtitle,isCompleted,created_date FROM coursematerials WHERE course_id = ? AND allowed = ? ORDER BY created_date ASC";

    const query_3 =
      "SELECT material_id,title,subtitle,isCompleted,url,created_date FROM coursematerials WHERE course_id = ? AND allowed = ? ORDER BY created_date ASC";

    const courseData = await connection.promise().query(query, [course_id]);

    const courseMaterial = await connection
      .promise()
      .query(query_2, [course_id, 0]);

    const allowedCourseMaterial = await connection
      .promise()
      .query(query_3, [course_id, 1]);
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
      {
        msg: "Error to SELECT Course Data",
      }
    );
  }
}
export async function checkCourseEnrollment(user_id, course_id) {
  try {
    const query = `SELECT enrollment_id FROM enrollments WHERE student_id = ? AND course_id = ?`;

    const result = await connection
      .promise()
      .query(query, [user_id, course_id]);

    return Boolean(result[0].length);
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error SELECT enrollment data: ",
      null,
      500,
      null,
      {
        msg: "Error to SELECT enrollments",
      }
    );
  }
}

export default getCourseData;
