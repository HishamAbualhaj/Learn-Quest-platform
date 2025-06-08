import log from "../../api/system/logs.js";
import { addBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const addBlogController = (req, res) => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const { admin_id, title, email } = JSON.parse(body);
      const blog_id = await addBlogModel(JSON.parse(body));
      await log(res, admin_id, `Admin: added new blog ${title}`, email);

      handleResponse(
        res,
        null,
        null,
        200,
        null,
        { id: blog_id, msg: "Blog added successfully !" },
        null
      );
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
