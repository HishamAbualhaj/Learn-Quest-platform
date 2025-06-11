import getMaintenanceController from "../../controllers/systemControllers/getMaintenanceController.js";

const getMaintenance = (req, res) => {
  getMaintenanceController(req, res);
};

export default getMaintenance;
