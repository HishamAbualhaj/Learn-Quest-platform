import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
const getUsers = async (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });

  req.on("end", async () => {
    try {
      const { page } = JSON.parse(body);
      const query = `SELECT student_id,first_name,last_name,status_user,email,gender,birthdate,role,image_url,joined_at FROM user WHERE role != 'admin' ORDER BY joined_at DESC LIMIT ? OFFSET ?`;
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
        "Error selecting from users: ",
        null,
        500,
        null,
        "Error to select user"
      );
    }
  });
};

export default getUsers;
