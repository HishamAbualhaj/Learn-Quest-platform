import deleteCourseImage from "../api/course/deleteCourseImage.js";
import connection from "../config/db.js";
const addUserModel = async (
  student_id,
  first_name,
  last_name,
  status_user,
  email,
  password,
  gender,
  birthdate
) => {
  const query = `INSERT INTO user (student_id,first_name, last_name, status_user, email, password, gender, birthdate)
  VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
  return await connection
    .promise()
    .query(query, [
      student_id,
      first_name,
      last_name,
      status_user,
      email,
      password,
      gender,
      birthdate,
    ]);
};

const addCourseModel = async (
  course_id,
  title,
  price,
  discount,
  category,
  image_url,
  tabs,
  description
) => {
  tabs = tabs.toString();

  const image = `${course_id}-${image_url}`;

  const addCourseQuery = `INSERT INTO courses (course_id,title, description, price, discount, category, tabs, image_url)
        VALUES (?, ?, ?, ?, ?, ?,?,?)`;

  return await connection
    .promise()
    .query(addCourseQuery, [
      course_id,
      title,
      description,
      price,
      discount,
      category,
      tabs,
      image,
    ]);
};

const addCourseMaterialModel = async (data, course_id) => {
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
  return;
};

const updateLessonModel = async (lessons, course_id) => {
  const updateLessonQuery = `UPDATE courses SET lessons = ? WHERE course_id = ?`;

  await connection.promise().query(updateLessonQuery, [lessons, course_id]);
};

const deleteCourseModel = async (course_id) => {
  const deleteCourseQuery = "DELETE FROM courses WHERE course_id = ?";

  const get_name_query = `SELECT title,image_url from courses WHERE course_id = ?`;
  const [data] = await connection.promise().query(get_name_query, [course_id]);
  const [{ title, image_url }] = data;
  await connection.promise().query(deleteCourseQuery, [course_id]);
  return [title, image_url];
};

const deleteUserModel = async (user_id) => {
  const deleteUserQuery = "DELETE FROM user WHERE student_id = ?";

  const get_name_query = `SELECT first_name,image_url,email from user WHERE student_id = ?`;
  const [data] = await connection.promise().query(get_name_query, [user_id]);
  const [{ first_name, image_url, email }] = data;
  await connection.promise().query(deleteUserQuery, [user_id]);
  return [first_name, image_url, email];
};

const getAnalysticModel = async () => {
  let query_user = "SELECT COUNT(*) AS total_users FROM user";
  let query_user_active =
    "SELECT COUNT(*) AS total_users_active FROM user WHERE status_user = 1";
  let query_review = "SELECT COUNT(*) AS total_reviews FROM reviews";
  let query_course = "SELECT COUNT(*) AS total_courses FROM courses";
  const result_user = await connection.promise().query(query_user);
  const result_review = await connection.promise().query(query_review);
  const result_course = await connection.promise().query(query_course);
  const result_user_active = await connection
    .promise()
    .query(query_user_active);

  return [result_user, result_review, result_course, result_user_active];
};

const getSystemLogModel = async (page) => {
  const query = `SELECT * FROM systemlogs ORDER BY created_date DESC  LIMIT ? OFFSET ?`;
  return await connection
    .promise()
    .query(query, [10, page === 1 ? 0 : (page - 1) * 5]);
};

const updateCourseMaterialsModel = async (course_id, data) => {
  let lessons = 0;
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
    lessons += 1;
  }

  return lessons;
};

const updateCourseModel = async (
  course_id,
  title,
  price,
  discount,
  category,
  image,
  tabs,
  description,
  lessons
) => {
  tabs = tabs.toString();
  let query = "";
  if (image) {
    image = `${course_id}-${image}`;
    query = `UPDATE courses 
      SET title = ?, description = ?, price = ?, discount = ?, category = ?, tabs = ?, image_url = ? , lessons = ?
      WHERE course_id = ?`;
    await deleteCourseImage(course_id);
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
        lessons,
        course_id,
      ]);
  } else {
    query = `UPDATE courses 
    SET title = ?, description = ?, price = ?, discount = ?, category = ?, tabs = ? , lessons = ?
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
        lessons,
        course_id,
      ]);
  }
};

const addLogModel = async (student_id, log_message, email) => {
  const query = `INSERT INTO systemlogs (log_id,student_id,message,email) VALUES (?,?,?,?)`;
  const log_id = Math.round(Math.random() * 100000000);
  return await connection
    .promise()
    .query(query, [log_id, student_id, log_message, email]);
};
const addArchiveLogModel = async (
  data_id,
  type = "LOG",
  log_message,
  email
) => {
  const query = `INSERT INTO archivesystemlogs (archive_id,data_id,type,message,email) VALUES (?,?,?,?,?)`;
  const log_id = Math.round(Math.random() * 100000000);
  return await connection
    .promise()
    .query(query, [log_id, data_id, type, log_message, email]);
};

const validateSessionModel = async (sessionId) => {
  const query =
    "SELECT user_id FROM session WHERE session_id = ? AND expires_at > NOW()";
  return await connection.promise().query(query, [sessionId]);
};

const addTokenUserModel = async (token, expires, email) => {
  const query =
    "UPDATE user SET reset_token = ? , reset_token_expires = ? WHERE email = ?";
  return await connection.promise().query(query, [token, expires, email]);
};

const getCodeModel = async (email) => {
  const getCodeQuery =
    "SELECT reset_token FROM user WHERE email = ? AND reset_token_expires > unix_timestamp(NOW()) * 1000";

  return await connection.promise().query(getCodeQuery, [email]);
};

const resetPassModel = async (email, password) => {
  const updatePassQuery = `UPDATE user set password = ? WHERE email = ?`;
  await connection.promise().query(updatePassQuery, [password, email]);

  const deleteTokenQuery = `UPDATE user set reset_token_expires = ? WHERE email = ?`;
  await connection
    .promise()
    .query(deleteTokenQuery, [Date.now() - 10000000, email]);

  return;
};

const updateUserStatusModel = async (user_id, value = 0) => {
  const query = "UPDATE user SET status_user = ? WHERE student_id = ?";
  return await connection.promise().query(query, [value, user_id]);
};

const deleteSessionModel = async (sessionId) => {
  const deleteSessionQuery = "DELETE FROM session WHERE session_id = ?";
  return await connection.promise().query(deleteSessionQuery, [sessionId]);
};

const authUserModel = async (email, password, isEmail = false) => {
  if (isEmail) {
    const query =
      "SELECT student_id,first_name,role,login_method FROM user WHERE email = ?";
    return await connection.promise().query(query, [email]);
  } else {
    const query =
      "SELECT student_id,first_name,role,login_method FROM user WHERE email = ? AND password = ?";
    return await connection.promise().query(query, [email, password]);
  }
};

const getAdminIdModel = async () => {
  const query =
    "SELECT student_id,first_name,last_name,image_url from user WHERE role = ?";
  return await connection.promise().query(query, ["admin"]);
};
export {
  addUserModel,
  addCourseModel,
  addCourseMaterialModel,
  updateLessonModel,
  deleteCourseModel,
  deleteUserModel,
  getAnalysticModel,
  getSystemLogModel,
  updateCourseMaterialsModel,
  updateCourseModel,
  addLogModel,
  addArchiveLogModel,
  validateSessionModel,
  addTokenUserModel,
  getCodeModel,
  resetPassModel,
  updateUserStatusModel,
  deleteSessionModel,
  authUserModel,
  getAdminIdModel,
};
