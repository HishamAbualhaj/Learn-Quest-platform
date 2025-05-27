import { addLogModel } from "../../models/systemModel.js";
import handleResponse from "../../utils/handleResponse.js";

async function log(res, student_id, log_message, email) {
  try {
    await addLogModel(student_id, log_message, email);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error inserting into log: ",
      null,
      500,
      null,
      "Error system server"
    );
    return error;
  }
}
export default log;
