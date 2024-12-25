import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import log from "../../system/logs.js";
const addCourse = (req, res) => {
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
    console.log(body);
  });

  // Entire body has been received : no more data is coming
  req.on("end", () => {
    try {
      const {
        title,
        price,
        discount,
        category,
        image,
        description,
        materials,
      } = JSON.parse(body);
      console.log(materials);
      const query =
        `  INSERT INTO Courses (course_id,title, description, price, discount, category, tabs, image_url)
    VALUES (?, ?, ?, ?, ?, ?,?)`(async () => {
        
          await connection
            .promise()
            .query(query, [
              course_id,
              title,
              description,
              price,
              discount,
              category,
              tabs,
              image,
            ]);
        });
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body: ",
        201,
        500,
        "Error to add course"
      );
    }
  });
};

export default addCourse;
