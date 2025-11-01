import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
// const dbPassword = process.env.DB_PASSWORD;
// const dbUser = process.env.DB_USER;
// const dbHost = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;
// const dbName = process.env.DB_NAME;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kalousha2001#",
  database: "learnquest",
  port: 3306,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

export default connection;
