import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const deleteCourse = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const { course_id } = JSON.parse(body);
    deleteCourseQ(course_id, res);
  });
};

async function deleteCourseQ(course_id, res) {
  try {
    const query = "DELETE FROM courses WHERE course_id = ?";
    const query_2 = `DELETE FROM coursematerials WHERE course_id = ?`;
    await connection.promise().query(query_2, [course_id]);
    await connection.promise().query(query, [course_id]);

    handleResponse(
      res,
      null,
      "",
      201,
      500,
      {
        isDeleted: true,
        msg: "Course deleted Successfully, ",
      },
      ""
    );
  } catch (error) {
    handleResponse(null, error, "Error Deleting course: ", 201, 500, "", {
      isDeleted: false,
      msg: "Course deleted Successfully, ",
    });
  }
}

export default deleteCourse;
