import connection from "../config/db.js";
const addReviewModel = async (
  review_id,
  student_id,
  course_id,
  image_url,
  review_text,
  stars,
  first_name
) => {
  const addReviewQuery =
    "INSERT INTO reviews (review_id , student_id ,first_name, course_id , image_url ,review_text ,stars) VALUES (?,?,?,?,?,?,?)";
  return await connection
    .promise()
    .query(addReviewQuery, [
      review_id,
      student_id,
      first_name,
      course_id,
      image_url,
      review_text,
      stars,
    ]);
};

const checkHasReviewModel = async (student_id, course_id) => {
  const query =
    "SELECT review_id from reviews WHERE student_id = ? AND course_id = ?";

  return await connection.promise().query(query, [student_id, course_id]);
};

const getReviewsModel = async (page, course_id) => {
  const query = `SELECT * FROM reviews WHERE course_id = ? ORDER BY  review_date DESC LIMIT ? OFFSET ? `;
  return await connection
    .promise()
    .query(query, [course_id, 5, page === 1 ? 0 : (page - 1) * 5]);
};

export { addReviewModel, checkHasReviewModel, getReviewsModel };
