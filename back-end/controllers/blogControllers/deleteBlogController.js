import log from "../../api/system/logs.js";
import { deleteBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const deleteBlogController = () => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const { admin_id, title, email } = JSON.parse(body);
      await deleteBlogModel(JSON.parse(body));
      await log(res, admin_id, `Admin: deleted blog ${title}`, email);
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
