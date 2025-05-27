import deleteCourseController from "../../controllers/systemControllers/deleteCourseController.js";
const deleteCourse = (req, res) => {
  deleteCourseController(req, res);
};

export default deleteCourse;
