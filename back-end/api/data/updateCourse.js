import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import deleteImage from "../../utils/deleteImage.js";

const updateCourse = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
    console.log(body);
  });

  // Entire body has been received : no more data is coming
  req.on("end", () => {
    try {
      const {
        course_id,
        title,
        price,
        discount,
        category,
        image_url,
        tabs,
        description,
        materials,
      } = JSON.parse(body);

      (async () => {
        // First, update the course details
        await updateCourseDetails(
          course_id,
          title,
          price,
          discount,
          category,
          image_url,
          tabs,
          description
        );

        // Then update the associated course materials
        await updateCourseMaterials(course_id, materials);

        handleResponse(
          res,
          null,
          "",
          200,
          500,
          "Course updated successfully!",
          ""
        );
      })();
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body: ",
        400,
        500,
        "",
        "Error updating course"
      );
    }
  });
};

// Function to update course details
async function updateCourseDetails(
  course_id,
  title,
  price,
  discount,
  category,
  image,
  tabs,
  description
) {
  tabs = tabs.toString();
  image = `${course_id}-${image}`;

  const query = `UPDATE Courses 
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
