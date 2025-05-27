import getEnrolledCoursesController from "../../controllers/courseControllers/getEnrolledCoursesController.js";

const getEnrolledCourses = (req, res) => {
  getEnrolledCoursesController(req, res);
};

export default getEnrolledCourses;
