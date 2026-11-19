import mysql from "mysql2";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
dotenv.config();
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
  ...(process.env.DB_SSL === "true"
    ? {
        ssl: {
          rejectUnauthorized: true,
          ...(process.env.DB_SSL_CA
            ? { ca: readFileSync(process.env.DB_SSL_CA, "utf8") }
            : {}),
        },
      }
    : {}),
});


connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

export default connection;
