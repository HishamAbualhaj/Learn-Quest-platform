import connection from "../db/db.js";
import handleResponse from "../utils/handleResponse.js";

async function log(res, student_id, log_message, email) {
  try {
    const query = `INSERT INTO systemlogs (log_id,student_id,message,email) VALUES (?,?,?,?)`;
    const log_id = Math.round(Math.random() * 100000000);
    return await connection
      .promise()
      .query(query, [log_id, student_id, log_message, email]);
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