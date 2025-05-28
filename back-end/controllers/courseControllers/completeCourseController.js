import handleResponse from "../../utils/handleResponse.js";
import log from "../../api/system/logs.js";
import {
  addMaterialCompleteionModel,
  countCourseMaterialCompletedModel,
  findMaterialModel,
  updateCourseProgressModel,
  updatMaterialCompleteionModel,
} from "../../models/courseModel.js";

const completeCourseController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    completeCourseQ(data, res);
  });
};

async function completeCourseQ(data, res) {
  try {
    const isFound = await findMaterialModel(data.id, data.user_id);
    if (!isFound[0].length) {
      await addMaterialCompleteionModel(data);

      await addToLog(data);
      return;
    }

    await updatMaterialCompleteionModel(data);

    await addToLog(data);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error updating coursematerials at completeCourseController : ",
      null,
      500,
      null,
      "Failed to check course video"
    );
  }

  async function addToLog({
    lessons,
    user_id,
    course_id,
    value,
    title,
    email,
    first_name,
  }) {
    lessons = lessons || 1;
    const countResult = await countCourseMaterialCompletedModel(
      user_id,
      course_id
    );
    let courseMaterialsCount = countResult[0][0]["COUNT(*)"] || 0;
    const progress = Math.round((courseMaterialsCount / lessons) * 100);
    await updateCourseProgressModel(progress, user_id, course_id);

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

export default completeCourseController;
