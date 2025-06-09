import log from "../../api/system/logs.js";
import { getCommentsModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const getCommentsController = (req, res) => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const { blog_id, page } = JSON.parse(body);

      const result = await getCommentsModel(page, blog_id);

      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at getCommentsController : ",
        null,
        500,
        null,
        "Error fetching comments"
      );
    }
  });
};

export default getCommentsController;
