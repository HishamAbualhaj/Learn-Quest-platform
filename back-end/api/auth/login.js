import handleResponse from "../../utils/handleResponse.js";
import log from "../system/logs.js";
import handleSession from "../../utils/handleSession.js";
import {
  authUserModel,
  updateUserStatusModel,
} from "../../models/systemModel.js";
let response = null;
let request = null;
const login = (req, res) => {
  response = res;
  request = req;
  let body = "";

  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const { email, password } = JSON.parse(body);

      if (!(email && password)) {
        return handleResponse(
          response,
          null,
          null,
          200,
          null,
          "Some fields are required",
          null,
          null,
          false
        );
      }
      // fetching for password if vaild or not
      const isAuth = await getId(email, password);

      if (isAuth) {
        const [{ student_id, first_name, role, login_method }] = isAuth;
        if (login_method === "google") {
          return handleResponse(
            response,
            null,
            null,
            200,
            null,
            "Use google login ",
            null,
            null,
            false
          );
        }
        role === "admin"
          ? await log(response, student_id, `Admin just Logined In`, email)
          : await log(
              response,
              student_id,
              `User: ${first_name} just Logined In`,
              email
            );

        await handleSession(student_id, res);
      } else {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          "Email or password is incorrect",
          null,
          null,
          false
        );
      }
    } catch (error) {
      handleResponse(
        response,
        error,
        "Error parsing request body at login : ",
        null,
        500,
        null,
        "Error to Login in"
      );
    }
  });
};

async function getId(email, password) {
  try {
    const result = await authUserModel(email, password);
    const [data] = result;
    return data.length === 0 ? false : data;
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Inserting user data at login: ",
      null,
      500,
      null,
      "Error to Insert user"
    );
    return error;
  }
}

export async function updateUserStatus(user_id) {
  try {
    await updateUserStatusModel(user_id, 1);
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
export default login;
