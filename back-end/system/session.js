import connection from "../db/db.js";
import handleResponse from "../utils/handleResponse.js";
const session = (req, res) => {
  const cookies = req.headers.cookie || "";
  let sessionId = "";
  if (!cookies) {
    console.log(cookies);
    sessionId = cookies
      .split("; ")
      .find((cookie) => {
        cookie.startsWith("session_id");
      })
      .split("=")[1];
  }
  if (!sessionId) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        loggedIn: false,
        msg: "No session found",
        userId: undefined,
      })
    );
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
    if (result.length === 0) {
      handleResponse(
        res,
        null,
        "Session not found or expired.",
        401,
        500,
        "",
        "Invalid session"
      );
      return;
    } else {
      handleResponse(
        res,
        null,
        "",
        201,
        500,
        "Successfully validating session , redirecting ...",
        ""
      );
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}
export default session;
