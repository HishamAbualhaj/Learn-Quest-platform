import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
const logout = (req, res) => {
  const cookies = req.headers.cookie || "";
  let sessionId = "";
  if (cookies) {
    sessionId = cookies.split("=")[1];
  }
  // if you were redirected to logout using url request
  if (!sessionId) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        loggedIn: false,
        msg: "No session to logout",
        userId: undefined,
      })
    );
    return;
  }
  deleteSession(sessionId, res);
};

async function deleteSession(sessionId, res) {
  try {
    const query = "DELETE FROM session WHERE session_id = ?";
    const result = await connection.promise().query(query, [sessionId]);
    console.log(result);
    handleResponse(
      res,
      null,
      "",
      201,
      500,
      "Successfully deleting session , redirecting ...",
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
