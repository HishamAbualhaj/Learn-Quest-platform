import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
const logout = (req, res) => {
  const cookies = req.headers.cookie || "";
  let sessionId = "";
  if (cookies) {
    sessionId = cookies.match(/session_id=([\w\d]+)/)?.[1];
  }
  // if you were redirected to logout using url request
  if (!sessionId) {
    handleResponse(
      res,
      null,
      "",
      201,
      500,
      {
        loggedIn: false,
        msg: "No session to logout",
        userId: undefined,
      },
      ""
    );
    return;
  }
  deleteSession(sessionId, res);
};

async function deleteSession(sessionId, res) {
  try {
    const query = "DELETE FROM session WHERE session_id = ?";
    const result = await connection.promise().query(query, [sessionId]);
    handleResponse(
      res,
      null,
      "",
      201,
      500,
      {
        loggedIn: false,
        msg: "Successfully deleting session , redirecting ...",
        userId: undefined,
      },
      ""
    );
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error Deleting session: ",
      201,
      500,
      "",
      "Error to delete session"
    );
    return error;
  }
}
export default logout;
