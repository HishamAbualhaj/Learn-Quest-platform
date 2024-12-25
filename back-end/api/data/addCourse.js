import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const addCourse = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
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
        tabs,
        description,
        materials,
      } = JSON.parse(body);

      (async () => {
        const course_id = Math.round(Math.random() * 100000000);
        await insertCourse(
          course_id,
          title,
          price,
          discount,
          category,
          image,
          tabs,
          description,
          materials
        );
        handleResponse(
          res,
          null,
          "",
          201,
          500,
          "Course added successfully !",
          ""
        );
      })();
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
async function insertCourse(
  course_id,
  title,
  price,
  discount,
  category,
  image,
  tabs,
  description,
  materials
) {
  tabs = tabs.toString();
  const query = `INSERT INTO Courses (course_id,title, description, price, discount, category, tabs, image_url)
    VALUES (?, ?, ?, ?, ?, ?,?,?)`;

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
  await insertCourseMaterial(materials, course_id);
}
async function insertCourseMaterial(data, course_id) {
  const query = `INSERT INTO coursematerials (material_id,course_id,title,subtitle,url)
  VALUES (?, ?, ?, ?, ?)`;
  for (const obj of data) {
    const material_id = Math.round(Math.random() * 100000000);
    const { title, subtitle, url } = obj;
    await connection
      .promise()
      .query(query, [material_id, course_id, title, subtitle, url]);
  }
}
export default addCourse;
