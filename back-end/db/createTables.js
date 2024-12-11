import mysql from "mysql";

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your DB user
  password: "", // Replace with your DB password
  database: "learnquest", // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

// SQL queries to create tables
const createAdminTable = `
CREATE TABLE IF NOT EXISTS Admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);
`;

const createUserTable = `
CREATE TABLE IF NOT EXISTS User (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  status_user BOOLEAN NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
  gender VARCHAR(10),
  birthdate DATE
  joined_at DATE
);
`;

const createCoursesTable = `
CREATE TABLE IF NOT EXISTS Courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  duration TIME NOT NULL,
  category VARCHAR(50),
  tabs TEXT,
  created_date DATE NOT NULL
);
`;

const createSystemLogsTable = `
CREATE TABLE IF NOT EXISTS SystemLogs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  message TEXT NOT NULL,
  email VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES User(student_id)
);
`;

// Execute the queries
const tables = [
  createAdminTable,
  createUserTable,
  createCoursesTable,
  createSystemLogsTable,
];

tables.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists:", result);
    }
  });
});

// Close the connection
connection.end((err) => {
  if (err) {
    console.error("Error closing the connection:", err);
  } else {
    console.log("Database connection closed.");
  }
});
