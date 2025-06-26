import handleResponse from "../../utils/handleResponse.js";
import { getUsersModel } from "../../models/userModel.js";
import { validateSessionModel } from "../../models/systemModel.js";
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
    const result = await validateSessionModel(sessionId);
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

      const userData = await getUsersModel(null, user_id);

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
