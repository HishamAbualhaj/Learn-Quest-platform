import getCommentsController from "../../controllers/blogControllers/getCommentsController.js";
const getComments = (req, res) => {
  getCommentsController(req, res);
};

export default getComments;
