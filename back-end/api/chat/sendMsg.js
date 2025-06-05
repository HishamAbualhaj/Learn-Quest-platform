import sendMsgController from "../../controllers/chatControllers/sendMsgController.js";

const sendMsg = async (data, res) => {
  return await sendMsgController(data,res);
};

export default sendMsg;
