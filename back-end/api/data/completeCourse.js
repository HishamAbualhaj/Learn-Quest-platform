import handleResponse from "../../utils/handleResponse.js";
import connection from "../../db/db.js";
import log from "../../system/logs.js";

const completeCourse = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    completeCourseQ(data, res);
  });
};

async function completeCourseQ(
  { user_id, email, first_name, id, value, title },
  res
) {
  try {
    let query =
      "UPDATE coursematerials SET isCompleted = ? WHERE material_id = ?";
    await connection.promise().query(query, [!value, id]);
    console.log("Value", !value);
    !value &&
      (await log(
        res,
        user_id,
        `User: ${first_name} completed course video : ${title} `,
        email
      ));

    handleResponse(res, null, null, 200, null, "UPDATED SUCCESSFULLY", null);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error updating coursematerials",
      null,
      500,
      null,
      "Failed to check course video"
    );
  }
}

export default completeCourse;
