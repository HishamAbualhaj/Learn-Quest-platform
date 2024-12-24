import handleResponse from "./handleResponse.js";
import connection from "../db/db.js";
function getUserData(req, response) {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    try {
      const { id } = JSON.parse(body);
      (async () => {
        const query = `SELECT * from user WHERE student_id = ?`;
        const result = await connection.promise().query(query, [id]);
        const [data] = result;
        if (data.length === 0) {
          handleResponse(
            response,
            null,
            "",
            201,
            500,
            {
              data: undefined,
              msg: "No student found",
            },
            "Something went wrong"
          );
        } else {
          handleResponse(
            response,
            null,
            "",
            201,
            500,
            {
              data: data,
              msg: "Successfully data fetched",
            },
            "Something went wrong"
          );
        }
      })();
    } catch (error) {
      handleResponse(
        response,
        error,
        "Error Internal server at getUserData : ",
        201,
        500,
        "",
        "Something went wrong"
      );
    }
  });
}

export default getUserData;
