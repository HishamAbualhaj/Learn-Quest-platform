import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getSystemLog = async (_, res) => {
  try {
    const query = `SELECT * FROM systemlogs ORDER BY created_date DESC`;
    const result = await connection.promise().query(query);
    handleResponse(res, null, null, 200, null, result[0], null);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from systemlogs: ",
      null,
      500,
      null,
      "Error to select systemlogs"
    );
  }
};

export default getSystemLog;
