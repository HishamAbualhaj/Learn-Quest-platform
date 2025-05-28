import { getSystemLogModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";

const getSystemLogController = async (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { page } = JSON.parse(body);
      const result = await getSystemLogModel(page);
      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from systemlogs at getSystemLogController : ",
        null,
        500,
        null,
        { msg: "Error to select systemlogs" }
      );
    }
  });
};

export default getSystemLogController;
