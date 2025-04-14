import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import log from "../../system/logs.js";
import deleteImage from "../../utils/deleteImage.js";
const updateCourse = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const {
        course_id,
        student_id,
        role,
        title,
        price,
        discount,
        category,
        image_url,
        tabs,
        description,
        materials,
      } = JSON.parse(body);
      await updateCourseDetails(
        course_id,
        student_id,
        title,
        price,
        discount,
        category,
        image_url,
        tabs,
        description,
        res
      );
      await updateCourseMaterials(course_id, materials);
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Course updated successfully!",
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
        "Error updating course"
      );
    }
  });
};

// Function to update course details
async function updateCourseDetails(
  course_id,
  student_id,
  title,
  price,
  discount,
  category,
  image,
  tabs,
  description,
  res
) {
  tabs = tabs.toString();
  let query = "";
  if (image) {
    image = `${course_id}-${image}`;
    query = `UPDATE Courses 
      SET title = ?, description = ?, price = ?, discount = ?, category = ?, tabs = ?, image_url = ?
      WHERE course_id = ?`;
    await deleteOldImage(course_id);
    await connection
      .promise()
      .query(query, [
        title,
        description,
        price,
        discount,
        category,
        tabs,
        image,
        course_id,
      ]);
  } else {
    query = `UPDATE Courses 
    SET title = ?, description = ?, price = ?, discount = ?, category = ?, tabs = ?
    WHERE course_id = ?`;
    await connection
      .promise()
      .query(query, [
        title,
        description,
        price,
        discount,
        category,
        tabs,
        course_id,
      ]);
  }

  await log(
    res,
    student_id,
    `Admin: Updated course : ${title}`,
    "admin@gmail.com"
  );
}

// Function to update course materials
async function updateCourseMaterials(course_id, data) {
  // Delete existing materials first
  const deleteQuery = `DELETE FROM coursematerials WHERE course_id = ?`;
  await connection.promise().query(deleteQuery, [course_id]);

  // Insert new materials
  const insertQuery = `INSERT INTO coursematerials (material_id, course_id, title, subtitle, url)
  VALUES (?, ?, ?, ?, ?)`;

  for (const obj of data) {
    const material_id = Math.round(Math.random() * 100000000);
    const { title, subtitle, url } = obj;
    await connection
      .promise()
      .query(insertQuery, [material_id, course_id, title, subtitle, url]);
  }
}

async function deleteOldImage(course_id) {
  const selectImageQuery = `SELECT image_url from courses WHERE course_id = ?`;
  const result = await connection
    .promise()
    .query(selectImageQuery, [course_id]);

  const [{ image_url }] = result[0];

  await deleteImage(image_url);
}

export default updateCourse;
