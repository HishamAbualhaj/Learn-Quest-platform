import connection from "../db/db.js";
import handleResponse from "../utils/handleResponse.js";

async function archiveLog(res, data_id, type = "LOG", log_message, email) {
  try {
    const query = `INSERT INTO archiveSystemLogs (archive_id,data_id,type,message,email) VALUES (?,?,?,?,?)`;
    const log_id = Math.round(Math.random() * 100000000);
    return await connection
      .promise()
      .query(query, [log_id, data_id, type, log_message, email]);
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
