import connection from "../../config/db.js";
import handleResponse from "../../utils/handleResponse.js";
import log from "../system/logs.js";

let response = "";
const logout = (req, res) => {
  response = res;
  const cookies = req.headers.cookie || "";
  let sessionId = "";
  if (cookies) {
    sessionId = cookies.match(/session_id=([\w\d]+)/)?.[1];
  }
  // if you were redirected to logout using url request
  if (!sessionId) {
    handleResponse(
      response,
      null,
      null,
      200,
      null,
      {
        loggedIn: false,
        msg: "No session to logout",
        userId: undefined,
      },
      null
    );
    return;
  }
  deleteSession(sessionId);
};

async function deleteSession(sessionId) {
  try {
    let student_id = null;
    let first_name_user = null;
    let email_user = null;
    const getUserIdQuery =
      "SELECT user_id FROM session WHERE session_id = ? AND expires_at > NOW()";
    const resultUserIdQuery = await connection
      .promise()
      .query(getUserIdQuery, [sessionId]);

    if (resultUserIdQuery[0].length === 0) {
      handleResponse(
        response,
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
      return;
    } else {
      const [{ user_id }] = resultUserIdQuery[0];
      const getUserData = `SELECT * FROM user WHERE student_id = ?`;
      const resultUserData = await connection
        .promise()
        .query(getUserData, [user_id]);

      const [{ first_name, email }] = resultUserData[0];
      first_name_user = first_name;
      email_user = email;
      student_id = user_id;
    }

    const deleteSessionQuery = "DELETE FROM session WHERE session_id = ?";
    await connection.promise().query(deleteSessionQuery, [sessionId]);
    await log(
      response,
      student_id,
      `User: ${first_name_user} just Logged Out`,
      email_user
    );
    await updateUserStatus(student_id);
    handleResponse(
      response,
      null,
      null,
      200,
      null,
      {
        loggedIn: false,
        msg: "Successfully deleting session , redirecting ...",
        userId: undefined,
      },
      null
    );
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Deleting session: ",
      null,
      500,
      null,
      "Error to delete session"
    );
    return error;
  }
}

async function updateUserStatus(user_id) {
  try {
    const query = "UPDATE USER SET status_user = ? WHERE student_id = ?";
    await connection.promise().query(query, [0, user_id]);
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Update user status : ",
      null,
      500,
      null,
      "Error to update user status"
    );
    return error;
  }
}

export default logout;
