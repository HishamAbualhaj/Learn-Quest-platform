import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getSystemLog = async (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { page } = JSON.parse(body);
      const query = `SELECT * FROM systemlogs ORDER BY created_date DESC  LIMIT ? OFFSET ?`;
      const result = await connection
        .promise()
        .query(query, [10, page === 1 ? 0 : (page - 1) * 5]);
        result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
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
  });
};

export default getSystemLog;
