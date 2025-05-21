import connection from "../../db/db.js";
import log from "../../system/logs.js";
import handleResponse from "../../utils/handleResponse.js";
let response = "";
const addCourse = (req, res) => {
  response = res;
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const course_id = Math.round(Math.random() * 100000000);

      await insertCourse(course_id, JSON.parse(body));
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        { msg: "Course added successfully !", id: course_id },
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body: ",
        null,
        500,
        null,
        { msg: "Error adding course" }
      );
    }
  });
};
async function insertCourse(
  course_id,
  {
    email,
    student_id,
    title,
    price,
    discount,
    category,
    image_url,
    tabs,
    description,
    materials,
  }
) {
  tabs = tabs.toString();

  let image = `${course_id}-${image_url}`;

  const query = `INSERT INTO courses (course_id,title, description, price, discount, category, tabs, image_url)
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

  let lessons = await insertCourseMaterial(
    materials,
    course_id,
    student_id,
    title,
    email
  );

  const query_add_lessons = `UPDATE courses SET lessons = ? WHERE course_id = ?`;

  await connection.promise().query(query_add_lessons, [lessons, course_id]);
}
async function insertCourseMaterial(data, course_id, student_id, title, email) {
  let lessons = 0;
  const query = `INSERT INTO coursematerials (material_id,course_id,title,subtitle,url)
  VALUES (?, ?, ?, ?, ?)`;
  for (const obj of data) {
    const material_id = Math.round(Math.random() * 100000000);
    const { title, subtitle, url } = obj;
    await connection
      .promise()
      .query(query, [material_id, course_id, title, subtitle, url]);

    lessons += 1;
  }

  await log(response, student_id, `Admin: Added course : ${title}`, email);
  return lessons;
}
export default addCourse;
