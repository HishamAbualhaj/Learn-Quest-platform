import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const getCourses = async (_, res) => {
  try {
    const query = `SELECT * FROM courses`;
    const result = await connection.promise().query(query);
    handleResponse(res, null, null, 200, null, result[0], null);
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error selecting from courses: ",
      null,
      500,
      null,
      "Error to select course"
    );
  }
};

export default getCourses;
