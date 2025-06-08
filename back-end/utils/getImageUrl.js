import connection from "../config/db.js";
const getImageUrl = async (tableName, column_id, id) => {
  const selectImageQuery = `SELECT image_url from ${tableName} WHERE ${column_id} = ?`;
  const result = await connection.promise().query(selectImageQuery, [id]);

  const [{ image_url }] = result[0];

  return image_url;
};

export default getImageUrl;
