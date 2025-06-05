import { getAnalysticModel } from "../../models/systemModel.js";
import getUptime from "../../utils/getUptime.js";
import handleResponse from "../../utils/handleResponse.js";

const getAnalysticController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks.toString();
  });
  req.on("end", async () => {
    try {
      const [result_user, result_review, result_course, result_user_active] =
        await getAnalysticModel();
      let inactive =
        result_user[0][0].total_users -
        result_user_active[0][0].total_users_active;

      handleResponse(
        res,
        null,
        null,
        200,
        null,
        {
          users: result_user[0][0].total_users,
          active_users: result_user_active[0][0].total_users_active,
          inactive_users: inactive,
          reviews: result_review[0][0].total_reviews,
          courses: result_course[0][0].total_courses,
          time: getUptime(),
        },
        null,
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error selecting from analystic at getAnalysticController : ",
        null,
        500,
        null,
        "Error to select analystic"
      );
    }
  });
};

export default getAnalysticController;
