import { getMessagesModel } from "../../models/chatModel.js";
import handleResponse from "../../utils/handleResponse.js";

const getMsgController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { sender_id, receiver_id, page } = JSON.parse(body);
      if (!(sender_id && receiver_id)) {
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
      const result = await getMessagesModel(JSON.parse(body));
      return result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error getting message from chat at getMsgController : ",
        null,
        500,
        null,
        "Error to get message"
      );
    }
  });
};

export default getMsgController;
