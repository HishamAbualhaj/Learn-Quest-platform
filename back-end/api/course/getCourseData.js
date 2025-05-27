import getCourseDataController from "../../controllers/courseControllers/getCourseDataController.js";

const getCourseData = (req, res) => {
  getCourseDataController(req, res);
};

export default getCourseData;
