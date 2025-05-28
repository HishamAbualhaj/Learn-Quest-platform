import { getUsersModel } from "../../models/userModel.js";
import handleResponse from "../../utils/handleResponse.js";
const getUsersController = async (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });

  req.on("end", async () => {
    try {
      const { page } = JSON.parse(body);
      const result = await getUsersModel(page);
      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from users at getUsersController : ",
        null,
        500,
        null,
        "Error to select user"
      );
    }
  });
};

export default getUsersController;
