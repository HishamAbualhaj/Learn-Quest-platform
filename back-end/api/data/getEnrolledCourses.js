import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getEnrolledCourses = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { page, student_id, search_text, select_data } = JSON.parse(body);
      if (page < 1) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          { result: "Page number can't negative" },
          null,
          page
        );
      }
      const query_count = `SELECT COUNT(*) FROM enrollments e join courses c ON e.course_id = c.course_id WHERE student_id = ? 
      AND (
      ? IS NULL OR title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%', ?, '%')  
      ) 
      AND
      (
       (? IS NULL OR e.progress = 100) AND (? IS NULL OR c.stars > 4)
      )`;

      const query = `SELECT c.*,e.progress FROM enrollments e join courses c ON e.course_id = c.course_id 
      WHERE student_id = ?
      AND (
      ? IS NULL OR title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%',?, '%')  
      )
      AND
      (
       (? IS NULL OR e.progress = 100) AND (? IS NULL OR c.stars > 4)
      )
      ORDER BY created_date DESC LIMIT ? OFFSET ?`;

      const result = await connection
        .promise()
        .query(query, [
          student_id,
          search_text || null,
          search_text || null,
          search_text || null,
          select_data && (select_data === "Completed" ? "Completed" : null),
          select_data && (select_data === "Top-Rated" ? "Top-Rated" : null),
          4,
          page === 1 ? 0 : (page - 1) * 4,
        ]);

      const result_count = await connection
        .promise()
        .query(query_count, [
          student_id,
          search_text || null,
          search_text || null,
          search_text || null,
          select_data && (select_data === "Completed" ? "Completed" : null),
          select_data && (select_data === "Top-Rated" ? "Top-Rated" : null),
        ]);

      result[0].length === 0
        ? handleResponse(
            res,
            null,
            null,
            200,
            null,
            [result[0], result_count[0]],
            null,
            page
          )
        : handleResponse(
            res,
            null,
            null,
            200,
            null,
            [result[0], result_count[0]],
            null,
            page + 1
          );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from enrolled courses: ",
        null,
        500,
        null,
        "Error to select enrolled course"
      );
    }
  });
};

export default getEnrolledCourses;
