import getBlogDataController from "../../controllers/blogControllers/getBlogDataController.js";
const getBlogData = (req, res) => {
  getBlogDataController(req, res);
};

export default getBlogData;
