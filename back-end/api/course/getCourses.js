import getCoursesController from "../../controllers/courseControllers/getCoursesController.js";

const getCourses = (req, res) => {
  getCoursesController(req, res);
};

export default getCourses;
