import connection from "./db.js";
// SQL queries to create tables
const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  status_user BOOLEAN NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  gender VARCHAR(10),
  birthdate DATE,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  image_url VARCHAR(200),
  login_method ENUM('google', 'local') DEFAULT 'local',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reset_token VARCHAR(255),
  reset_token_expires BIGINT,
);
`;
const createCoursesTable = `
CREATE TABLE IF NOT EXISTS courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  discount INT NOT NULL,
  category VARCHAR(50),
  tabs TEXT,
  image_url VARCHAR(250),
  stars DOUBLE DEFAULT 0,
  lessons INT DEFAULT 0,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createCoursesMaterials = `
CREATE TABLE IF NOT EXISTS CourseMaterials (
  material_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100) NOT NULL,
  url VARCHAR(2083),
  allowed BOOLEAN DEFAULT 0,
  created_date TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(3),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);
`;
const createSystemLogsTable = `
CREATE TABLE IF NOT EXISTS SystemLogs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  message TEXT NOT NULL,
  email VARCHAR(100),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES User(student_id) ON DELETE CASCADE
);
`;
const createArchiveSystemLogsTable = `
CREATE TABLE IF NOT EXISTS archiveSystemLogs (
  archive_id INT AUTO_INCREMENT PRIMARY KEY,
  data_id INT NOT NULL,
  type VARCHAR(200),
  message TEXT NOT NULL,
  email VARCHAR(100),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createSessionTable = `
CREATE TABLE IF NOT EXISTS session (
    session_id INT NOT NULL PRIMARY KEY,  
    user_id INT NOT NULL,                       
    data TEXT,                                    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(student_id) ON DELETE CASCADE
);`;

const createEnrollmentsTable = `
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id INT NOT NULL PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress int DEFAULT 0,
    certificate_url VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES User(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(material_id) ON DELETE CASCADE
)
`;
const createCompleteionMaterialTable = `
CREATE TABLE IF NOT EXISTS completeionMaterial (
    completeion_id INT NOT NULL PRIMARY KEY,
    student_id INT NOT NULL,
    material_id INT NOT NULL,
    course_id INT NOT NULL,
    isCompleted BOOLEAN DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES User(student_id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES CourseMaterials(material_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
)
`;

const createReviewsTable = `
CREATE TABLE IF NOT EXISTS reviews (
    review_id INT NOT NULL PRIMARY KEY,
    student_id INT,
    course_id INT,
    first_name VARCHAR(255) NOT NULL,
    stars INT,
    image_url VARCHAR(200),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES User(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
)
`;

const createChatTable = `
CREATE TABLE IF NOT EXISTS chat (
    msg_id INT NOT NULL PRIMARY KEY,
    msg_text text NOT NULL,
    sender_id INT,
    receiver_id INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES User(student_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES User(student_id) ON DELETE CASCADE
)
`

const createBlogTable = `
CREATE TABLE IF NOT EXISTS blog (
    blog_id INT NOT NULL PRIMARY KEY,
    title text NOT NULL,
    subtitle text,
    content text,
    image_url varchar(200),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`
// Execute the queries
const tables = [
  createUserTable,
  createCoursesTable,
  createSystemLogsTable,
  createSessionTable,
  createCoursesMaterials,
  createEnrollmentsTable,
  createArchiveSystemLogsTable,
  createCompleteionMaterialTable,
  createReviewsTable,
  createChatTable,
  createBlogTable,
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
