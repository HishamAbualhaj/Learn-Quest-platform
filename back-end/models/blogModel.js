import connection from "../config/db.js";
import deleteImage from "../utils/deleteImage.js";
import generateId from "../utils/generateId.js";
import getImageUrl from "../utils/getImageUrl.js";
const getBlogModel = async ({ page, blog_id }) => {
  const query = "SELECT * from blog";
  if (page) {
    return await connection
      .promise()
      .query(query, [10, page === 1 ? 0 : (page - 1) * 5]);
  } else {
    const query = "SELECT * from blog WHERE blog_id = ?";
    return await connection.promise().query(query, [blog_id]);
  }
};
const addBlogModel = async ({ title, subtitle, content, image_url }) => {
  const blog_id = generateId();
  const addBlogQuery =
    "INSERT INTO blog (blog_id,title,subtitle,content,image_url) VALUES (?,?,?,?,?)";

  await connection
    .promise()
    .query(addBlogQuery, [blog_id, title, subtitle, content, image_url]);

  return blog_id;
};
const editBlogModel = async ({
  blog_id,
  title,
  subtitle,
  content,
  image_url,
}) => {
  let editBlogQuery = "";
  if (image_url) {
    image_url = `${blog_id}-${image_url}`;

    editBlogQuery =
      "UPDATE blog set title = ? , subtitle = ? , content = ? , image_url = ?";

    const oldImageUrl = await getImageUrl("blog", "blog_id", blog_id);
    oldImageUrl && (await deleteImage(oldImageUrl));

    return await connection
      .promise()
      .query(editBlogQuery, [title, subtitle, content, image_url]);
  } else {
    editBlogQuery = "UPDATE blog set title = ? , subtitle = ? , content = ?";
    return await connection
      .promise()
      .query(editBlogQuery, [title, subtitle, content]);
  }
};
const deleteBlogModel = async ({ blog_id }) => {
  const deleteBlogQuery = "DELETE from blog WHERE blog_id = ?";

  return await connection.promise().query(deleteBlogQuery, [blog_id]);
};

const addCommentModel = async ({ student_id, comment_text, blog_id }) => {
  const comment_id = generateId();
  const addCommentQuery =
    "INSERT INTO comments (comment_id,student_id,blog_id,comment_text) VALUES (?,?,?,?)";

  return await connection
    .promise()
    .query(addCommentQuery, [comment_id, student_id, blog_id, comment_text]);
};

const getCommentsModel = async (page, blog_id) => {
  const getCommentQuery = `SELECT c.*,u.first_name,u.image_url FROM comments c 
    LEFT JOIN user u ON c.student_id = u.student_id 
    WHERE blog_id = ? ORDER BY created_date DESC LIMIT ? OFFSET ?`;
  return await connection
    .promise()
    .query(getCommentQuery, [blog_id, 5, page === 1 ? 0 : (page - 1) * 5]);
};

export {
  getBlogModel,
  addBlogModel,
  editBlogModel,
  deleteBlogModel,
  addCommentModel,
  getCommentsModel,
};
