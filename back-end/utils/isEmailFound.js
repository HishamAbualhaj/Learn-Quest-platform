import handleResponse from "./handleResponse.js";
import connection from "../db/db.js";
async function isEmailFound(email,response) {
  try {
    const query = `SELECT * from user WHERE email = ?`;
    const result = await connection
      .promise()
      .query(query, [email], (err) => {
        handleResponse(
          response,
          err,
          "Error at selecting data : ",
          201,
          500,
          "",
          "Something went wrong"
        );
      })
      .then((data) => {
        return data;
      });
    const [data] = result;
    console.log("Current data is ", data);
    return data.length === 0 ? false : true;
  } catch (error) {
    handleResponse(
      response,
      error,
      "Error Internal server at isEmailFound : ",
      201,
      500,
      "",
      "Something went wrong"
    );
  }
}

export default isEmailFound;
