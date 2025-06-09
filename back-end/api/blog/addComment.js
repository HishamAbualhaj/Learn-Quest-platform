import addCommentController from "../../controllers/blogControllers/addCommentController.js";
const addComment = (req, res) => {
  addCommentController(req, res);
};

export default addComment;
