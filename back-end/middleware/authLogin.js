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

  const publicRoutes = new Set([
    "/session",
    "/logout",
    "/login",
    "/signup",
    "/auth/google",
    "/oauth2callback",
    "/forgotPass",
    "/verifyCode",
    "/resetPass",
    "/getMaintenace",
    "/handleUploads",
    "/getCourses",
    "/getBlogData",
    "/uploads/"
  ]);

  const isPublic = publicRoutes.has(req.url);
  if (!isSessionId && !isPublic) {
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
