import connection from "../config/db.js";
const sendMessgeModel = async ({ sender_id, receiver_id, msg }) => {
  const msg_id = Math.round(Math.random() * 100000000);
  const date = new Date().toISOString();
  const query =
    "INSERT INTO chat (msg_id,msg_text,sender_id,receiver_id) VALUES (?,?,?,?)";
  await connection
    .promise()
    .query(query, [msg_id, msg, sender_id, receiver_id]);

  return [msg_id, date];
};
const getMessagesModel = async ({ sender_id, receiver_id, page }) => {
  const query = `SELECT * FROM  chat WHERE     
      (sender_id = ? AND receiver_id = ?) 
      OR 
      (sender_id = ? AND receiver_id = ?) 
      ORDER BY created_date DESC LIMIT ? OFFSET ?`;

  return await connection
    .promise()
    .query(query, [
      sender_id,
      receiver_id,
      receiver_id,
      sender_id,
      10,
      page === 1 ? 0 : (page - 1) * 5,
    ]);
};
export { sendMessgeModel, getMessagesModel };
