import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import log from "../../system/logs.js";
import crypto from "crypto";
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
  req.on("end", () => {
    try {
      const { email, password } = JSON.parse(body);
      (async () => {
        // fetching for password if vaild or not
        const isAuth = await getId(email, password);
        if (isAuth) {
          const [{ student_id, first_name }] = isAuth;
          await log(
            response,
            student_id,
            `User: ${first_name} just Logined In`,
            email
          );
          // Handling session storage at database
          const generateSessionId = () => crypto.randomBytes(8).toString("hex");
          // Generating random session id
          const sessionId = generateSessionId();
          const expires = new Date(Date.now() + 3600000 * 24); // 1 day
          const isSession = await handleSession(sessionId, student_id, expires);
          if (isSession) {
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Set-Cookie": `session_id=${sessionId}; HttpOnly; Path=/; Max-Age=86400`,
            });
            res.end(
              JSON.stringify({
                status: true,
              })
            );
            return;
          }
        } else {
          handleResponse(
            response,
            null,
            "",
            201,
            500,
            "Email or password is incorrect",
            "",
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
        "",
        "Error to Sign up"
      );
    }
  });
};

async function getId(email, password) {
  try {
    const query =
      "SELECT student_id,first_name FROM user WHERE email = ? AND password = ?";
    const result = await connection.promise().query(query, [email, password]);
    const [data] = result;
    return data.length === 0 ? false : data;
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error Inserting user data : ",
      201,
      500,
      "",
      "Error to Insert user"
    );
    return error;
  }
}

async function handleSession(session_id, user_id, expires) {
  try {
    const query =
      "INSERT INTO session (session_id, user_id, expires_at) VALUES (?, ?, ?)";
    const result = await connection
      .promise()
      .query(query, [session_id, user_id, expires]);
    const [data] = result;
    return data.length === 0 ? false : data;
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Inserting sesssion data : ",
      201,
      500,
      "",
      "Error to Insert session"
    );
    return error;
  }
}

export default login;
