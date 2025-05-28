import {
  getCourseDataForReviewsModel,
  getCoursesSearchModel,
} from "../../models/courseModel.js";
import handleResponse from "../../utils/handleResponse.js";

const getCoursesController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const {
        page,
        search_text = null,
        select_data = null,
        role = null,
      } = JSON.parse(body);
      if (!page) {
        await getCourseDataForReviews(res);
        return;
      }
      const result = await getCoursesSearchModel(
        search_text,
        select_data,
        page
      );
      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from courses at getCoursesController : ",
        null,
        500,
        null,
        "Error to select course"
      );
    }
  });
};

async function getCourseDataForReviews(res) {
  try {
    const result = await getCourseDataForReviewsModel();
    handleResponse(res, null, null, 200, null, result[0], null, null);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from courses for Reviews: ",
      null,
      500,
      null,
      "Error to select course for Reviews"
    );
  }
}
export default getCoursesController;
