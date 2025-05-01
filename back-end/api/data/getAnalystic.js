import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getAnalystic = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks.toString();
  });
  req.on("end", async () => {
    try {
      let query_user = "SELECT COUNT(*) AS total_users FROM user";
      let query_user_active =
        "SELECT COUNT(*) AS total_users_active FROM user WHERE status_user = 1";
      let query_review = "SELECT COUNT(*) AS total_reviews FROM reviews";
      let query_course = "SELECT COUNT(*) AS total_courses FROM courses";
      const result_user = await connection.promise().query(query_user);
      const result_review = await connection.promise().query(query_review);
      const result_course = await connection.promise().query(query_course);
      const result_user_active = await connection
        .promise()
        .query(query_user_active);

      let inactive =
        result_user[0][0].total_users -
        result_user_active[0][0].total_users_active;
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        {
          users: result_user[0][0].total_users,
          active_users: result_user_active[0][0].total_users_active,
          inactive_users: inactive,
          reviews: result_review[0][0].total_reviews,
          courses: result_course[0][0].total_courses,
        },
        null,
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from analystic",
        null,
        500,
        null,
        "Error to select analystic"
      );
    }
  });
};

export default getAnalystic;
