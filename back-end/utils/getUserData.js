import handleResponse from "./handleResponse.js";
import connection from "../db/db.js";
function getUserData(req, response) {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { id } = JSON.parse(body);

      const query = `SELECT student_id,first_name,last_name,status_user,email,gender,birthdate,role,image_url,joined_at,login_method from user WHERE student_id = ?`;
      const result = await connection.promise().query(query, [id]);
      const [data] = result;
      if (data.length === 0) {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          {
            data: undefined,
            msg: "No student found",
          },
          null
        );
      } else {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          {
            data: data,
            msg: "Successfully data fetched",
          },
          null
        );
      }
    } catch (error) {
      handleResponse(
        response,
        error,
        "Error Internal server at getUserData : ",
        null,
        500,
        null,
        "Something went wrong"
      );
    }
  });
}

export default getUserData;
