import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import archiveLog from "../../system/archiveLogs.js";
import deleteImage from "../../utils/deleteImage.js";
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

    const get_name_query = `SELECT title,image_url from courses WHERE course_id = ?`;
    const [data] = await connection
      .promise()
      .query(get_name_query, [course_id]);
    const [{ title, image_url }] = data;
    await deleteImage(image_url);
    await archiveLog(
      res,
      course_id,
      "COURSE",
      `Admin: Deleted Course ${title}`,
      "Admin@gmail.com"
    );
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
      msg: "Course deleted Failed, ",
    });
  }
}

export default deleteCourse;
