import getUsersController from "../../controllers/userControllers/getUsersController.js";

const getUsers = (req, res) => {
  getUsersController(req, res);
};

export default getUsers;
