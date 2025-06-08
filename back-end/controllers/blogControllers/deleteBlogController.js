import { deleteBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const deleteBlogController = (req, res) => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      await deleteBlogModel(JSON.parse(body));

      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Blog deleted successfully !",
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at deleteBlogController : ",
        null,
        500,
        null,
        "Error deleting blog"
      );
    }
  });
};

export default deleteBlogController;
