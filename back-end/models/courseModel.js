import connection from "../config/db.js";
import generateId from "../utils/generateId.js";
const getCoursesSearchModel = async (
  search_text,
  select_data,
  page,
  maxData = 5
) => {
  const getCoursesQuery = `SELECT * FROM courses 
      WHERE (
      ? IS NULL OR title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%',?, '%')  
      )
      AND
      (
       (? IS NULL OR price = 0) AND (? IS NULL OR price > 0) 
       AND (? IS NULL OR discount > 0) AND (? IS NULL OR stars > 4) 
      )
      ORDER BY created_date DESC LIMIT ? OFFSET ?`;

  return await connection
    .promise()
    .query(getCoursesQuery, [
      search_text || null,
      search_text || null,
      search_text || null,
      select_data && (select_data === "Free" ? "Free" : null),
      select_data && (select_data === "Paid" ? "Paid" : null),
      select_data && (select_data === "Discount" ? "Discount" : null),
      select_data && (select_data === "Top-Rated" ? "Top-Rated" : null),
      maxData,
      page === 1 ? 0 : (page - 1) * 5,
    ]);
};
const getCourseDataForReviewsModel = async () => {
  const query = `SELECT course_id, title FROM courses ORDER BY created_date DESC`;
  return await connection.promise().query(query);
};
const checkCourseEnrollmentModel = async (user_id, course_id) => {
  const query = `SELECT enrollment_id FROM enrollments WHERE student_id = ? AND course_id = ?`;
  return await connection.promise().query(query, [user_id, course_id]);
};
const getCoursesModel = async (course_id, student_id) => {
  const getCourseDataQuery = "SELECT * FROM courses WHERE course_id = ?";

  const getCourseMaterialCompletionQuery = `SELECT     
                                  m.*,
                                  coalesce(c.isCompleted,0) AS isCompleted
                                  FROM      
                                  coursematerials m LEFT JOIN      
                                  completeionmaterial c ON m.material_id = c.material_id AND c.student_id = ? WHERE m.course_id = ? ORDER BY m.created_date ASC`;

  const courseData = await connection
    .promise()
    .query(getCourseDataQuery, [course_id]);

  const courseDataMaterialCompletion = await connection
    .promise()
    .query(getCourseMaterialCompletionQuery, [student_id, course_id]);

  return [courseData, courseDataMaterialCompletion];
};
const getCourseNotEnrolledModel = async (course_id) => {
  const query = "SELECT * FROM courses WHERE course_id = ?";

  const query_2 =
    "SELECT material_id,title,subtitle,isCompleted,created_date FROM coursematerials WHERE course_id = ? AND allowed = ? ORDER BY created_date ASC";

  const query_3 =
    "SELECT material_id,title,subtitle,isCompleted,url,created_date FROM coursematerials WHERE course_id = ? AND allowed = ? ORDER BY created_date ASC";

  const courseData = await connection.promise().query(query, [course_id]);

  const courseMaterial = await connection
    .promise()
    .query(query_2, [course_id, 0]);

  const allowedCourseMaterial = await connection
    .promise()
    .query(query_3, [course_id, 1]);

  return [courseData, courseMaterial, allowedCourseMaterial];
};
const getEnrolledCoursesModel = async (
  search_text,
  select_data,
  page,
  student_id
) => {
  const getCountQuery = `SELECT COUNT(*) FROM enrollments e join courses c ON e.course_id = c.course_id WHERE student_id = ? 
      AND (
      ? IS NULL OR title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%', ?, '%')  
      ) 
      AND
      (
       (? IS NULL OR e.progress = 100) AND (? IS NULL OR c.stars > 4)
      )`;

  const getEnrolledQuery = `SELECT c.*,e.progress FROM enrollments e join courses c ON e.course_id = c.course_id 
      WHERE student_id = ?
      AND (
      ? IS NULL OR title LIKE CONCAT('%',?,'%') OR description LIKE CONCAT('%',?, '%')  
      )
      AND
      (
       (? IS NULL OR e.progress = 100) AND (? IS NULL OR c.stars > 4)
      )
      ORDER BY created_date DESC LIMIT ? OFFSET ?`;

  const result = await connection
    .promise()
    .query(getEnrolledQuery, [
      student_id,
      search_text || null,
      search_text || null,
      search_text || null,
      select_data && (select_data === "Completed" ? "Completed" : null),
      select_data && (select_data === "Top-Rated" ? "Top-Rated" : null),
      4,
      page === 1 ? 0 : (page - 1) * 4,
    ]);

  const result_count = await connection
    .promise()
    .query(getCountQuery, [
      student_id,
      search_text || null,
      search_text || null,
      search_text || null,
      select_data && (select_data === "Completed" ? "Completed" : null),
      select_data && (select_data === "Top-Rated" ? "Top-Rated" : null),
    ]);

  return [result, result_count];
};
const findMaterialModel = async (material_id, student_id) => {
  const findMaterialQuery =
    "SELECT completeion_id from completeionmaterial WHERE material_id = ? AND student_id = ?";

  return await connection
    .promise()
    .query(findMaterialQuery, [material_id, student_id]);
};
const addMaterialCompleteionModel = async ({
  user_id,
  id,
  course_id,
  value,
}) => {
  const completeion_id = generateId();
  const addMaterialCompleteionQuery =
    "INSERT INTO completeionmaterial (completeion_id,student_id,material_id,course_id,isCompleted) VALUES (?,?,?,?,?)";

  return await connection
    .promise()
    .query(addMaterialCompleteionQuery, [
      completeion_id,
      user_id,
      id,
      course_id,
      !value,
    ]);
};
const updatMaterialCompleteionModel = async ({ value, id }) => {
  const updatMaterialCompleteionQuery =
    "UPDATE completeionmaterial SET isCompleted = ? WHERE material_id = ?";
  await connection.promise().query(updatMaterialCompleteionQuery, [!value, id]);
};
const countCourseMaterialCompletedModel = async (user_id, course_id) => {
  const countCourseMaterialCompletedQuery = `SELECT COUNT(*) FROM completeionmaterial where student_id = ? AND course_id = ? AND isCompleted = 1`;
  return await connection
    .promise()
    .query(countCourseMaterialCompletedQuery, [user_id, course_id]);
};
const updateCourseProgressModel = async (progress, user_id, course_id) => {
  const updateCourseProgressQuery = `UPDATE enrollments SET progress = ? WHERE course_id = ? AND student_id = ?`;
  return await connection
    .promise()
    .query(updateCourseProgressQuery, [progress, course_id, user_id]);
};
const enrollCourseModel = async (student_id, course_id) => {
  const enrollment_id = generateId();
  const query =
    "INSERT INTO enrollments (enrollment_id,student_id,course_id,progress) VALUES (?,?,?,?)";

  return await connection
    .promise()
    .query(query, [enrollment_id, student_id, course_id, 0]);
};
export {
  getCoursesSearchModel,
  getCourseDataForReviewsModel,
  checkCourseEnrollmentModel,
  getCoursesModel,
  getCourseNotEnrolledModel,
  getEnrolledCoursesModel,
  findMaterialModel,
  addMaterialCompleteionModel,
  updatMaterialCompleteionModel,
  countCourseMaterialCompletedModel,
  updateCourseProgressModel,
  enrollCourseModel,
};
