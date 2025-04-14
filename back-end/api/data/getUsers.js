import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
const getUsers = async (_, res) => {
  try {
    const query = `SELECT * FROM user`;
    const result = await connection.promise().query(query);
    handleResponse(res, null, "", 201, 500, result[0], "");
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from users: ",
      null,
      500,
      null,
      "Error to select user"
    );
  }
};

export default getUsers;
