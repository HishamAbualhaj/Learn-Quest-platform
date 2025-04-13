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
    let query_addMaterialCompleteion = "";
    let query_updatMaterialCompleteion = "";

    let query_findMaterial =
      "SELECT completeion_id from completeionMaterial WHERE material_id = ? AND student_id = ?";

    const isFound = await connection.promise().query(query_findMaterial, [id,user_id]);

    if (!isFound[0].length) {
      const completeion_id = Math.round(Math.random() * 100000000);
      query_addMaterialCompleteion =
        "INSERT INTO completeionMaterial (completeion_id,student_id,material_id,isCompleted) VALUES (?,?,?,?)";
      
      await connection
        .promise()
        .query(query_addMaterialCompleteion, [
          completeion_id,
          user_id,
          id,
          !value,
        ]);

      await addToLog();
      return;
    }
    query_updatMaterialCompleteion =
      "UPDATE completeionMaterial SET isCompleted = ? WHERE material_id = ?";
    await connection
      .promise()
      .query(query_updatMaterialCompleteion, [!value, id]);

    await addToLog();
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

  async function addToLog() {
    !value &&
      (await log(
        res,
        user_id,
        `User: ${first_name} completed course video : ${title} `,
        email
      ));
    handleResponse(res, null, null, 200, null, "UPDATED SUCCESSFULLY", null);
  }
}

export default completeCourse;
