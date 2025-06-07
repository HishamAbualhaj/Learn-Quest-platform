import editBlogController from "../../controllers/blogControllers/editBlogController.js";

const editBlog = (req, res) => {
  editBlogController(req, res);
};

export default editBlog;
