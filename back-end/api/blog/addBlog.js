import addBlogController from "../../controllers/blogControllers/addBlogController.js";
const addBlog = (req, res) => {
  addBlogController(req, res);
};

export default addBlog;
