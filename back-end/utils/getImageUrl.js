const getImageUrl = async (tableName, id) => {
  const selectImageQuery = `SELECT image_url from ${tableName} WHERE blog_id = ?`;
  const result = await connection.promise().query(selectImageQuery, [id]);

  const [{ image_url }] = result[0];

  return image_url;
};

export default getImageUrl;
