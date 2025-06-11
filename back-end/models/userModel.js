import connection from "../config/db.js";
import deleteImage from "../utils/deleteImage.js";
import getImageUrl from "../utils/getImageUrl.js";
const getUsersModel = async (page, student_id = null) => {
  let query = "";
  let result = "";
  if (!page) {
    query = `SELECT student_id,first_name,last_name,status_user,email,gender,birthdate,role,image_url,joined_at,course_joined FROM user WHERE student_id = ?`;
    result = await connection.promise().query(query, student_id);
  } else {
    query = `SELECT student_id,first_name,last_name,status_user,email,gender,birthdate,role,image_url,joined_at,course_joined FROM user WHERE role != 'admin' ORDER BY joined_at DESC LIMIT ? OFFSET ?`;
    result = await connection
      .promise()
      .query(query, [10, page === 1 ? 0 : (page - 1) * 5]);
  }

  return result;
};

const updateUserModel = async (
  student_id,
  first_name,
  last_name,
  email,
  birthdate,
  gender,
  image_url,
  isImageChange
) => {
  const reviewQuery = `UPDATE reviews SET image_url = ? WHERE student_id = ?`;

  const updateUserQuery = `UPDATE user 
    SET first_name = ?, last_name = ?, email = ?, gender = ?, birthdate = ? , image_url = ?
    WHERE student_id = ?`;

  const updateUserQueryNoImage = `UPDATE user 
    SET first_name = ?, last_name = ?, email = ?, gender = ?, birthdate = ? 
    WHERE student_id = ?`;

  if (isImageChange) {
    image_url = `${student_id}-${image_url}`;
    image_url = image_url.trim().replace(/\s+/g, "-");
    const oldImageUrl = await getImageUrl("user", "student_id", student_id);
    oldImageUrl && (await deleteImage(oldImageUrl));

    await connection
      .promise()
      .query(updateUserQuery, [
        first_name,
        last_name,
        email,
        gender,
        birthdate,
        image_url,
        student_id,
      ]);

    await connection.promise().query(reviewQuery, [image_url, student_id]);
  } else {
    await connection
      .promise()
      .query(updateUserQueryNoImage, [
        first_name,
        last_name,
        email,
        gender,
        birthdate,
        student_id,
      ]);
  }
};
const increaseCourseJoinedModel = async (student_id) => {
  const query =
    "UPDATE user set course_joined = course_joined + 1  WHERE student_id = ?";
  await connection.promise().query(query, [student_id]);
};

export { getUsersModel, updateUserModel, increaseCourseJoinedModel };
