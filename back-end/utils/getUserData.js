import handleResponse from "./handleResponse.js";
import connection from "../config/db.js";
import { getUsersModel } from "../models/userModel.js";
function getUserData(req, response) {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", async () => {
    try {
      const { id } = JSON.parse(body);

      const result = await getUsersModel(null, id);

      const [data] = result;
      if (data.length === 0) {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          {
            data: undefined,
            msg: "No student found",
          },
          null
        );
      } else {
        handleResponse(
          response,
          null,
          null,
          200,
          null,
          {
            data: data,
            msg: "Successfully data fetched",
          },
          null
        );
      }
    } catch (error) {
      handleResponse(
        response,
        error,
        "Error Internal server at getUserData : ",
        null,
        500,
        null,
        "Something went wrong"
      );
    }
  });
}

export default getUserData;
