import connection from "../../db/db.js";
import log from "../../system/logs.js";
import handleResponse from "../../utils/handleResponse.js";
let response = "";
const addReview = (req, res) => {
  response = res;
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const {
        student_id,
        email,
        first_name,
        course_title,
        review_text,
        course_id,
      } = JSON.parse(body);
      if (review_text.length == 0) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Review can't be empty",
          null,
          null,
          false
        );
        return;
      }

      if (!(await checkCourseEnrollment(student_id, course_id))) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "You should enroll this course to add review ...",
          null,
          null,
          false
        );
        return;
      }
      if (await checkHasReview(student_id, course_id)) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "You have already submited a review for this course",
          null,
          null,
          false
        );
        return;
      }
      const review_id = Math.round(Math.random() * 100000000);

      await insertReview(review_id, JSON.parse(body));
      await log(
        res,
        student_id,
        `User: ${first_name} added review to course ${course_title}`,
        email
      );
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Review added successfully !",
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body: ",
        null,
        500,
        null,
        "Error adding review"
      );
    }
  });
};
async function insertReview(
  review_id,
  { student_id, course_id, image_url, review_text, stars, first_name }
) {
  const query =
    "INSERT INTO reviews (review_id , student_id ,first_name, course_id , image_url ,review_text ,stars) VALUES (?,?,?,?,?,?,?)";
  await connection
    .promise()
    .query(query, [
      review_id,
      student_id,
      first_name,
      course_id,
      image_url,
      review_text,
      stars,
    ]);
}

async function checkHasReview(student_id, course_id) {
  const query =
    "SELECT review_id from reviews WHERE student_id = ? AND course_id = ?";

  const result = await connection
    .promise()
    .query(query, [student_id, course_id]);

  return result[0].length ? true : false;
}

async function checkCourseEnrollment(user_id, course_id) {
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
export default addReview;
