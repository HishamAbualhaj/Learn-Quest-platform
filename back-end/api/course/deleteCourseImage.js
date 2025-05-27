import deleteImage from "../../utils/deleteImage.js";
async function deleteCourseImage(course_id) {
  const selectImageQuery = `SELECT image_url from courses WHERE course_id = ?`;
  const result = await connection
    .promise()
    .query(selectImageQuery, [course_id]);

  const [{ image_url }] = result[0];

  image_url && (await deleteImage(image_url));
}

export default deleteCourseImage;
