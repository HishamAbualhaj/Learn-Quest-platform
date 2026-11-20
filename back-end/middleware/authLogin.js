import { validateSessionModel } from "../models/systemModel.js";
import { getUsersModel } from "../models/userModel.js";
import {
  isPublicRequest,
  isAdminRequest,
  rejectRequest,
} from "./accessPolicy.js";
const authLogin = async (req, res, next) => {
  const path = new URL(req.url, "http://backend.local").pathname;
  const sessionId = (req.headers.cookie || "")
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith("session_id="))
    ?.slice("session_id=".length);
  req.authUser = null;
  try {
    if (sessionId) {
      const [sessions] = await validateSessionModel(sessionId);
      if (sessions[0]) {
        const [users] = await getUsersModel(null, sessions[0].user_id);
        const user = users[0];
        if (user) {
          const { student_id, first_name, last_name, email, image_url, role } =
            user;
          req.authUser = {
            student_id,
            first_name,
            last_name,
            email,
            image_url,
            role,
          };
        }
      }
    }
  } catch {
    if (!isPublicRequest(path)) {
      rejectRequest(
        res,
        503,
        "Unable to verify your session. Please try again.",
      );
      return;
    }
  }
  if (!req.authUser && !isPublicRequest(path)) {
    rejectRequest(res, 403, "Please sign in to continue.");
    return;
  }
  if (isAdminRequest(path) && req.authUser?.role !== "admin") {
    rejectRequest(res, 403, "Administrator access is required.");
    return;
  }
  next();
};
export default authLogin;
