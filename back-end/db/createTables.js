import connection from "./db.js";
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
  password VARCHAR(50) NOT NULL,
  gender VARCHAR(10),
  birthdate DATE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createCoursesTable = `
CREATE TABLE IF NOT EXISTS Courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  discount INT NOT NULL,
  duration TIME NOT NULL,
  category VARCHAR(50),
  tabs TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createCoursesMaterials = `
CREATE TABLE IF NOT EXISTS CourseMaterials (
  material_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100) NOT NULL,
  isCompleted BOOLEAN DEFAULT FALSE,
  url VARCHAR(2083),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,c
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
`;
const createSystemLogsTable = `
CREATE TABLE IF NOT EXISTS SystemLogs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  message TEXT NOT NULL,
  email VARCHAR(100),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES User(student_id)
);
`;

const createSessionTable = `
CREATE TABLE IF NOT EXISTS session (
    session_id VARCHAR(255) NOT NULL PRIMARY KEY,  
    user_id INT NOT NULL,                       
    data TEXT,                                    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    expires_at TIMESTAMP NOT NULL                  
);`;
// Execute the queries
const tables = [
  createAdminTable,
  createUserTable,
  createCoursesTable,
  createSystemLogsTable,
  createSessionTable,
  createCoursesMaterials,
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
