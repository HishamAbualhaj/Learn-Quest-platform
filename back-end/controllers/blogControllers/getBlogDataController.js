import { getBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const getBlogDataController = (req, res) => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const { page = null } = JSON.parse(body);
      const result = await getBlogModel(JSON.parse(body));
      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at getBlogDataController : ",
        null,
        500,
        null,
        "Error fetching blog"
      );
    }
  });
};

export default getBlogDataController;
