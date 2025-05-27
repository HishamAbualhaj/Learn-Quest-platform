import handleResponse from "../../utils/handleResponse.js";
import { getReviewsModel } from "../../models/reviewModel.js";

const getReviewsController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks.toString();
  });
  req.on("end", async () => {
    const { page, course_id } = JSON.parse(body);
    await getReviewsQ(res, page, course_id);
  });
};

async function getReviewsQ(res, page, course_id) {
  try {
    const result = await getReviewsModel(page, course_id);
    result[0].length === 0
      ? handleResponse(res, null, null, 200, null, result[0], null, null)
      : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from reviews: ",
      null,
      500,
      null,
      "Error to select review"
    );
  }
}
export default getReviewsController;
