import handleResponse from "./handleResponse.js";
import connection from "../db/db.js";
async function isEmailFound(email, response) {
  try {
    const query = `SELECT student_id from user WHERE email = ?`;
    const result = await connection.promise().query(query, [email]);
    const [data] = result;
    return data.length === 0 ? false : { data };
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Internal server at isEmailFound : ",
      null,
      500,
      null,
      "Something went wrong"
    );
  }
}

export default isEmailFound;
