import getReviewsController from "../../controllers/reviewControllers/getReviewsController.js";

const getReviews = (req, res) => {
  getReviewsController(req, res);
};
export default getReviews;
