import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getCourses = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { page, search_text = null, select_data = null } = JSON.parse(body);
      if (!page) {
        await getCourseDataForReviews(res);
        return;
      }
      const query = `SELECT c.*,e.progress FROM enrollments e join courses c ON e.course_id = c.course_id 
      WHERE (
      ? IS NULL OR title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%',?, '%')  
      )
      AND
      (
       (? IS NULL OR c.price = 0) AND (? IS NULL OR c.price > 0) 
       AND (? IS NULL OR c.discount > 0) AND (? IS NULL OR c.stars > 4) 
      )
      ORDER BY created_date DESC LIMIT ? OFFSET ?`;

      const result = await connection
        .promise()
        .query(query, [
          search_text || null,
          search_text || null,
          search_text || null,
          select_data && (select_data === "Free" ? "Free" : null),
          select_data && (select_data === "Paid" ? "Paid" : null),
          select_data && (select_data === "Discount" ? "Discount" : null),
          select_data && (select_data === "Top-Rated" ? "Top-Rated" : null),
          5,
          page === 1 ? 0 : (page - 1) * 5,
        ]);

      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from courses: ",
        null,
        500,
        null,
        "Error to select course"
      );
    }
  });
};

async function getCourseDataForReviews(res) {
  try {
    const query = `SELECT course_id, title FROM courses ORDER BY created_date DESC`;
    const result = await connection.promise().query(query);
    handleResponse(res, null, null, 200, null, result[0], null, null);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from courses for Reviews: ",
      null,
      500,
      null,
      "Error to select course for Reviews"
    );
  }
}
export default getCourses;
