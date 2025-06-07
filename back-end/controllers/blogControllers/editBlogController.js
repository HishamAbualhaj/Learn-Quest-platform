import log from "../../api/system/logs.js";
import { editBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const editBlogController = () => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const { admin_id, title, email } = JSON.parse(body);
      await editBlogModel(JSON.parse(body));
      await log(res, admin_id, `Admin: edited blog ${title}`, email);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at editBlogController : ",
        null,
        500,
        null,
        "Error editing blog"
      );
    }
  });
};

export default editBlogController;
