import { setVisibility } from "../../models/contentModel.js";
import { publicationFlags } from "../../utils/publication.js";
import log from "../../api/system/logs.js";
import { editBlogModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const editBlogController = (req, res) => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const visibility = publicationFlags(JSON.parse(body));
      const { admin_id, title, email, blog_id } = JSON.parse(body);
      await editBlogModel(JSON.parse(body));
      await log(res, admin_id, `Admin: updated blog ${title}`, email);

      await setVisibility("blogs", blog_id, visibility);
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        { msg: "Blog updated successfully !" },
        null,
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at editBlogController : ",
        null,
        500,
        null,
        "Error editing blog",
      );
    }
  });
};

export default editBlogController;
