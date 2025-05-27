import getCoursesAdminController from "../../controllers/courseControllers/getCoursesAdminController.js";
const getCoursesAdmin = async (req, res) => {
  getCoursesAdminController(req, res);
};

export default getCoursesAdmin;
