import { getCodeModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";
const confirmCode = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    const { code = null, email = null } = JSON.parse(body);

    try {
      const result = await getCodeModel(email);

      const [{ reset_token = null } = {}] = result[0];
      if (reset_token === code) {
        handleResponse(res, null, null, 200, null, true, null);
      } else {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Code is invalid",
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
        "Error resetting password: ",
        null,
        500,
        null,
        "Error to reset password"
      );
    }
  });
};

export default confirmCode;
