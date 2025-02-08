import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
const getUsers = (req, res) => {
  (async () => {
    try {
      const query = `SELECT * FROM user`;
      const result = await connection.promise().query(query);
      handleResponse(res, null, "", 201, 500, result[0], "");
    } catch (error) {
      handleResponse(
        null,
        error,
        "Error selecting from users: ",
        201,
        500,
        null,
        "Error to select user"
      );
    }
  })();
};

export default getUsers;
