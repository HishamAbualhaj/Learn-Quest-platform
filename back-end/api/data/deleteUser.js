import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import archiveLog from "../../system/archiveLogs.js";
import deleteImage from "../../utils/deleteImage.js";
const deleteUser = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const { user_id } = JSON.parse(body);
    deleteUserQ(user_id, res);
  });
};

async function deleteUserQ(user_id, res) {
  try {
    const query = "DELETE FROM user WHERE student_id = ?";
    const get_name_query = `SELECT first_name,image_url from user WHERE student_id = ?`;
    const [data] = await connection.promise().query(get_name_query, [user_id]);
    const [{ first_name, image_url }] = data;
    await deleteImage(image_url);
    await archiveLog(
      res,
      user_id,
      "USER",
      `Admin: Deleted User ${first_name}`,
      email
    );
    await connection.promise().query(query, [user_id]);
    handleResponse(
      res,
      null,
      null,
      200,
      null,
      {
        isDeleted: true,
        msg: "User deleted Successfully, ",
      },
      null
    );
    return;
  } catch (error) {
    handleResponse(res, error, "Error Deleting user: ", null, 500, null, {
      isDeleted: false,
      msg: "User deletion failed, ",
    });
  }
}

export default deleteUser;
