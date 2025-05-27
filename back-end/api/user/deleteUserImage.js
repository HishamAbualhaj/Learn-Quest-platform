import deleteImage from "../../utils/deleteImage.js";
async function deleteUserImage(user_id) {
  const selectImageQuery = `SELECT image_url from user WHERE student_id = ?`;
  const result = await connection.promise().query(selectImageQuery, [user_id]);

  const [{ image_url }] = result[0];

  image_url && (await deleteImage(image_url));
}

export default deleteUserImage;
