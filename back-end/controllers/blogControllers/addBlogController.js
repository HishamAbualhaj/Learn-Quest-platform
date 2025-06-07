import log from "../../api/system/logs.js";
import { addBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const addBlogController = () => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const { admin_id, title, email } = JSON.parse(body);
      await addBlogModel(JSON.parse(body));
      await log(res, admin_id, `Admin: added new blog ${title}`, email);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at addBlogController : ",
        null,
        500,
        null,
        "Error adding blog"
      );
    }
  });
};

export default addBlogController;
