import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
const resetPass = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    const { code = null, email = null, password = null } = JSON.parse(body);

    try {
      const getCodeQuery =
        "SELECT reset_token FROM user WHERE email = ? AND reset_token_expires > unix_timestamp(NOW()) * 1000";

      const result = await connection.promise().query(getCodeQuery, [email]);
      const [{ reset_token = null } = {}] = result[0];

      if (reset_token === code) {
        const updatePassQuery = `UPDATE user set password = ? WHERE email = ?`;
        await connection.promise().query(updatePassQuery, [password, email]);

        const deleteTokenQuery = `UPDATE user set reset_token_expires = ? WHERE email = ?`;
        await connection
          .promise()
          .query(deleteTokenQuery, [Date.now() - 10000000, email]);
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Password has been updated ,,,, Redirecting",
          null
        );
      } else {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Can't reset password",
          null,
          null,
          false
        );
        return;
      }
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error confirming code: ",
        null,
        500,
        null,
        "Error to confirm code"
      );
    }
  });
};

export default resetPass;
