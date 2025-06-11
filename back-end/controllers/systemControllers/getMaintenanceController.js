import { getMaintenanceModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";
let response = "";
const getMaintenanceController = (req, res) => {
  response = res;
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const result = await getMaintenanceModel();
      handleResponse(res, null, null, 200, null, result[0], null);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at getMaintenanceController : ",
        null,
        500,
        null,
        "Error fetching maintenance"
      );
    }
  });
};

export default getMaintenanceController;
