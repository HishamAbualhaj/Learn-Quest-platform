import handleResponse from "../../utils/handleResponse.js";
import archiveLog from "../../api/system/archiveLogs.js";
import deleteImage from "../../utils/deleteImage.js";
import { deleteCourseModel } from "../../models/systemModel.js";
const deleteCourseController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const { course_id } = JSON.parse(body);
    deleteCourseQ(course_id, res);
  });
};

async function deleteCourseQ(course_id, res) {
  try {
    const [title, image_url] = await deleteCourseModel(course_id);
    if (image_url) {
      await deleteImage(image_url);
    }
    await archiveLog(
      res,
      course_id,
      "COURSE",
      `Admin: Deleted Course ${title}`,
      "Admin@gmail.com"
    );

    handleResponse(
      res,
      null,
      null,
      200,
      null,
      {
        isDeleted: true,
        msg: "Course deleted Successfully, ",
      },
      null
    );
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error Deleting course at deleteCourseController : ",
      null,
      500,
      null,
      "Course deleted Failed, "
    );
  }
}

export default deleteCourseController;
