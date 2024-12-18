import connection from "../db/db";
import handleError from "../utils/handleError";

const log = (user_id,log_message,email) => {
  const query = `INSERT INRO systemlogs () VALUES (?,?,?,?,?) `;
  connection.query(query, [], (err) => {
    handleError(err, "Failed to insert log into system", 201, 500);
  });
};
