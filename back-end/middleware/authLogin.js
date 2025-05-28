import handleResponse from "../utils/handleResponse.js";
import { validateSessionId } from "../api/system/session.js";
const authLogin = async (req, res, next) => {
  // check if user is logined in before any request
  const cookies = req.headers.cookie || "";
  let sessionId = "";

  if (cookies) {
    sessionId = cookies.match(/session_id=([\w\d]+)/)?.[1];
  }
  const isSessionId = await validateSessionId(sessionId, res, true);

  if (
    !isSessionId &&
    !(
      req.url === "/session" ||
      req.url === "/login" ||
      req.url === "/signup" ||
      req.url === "/auth/google" ||
      req.url === "/oauth2callback" ||
      req.url === "/forgotPass" ||
      req.url === "/verifyCode" ||
      req.url === "/resetPass"
    )
  ) {
    handleResponse(
      res,
      null,
      null,
      403,
      null,
      "Forbidden Request 403",
      null,
      null,
      false
    );
    return;
  } else {
    next();
  }
};

export default authLogin;
