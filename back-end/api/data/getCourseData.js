import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
let response = null;
const getCourseData = (req, res) => {
  response = res;
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const { course_id } = JSON.parse(body);
    console.log(course_id);
    getCourseQ(course_id, res);
  });
};

async function getCourseQ(course_id, res) {
  try {
    const query = "SELECT * FROM courses WHERE course_id = ?";
    const query_2 = "SELECT * FROM coursematerials WHERE course_id = ?";
    const courseData = await connection.promise().query(query, [course_id]);
    const courseMaterial = await connection
      .promise()
      .query(query_2, [course_id]);
    console.log("Course Data ", courseData[0]);
    console.log("Course Materials Data ", courseMaterial[0]);
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
      res,
      null,
      "",
      201,
      500,
      {
        msg: [objData, courseMaterial[0]],
      },
      ""
    );
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error SELECT course data: ",
      201,
      500,
      "",
      {
        msg: "Error to SELECT Course Data",
      }
    );
  }
}

export default getCourseData;
