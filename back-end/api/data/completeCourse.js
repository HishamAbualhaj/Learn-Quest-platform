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
  { user_id, course_id, email, first_name, id, value, title, lessons },
  res
) {
  try {
    let query_addMaterialCompleteion = "";
    let query_updatMaterialCompleteion = "";

    let query_findMaterial =
      "SELECT completeion_id from completeionMaterial WHERE material_id = ? AND student_id = ?";

    const isFound = await connection
      .promise()
      .query(query_findMaterial, [id, user_id]);

    if (!isFound[0].length) {
      const completeion_id = Math.round(Math.random() * 100000000);
      query_addMaterialCompleteion =
        "INSERT INTO completeionMaterial (completeion_id,student_id,material_id,course_id,isCompleted) VALUES (?,?,?,?,?)";

      await connection
        .promise()
        .query(query_addMaterialCompleteion, [
          completeion_id,
          user_id,
          id,
          course_id,
          !value,
        ]);

      await addToLog(lessons);
      return;
    }
    query_updatMaterialCompleteion =
      "UPDATE completeionMaterial SET isCompleted = ? WHERE material_id = ?";
    await connection
      .promise()
      .query(query_updatMaterialCompleteion, [!value, id]);

    await addToLog(lessons);
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

  async function addToLog(lessons) {
    let query_countCourseMaterialCompleted = `SELECT COUNT(*) FROM completeionmaterial where student_id = ? AND course_id = ? AND isCompleted = 1`;
    let query_updateCourseProgress = `UPDATE enrollments SET progress = ? WHERE course_id = ? AND student_id = ?`;
    const countResult = await connection
      .promise()
      .query(query_countCourseMaterialCompleted, [user_id, course_id]);
    let courseMaterialsCount = countResult[0][0]["COUNT(*)"] || 0;

    const progress = Math.round((courseMaterialsCount / lessons) * 100);
    await connection
      .promise()
      .query(query_updateCourseProgress, [progress, course_id, user_id]);

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
