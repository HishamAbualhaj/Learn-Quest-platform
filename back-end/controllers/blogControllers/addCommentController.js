import log from "../../api/system/logs.js";
import { addCommentModel } from "../../models/blogModel.js";
import handleResponse from "../../utils/handleResponse.js";
const addCommentController = (req, res) => {
  let body = "";

  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  req.on("end", async () => {
    try {
      const {
        student_id,
        email,
        first_name,
        blog_title,
        comment_text,
        blog_id,
      } = JSON.parse(body);
      if (!comment_text) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Comment can't be empty",
          null,
          null,
          false
        );
        return;
      }
      await addCommentModel({ student_id, comment_text, blog_id });
      await log(
        res,
        student_id,
        `User: ${first_name} added comment to blog ${blog_title}`,
        email
      );

      handleResponse(res, null, null, 200, null, "You added comment", null);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at addCommentController : ",
        null,
        500,
        null,
        "Error adding comment"
      );
    }
  });
};

export default addCommentController;
