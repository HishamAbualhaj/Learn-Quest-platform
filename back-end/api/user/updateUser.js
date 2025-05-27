import updateUserController from "../../controllers/userControllers/updateUserController.js";
const updateUser = (req, res) => {
  updateUserController(req, res);
};

export default updateUser;
