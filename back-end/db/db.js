import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learnquest",
  port: 3308,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

export default connection;