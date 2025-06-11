import log from "../../api/system/logs.js";
import { setMaintenanceModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";
let response = "";
const setMaintenanceController = (req, res) => {
  response = res;
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const { student_id, email, first_name, status } = JSON.parse(body);

      await new Promise((res) => setTimeout(res, 5000));
      await setMaintenanceModel(status);
      await log(
        res,
        student_id,
        `${
          status
            ? `Admin: ${first_name} shut down system`
            : `Admin: ${first_name} run the system`
        }`,
        email
      );
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Maintenance process successfully set !",
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at setMaintenanceController : ",
        null,
        500,
        null,
        "Error setting maintenance"
      );
    }
  });
};

export default setMaintenanceController;
