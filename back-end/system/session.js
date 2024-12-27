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
      "",
      201,
      500,
      {
        loggedIn: false,
        msg: "No session found",
        userId: undefined,
      },
      ""
    );
    return;
  }
  (async () => {
    await validateSessionId(sessionId, res);
  })();
};

async function validateSessionId(sessionId, res) {
  try {
    const query =
      "SELECT user_id FROM session WHERE session_id = ? AND expires_at > NOW()";
    const result = await connection.promise().query(query, [sessionId]);
    if (result[0].length === 0) {
      handleResponse(
        res,
        null,
        "",
        201,
        500,
        {
          loggedIn: false,
          msg: "Session not found or expired.",
          userId: undefined,
        },
        ""
      );
      return;
    } else {
      const [{ user_id }] = result[0];
      handleResponse(
        res,
        null,
        "",
        201,
        500,
        {
          loggedIn: true,
          msg: "Successfully validating session , redirecting ...",
          userId: user_id,
        },
        ""
      );
    }
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error at selecting session",
      201,
      500,
      "",
      "Error at selecting session"
    );
    return error;
  }
}
export default session;
