import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import log from "../../system/logs.js";
let response = null;
let request = null;
let errDatabase = null;

async function getId(email, password) {
  const query =
    "SELECT student_id,first_name FROM user WHERE email = ? AND password = ?";
  const result = await connection
    .promise()
    .query(query, [email, password], (err) => {
      console.error("Error at login :", err);
      handleResponse(
        response,
        err,
        "Error at selecting data ",
        201,
        500,
        "",
        "Something went wrong",
        false
      );
    })
    .then((data) => {
      return data;
    });
  const [data] = result;
  return data.length === 0 ? false : data;
}

export const login = (req, res) => {
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
      const { email, password } = JSON.parse(body);
      (async () => {
        // fetching for password if vaild or not
        const isAuth = await getId(email, password);
        if (isAuth) {
          const [{ student_id, first_name }] = isAuth;
          const intoLog = log(
            response,
            student_id,
            `User: ${first_name} just Logined In`,
            email
          );
          res.writeHead(201, {
            "Content-Type": "application/json",
          });
          res.end(
            JSON.stringify({
              student_id: student_id,
              result: true,
            })
          );
        } else {
          handleResponse(
            response,
            errDatabase,
            "Error selecting user email: ",
            201,
            500,
            "Email or password is incorrect",
            "Something went wrong",
            false
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
