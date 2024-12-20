import connection from "../db/db.js";
import handleResponse from "../utils/handleResponse.js";

async function log(res, student_id, log_message, email) {
  try {
    const query = `INSERT INRO systemlogs VALUES (?,?,?,?)`;
    const log_id = Math.round(Math.random() * 100000000);
    const result = await connection
      .promise()
      .query(query, [log_id, student_id, log_message, email], (err) => {
        handleError(
          res,
          err,
          "Failed to insert log into system",
          201,
          500,
          "",
          "Something went wrong"
        );
      })
      .then((data) => {
        console.log("Data from logs : ", data)
      });
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error parsing request body: ",
      201,
      500,
      "Error to log into system"
    );
  }
}

export default log;
