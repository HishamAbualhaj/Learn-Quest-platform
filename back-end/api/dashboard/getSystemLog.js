import getSystemLogController from "../../controllers/systemControllers/getSystemLogController.js";

const getSystemLog = async (req, res) => {
  getSystemLogController(req, res);
};

export default getSystemLog;
