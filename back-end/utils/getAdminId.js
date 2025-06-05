import { getAdminIdModel } from "../models/systemModel.js";
import handleResponse from "./handleResponse.js";

function getAdminId(req, res) {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    const result = await getAdminIdModel();
    return handleResponse(res, null, null, 200, null, result[0], null);
  });
}

export default getAdminId;
