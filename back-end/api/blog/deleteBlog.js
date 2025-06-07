import deleteBlogController from "../../controllers/blogControllers/deleteBlogController.js";

const deleteBlog = (req, res) => {
  deleteBlogController(req, res);
};

export default deleteBlog;
