import { addArchiveLogModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";

async function archiveLog(res, data_id, type = "LOG", log_message, email) {
  try {
    await addArchiveLogModel(data_id, (type = "LOG"), log_message, email);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error inserting into archive Log: ",
      null,
      500,
      null,
      "Error system server"
    );
    return error;
  }
}
export default archiveLog;
