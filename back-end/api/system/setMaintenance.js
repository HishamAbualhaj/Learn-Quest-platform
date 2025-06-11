import setMaintenanceController from "../../controllers/systemControllers/setMaintenanceController.js";

const setMaintenance = (req, res) => {
  setMaintenanceController(req, res);
};

export default setMaintenance;
