import { addUserModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";
import isEmailFound from "../../utils/isEmailFound.js";
import log from "../system/logs.js";
let response = null;
let request = null;
const signup = (req, res) => {
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
      const {
        first_name,
        last_name,
        status_user,
        email,
        password,
        gender,
        birthdate,
      } = JSON.parse(body);
      if (password.length < 8) {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          "Password should be more than 8 charcater",
          null,
          null,
          false
        );
        return;
      }

      const isFound = await isEmailFound(email, response);

      if (!(first_name && last_name && email && birthdate)) {
        handleResponse(
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
        return;
      }
      if (isFound) {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          "Email Already Found",
          null,
          null,
          false
        );
        return;
      } else {
        const student_id = Math.round(Math.random() * 100000000);
        const signup = signUpPromise(
          student_id,
          first_name,
          last_name,
          status_user,
          email,
          password,
          gender,
          birthdate
        );
        const intoLog = log(
          response,
          student_id,
          `User: ${first_name} just Signed Up`,
          email
        );
        Promise.all([signup, intoLog]).then(([]) => {
          handleResponse(
            response,
            null,
            null,
            200,
            null,
            "Sign up successfully !",
            null
          );
        });
      }
    } catch (error) {
      handleResponse(
        response,
        error,
        "Error parsing request body: ",
        null,
        500,
        null,
        "Error to Sign up"
      );
    }
  });
};

async function signUpPromise(
  student_id,
  first_name,
  last_name,
  status_user,
  email,
  password,
  gender,
  birthdate
) {
  try {
    await addUserModel(
      student_id,
      first_name,
      last_name,
      status_user,
      email,
      password,
      gender,
      birthdate
    );
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error inserting into user: ",
      null,
      500,
      null,
      "Error to sign up"
    );
    return error;
  }
}

export default signup;
