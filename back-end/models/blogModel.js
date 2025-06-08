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

export { getBlogModel, addBlogModel, editBlogModel, deleteBlogModel };
