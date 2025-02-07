import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getSystemLog = (req, res) => {
  (async () => {
    try {
      const query = `SELECT * FROM systemlogs ORDER BY created_date DESC`;
      const result = await connection.promise().query(query);
      handleResponse(res, null, "", 201, 500, result[0], "");
    } catch (error) {
      handleResponse(
        null,
        error,
        "Error selecting from systemlogs: ",
        201,
        500,
        "Error to select systemlogs"
      );
    }
  })();
};

export default getSystemLog;
