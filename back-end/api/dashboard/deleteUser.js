import deleteUserController from "../../controllers/systemControllers/deleteUserController.js";

const deleteUser = (req, res) => {
  deleteUserController(req, res);
};

export default deleteUser;
