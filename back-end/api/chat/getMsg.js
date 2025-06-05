import getMsgController from "../../controllers/chatControllers/getMsgController.js";

const getMsg = (req, res) => {
  getMsgController(req, res);
};

export default getMsg;
