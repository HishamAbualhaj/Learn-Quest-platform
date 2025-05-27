import handleResponse from "../../utils/handleResponse.js";
import { getCoursesSearchModel } from "../../models/courseModel.js";
const getCoursesAdminController = async (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });

  req.on("end", async () => {
    try {
      const { page } = JSON.parse(body);
      const result = await getCoursesSearchModel(null, null, page, 10);
      result[0].length === 0
        ? handleResponse(res, null, null, 200, null, result[0], null, null)
        : handleResponse(res, null, null, 200, null, result[0], null, page + 1);
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from courses for Admin: ",
        null,
        500,
        null,
        { msg: "Error to fetch courses" }
      );
    }
  });
};

export default getCoursesAdminController;
