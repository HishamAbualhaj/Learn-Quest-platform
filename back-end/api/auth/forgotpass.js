import { sendRestEmail } from "../../services/mailer.js";
import handleResponse from "../../utils/handleResponse.js";
import isEmailFound from "../../utils/isEmailFound.js";
import connection from "../../config/db.js";
import crypto from "crypto";
const forgotPass = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    const { email } = JSON.parse(body);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 hour

    try {
      if (!(await isEmailFound(email, res))) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Email not Found",
          null,
          null,
          false
        );
        return;
      }
      let query =
        "UPDATE user SET reset_token = ? , reset_token_expires = ? WHERE email = ?";
      await connection.promise().query(query, [token, expires, email]);

      await sendRestEmail(email, token);

      handleResponse(res, null, null, 200, null, "Code sent to email", null);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error sending email: ",
        null,
        500,
        null,
        "Error to send code"
      );
    }
  });
};

export default forgotPass;
