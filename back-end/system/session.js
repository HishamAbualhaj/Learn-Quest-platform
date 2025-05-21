import connection from "../db/db.js";
import handleResponse from "../utils/handleResponse.js";
const session = (req, res) => {
  const cookies = req.headers.cookie || "";
  let sessionId = "";

  if (cookies) {
    sessionId = cookies.match(/session_id=([\w\d]+)/)?.[1];
  }
  if (!sessionId) {
    handleResponse(
      res,
      null,
      null,
      200,
      null,
      {
        loggedIn: false,
        msg: "No session found",
        userId: undefined,
      },
      null
    );
    return;
  }

  validateSessionId(sessionId, res);
};

export async function validateSessionId(sessionId, res, check = false) {
  try {
    const query =
      "SELECT user_id FROM session WHERE session_id = ? AND expires_at > NOW()";
    const result = await connection.promise().query(query, [sessionId]);
    if (result[0].length === 0) {
      if (check) {
        // session not found
        return false;
      }
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        {
          loggedIn: false,
          msg: "Session not found or expired.",
          userId: undefined,
        },
        null
      );
    } else {
      if (check) {
        return true;
      }
      const [{ user_id }] = result[0];
      const query_fetch_data =
        "SELECT student_id,first_name,last_name,role,image_url,status_user,email,gender,birthdate,joined_at FROM user WHERE student_id = ?";
      const userData = await connection
        .promise()
        .query(query_fetch_data, [user_id]);
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        {
          loggedIn: true,
          msg: "Successfully validating session , redirecting ...",
          userData: userData[0],
        },
        null
      );
    }
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error at selecting session",
      null,
      500,
      null,
      "Error at selecting session"
    );
    return error;
  }
}
export default session;
