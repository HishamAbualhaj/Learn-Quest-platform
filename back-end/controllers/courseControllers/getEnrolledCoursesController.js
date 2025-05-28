import handleResponse from "../../utils/handleResponse.js";
import { getEnrolledCoursesModel } from "../../models/courseModel.js";

const getEnrolledCoursesController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { page, student_id, search_text, select_data } = JSON.parse(body);
      if (page < 1) {
        handleResponse(
          res,
          null,
          null,
          200,
          null,
          { result: "Page number can't negative" },
          null,
          page
        );
      }
      const [result, result_count] = await getEnrolledCoursesModel(
        search_text,
        select_data,
        page,
        student_id
      );
      result[0].length === 0
        ? handleResponse(
            res,
            null,
            null,
            200,
            null,
            [result[0], result_count[0]],
            null,
            page
          )
        : handleResponse(
            res,
            null,
            null,
            200,
            null,
            [result[0], result_count[0]],
            null,
            page + 1
          );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from enrolled courses at getEnrolledCoursesController : ",
        null,
        500,
        null,
        "Error to select enrolled course"
      );
    }
  });
};

export default getEnrolledCoursesController;
