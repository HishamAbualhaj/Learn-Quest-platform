import connection from "../../config/db.js";
import {
  deleteSessionModel,
  updateUserStatusModel,
  validateSessionModel,
} from "../../models/systemModel.js";
import { getUsersModel } from "../../models/userModel.js";
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

    const resultUserIdQuery = await validateSessionModel(sessionId);
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

      const resultUserData = await getUsersModel(null, user_id);

      const [{ first_name, email }] = resultUserData[0];
      first_name_user = first_name;
      email_user = email;
      student_id = user_id;
    }

    await deleteSessionModel(sessionId);
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
    await updateUserStatusModel(user_id);
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
