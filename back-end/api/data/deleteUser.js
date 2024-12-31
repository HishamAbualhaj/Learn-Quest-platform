import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const deleteUser = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const { course_id } = JSON.parse(body);
    deleteUserQ(course_id, res);
  });
};

async function deleteUserQ(course_id, res) {
  try {
    const query = "DELETE FROM user WHERE student_id = ?";
    await connection.promise().query(query, [course_id]);

    handleResponse(
      res,
      null,
      "",
      201,
      500,
      {
        isDeleted: true,
        msg: "User deleted Successfully, ",
      },
      ""
    );
  } catch (error) {
    handleResponse(null, error, "Error Deleting user: ", 201, 500, "", {
      isDeleted: false,
      msg: "User deleted Successfully, ",
    });
  }
}

export default deleteUser;
