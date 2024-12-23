import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import isEmailFound from "../../utils/isEmailFound.js";
import log from "../../system/logs.js";
let response = null;
let request = null;
let errDatabase = null;

const signup = (req, res) => {
  response = res;
  request = req;
  let body = "";
 
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
    console.log(body)
  });

  // Entire body has been received : no more data is coming
  req.on("end", () => {
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
      if(password.length < 8) {
        handleResponse(
          response,
          errDatabase,
          "Error selecting user email: ",
          201,
          500,
          "Password should be more than 8 charcater",
          "Something went wrong",
          false
        );
        return;
      }
      (async () => {
        const isFound = await isEmailFound(email, response);

        if (isFound) {
          handleResponse(
            response,
            errDatabase,
            "Error selecting user email: ",
            201,
            500,
            "Email Already Found",
            "Something went wrong",
            false
          );
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
              res,
              null,
              "Error handling two promises : ",
              201,
              500,
              "Sign up successfully !",
              "Something went wrong , try again"
            );
          });
        }
      })();
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body: ",
        201,
        500,
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
    const query = `INSERT INTO user (student_id,first_name, last_name, status_user, email, password, gender, birthdate)
  VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
    return await connection
      .promise()
      .query(query, [
        student_id,
        first_name,
        last_name,
        status_user,
        email,
        password,
        gender,
        birthdate,
      ]);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error inserting into user: ",
      201,
      500,
      "",
      "Error to sign up"
    );
    return error;
  }
}

export default signup;
