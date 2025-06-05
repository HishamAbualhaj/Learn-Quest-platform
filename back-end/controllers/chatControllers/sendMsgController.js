import { sendMessgeModel } from "../../models/chatModel.js";
import handleResponse from "../../utils/handleResponse.js";

const sendMsgController = async ({ sender_id, receiver_id, msg }, res) => {
  try {
    if (!(sender_id && receiver_id && msg)) {
      return handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Empty chat data",
        null,
        null,
        false
      );
    }
    return await sendMessgeModel({ sender_id, receiver_id, msg });
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error sending message from chat at sendMsgController : ",
      null,
      500,
      null,
      "Error to send message"
    );
    return false;
  }
};

export default sendMsgController;
