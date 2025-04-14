import handleResponse from "./handleResponse.js";
import connection from "../db/db.js";
async function isEmailFound(email, response) {
  try {
    const query = `SELECT * from user WHERE email = ?`;
    const result = await connection.promise().query(query, [email]);
    const [data] = result;
    return data.length === 0 ? false : true;
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
