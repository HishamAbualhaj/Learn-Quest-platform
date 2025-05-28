import {
  authUserModel,
  getCodeModel,
  resetPassModel,
} from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";
import log from "../system/logs.js";
const resetPass = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    const { code = null, email = null, password = null } = JSON.parse(body);

    try {
      const result = await getCodeModel(email);
      const [{ reset_token = null } = {}] = result[0];

      const userData = await authUserModel(email, password, true);

      const [{ student_id, first_name } = {}] = userData[0];
      if (reset_token === code) {
        await resetPassModel(email, password);
        await log(
          res,
          student_id,
          `User: ${first_name} just reset password`,
          email
        );
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
