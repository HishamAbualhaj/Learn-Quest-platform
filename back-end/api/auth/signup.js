import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

let response = null;
let request = null;
let errDatabase = null;
async function isEmailFound(email) {
  try {
    const query = `SELECT * from user WHERE email = ?`;
    const result = await connection
      .promise()
      .query(query, [email], (err) => {
        errDatabase = err;
      })
      .then((data) => {
        return data;
      });
    const [data] = result;
    return data.length === 0 ? false : true;
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Internal server at isEmailFound : ",
      201,
      500,
      "",
      "Something went wrong"
    );
  }
}
export const signup = (req, res) => {
  response = res;
  request = req;
  let body = "";

  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
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
      (async () => {
        const isFound = await isEmailFound(email);
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
          const query = `INSERT INTO user (student_id,first_name, last_name, status_user, email, password, gender, birthdate)
          VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
          const student_id = Math.round(Math.random() * 100000000);
          connection.query(
            query,
            [
              student_id,
              first_name,
              last_name,
              status_user,
              email,
              password,
              gender,
              birthdate,
            ],
            (err) => {
              handleResponse(
                res,
                err,
                "Error inserting into user: ",
                201,
                500,
                "Sign up successfully !",
                "Something went wrong , try again"
              );
            }
          );
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
