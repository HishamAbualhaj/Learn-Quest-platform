import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getReviews = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks.toString();
  });
  req.on("end", async () => {
    const { page, course_id } = JSON.parse(body);
    await getReviewsQ(res, page, course_id);
  });
};

async function getReviewsQ(res, page, course_id) {
  try {
    const query = `SELECT * FROM reviews WHERE course_id = ? ORDER BY  review_date DESC LIMIT ? OFFSET ? `;
    const result = await connection
      .promise()
      .query(query, [course_id, 5, page === 1 ? 0 : (page - 1) * 5]);

    result[0].length === 0
      ? handleResponse(res, null, null, 200, null, result[0], null, null)
      : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from reviews: ",
      null,
      500,
      null,
      "Error to select review"
    );
  }
}
export default getReviews;
