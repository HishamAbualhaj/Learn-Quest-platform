import connection from "./db.js";

const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
  student_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  status_user BOOLEAN NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) DEFAULT NULL,
  gender ENUM('Male', 'Female') DEFAULT 'Male',
  birthdate DATE DEFAULT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  image_url VARCHAR(200) DEFAULT NULL,
  course_joined INT DEFAULT 0,
  login_method ENUM('google', 'local') DEFAULT 'local',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reset_token VARCHAR(255) DEFAULT NULL,
  reset_token_expires BIGINT DEFAULT NULL,
  PRIMARY KEY (student_id)
);
`;


const createCoursesTable = `
CREATE TABLE IF NOT EXISTS courses (
  course_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  discount INT NOT NULL,
  category VARCHAR(50) DEFAULT NULL,
  tabs TEXT,
  image_url VARCHAR(250) DEFAULT NULL,
  stars DOUBLE DEFAULT 0,
  lessons INT DEFAULT 0,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (course_id)
);
`;

const createCoursesMaterials = `
CREATE TABLE IF NOT EXISTS coursematerials (
  material_id INT NOT NULL AUTO_INCREMENT,
  course_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  subtitle VARCHAR(100) NOT NULL,
  url VARCHAR(2083) NOT NULL,
  allowed BOOLEAN DEFAULT 0,
  created_date TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (material_id),
  FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
    ON DELETE CASCADE
);
`;

const createSystemLogsTable = `
CREATE TABLE IF NOT EXISTS systemlogs (
  log_id INT NOT NULL AUTO_INCREMENT,
  student_id INT DEFAULT NULL,
  message TEXT NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (log_id),
  FOREIGN KEY (student_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE
);
`;

const createArchiveSystemLogsTable = `
CREATE TABLE IF NOT EXISTS archivesystemlogs (
  archive_id INT NOT NULL AUTO_INCREMENT,
  data_id INT NOT NULL,
  type VARCHAR(200) DEFAULT NULL,
  message TEXT NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (archive_id)
);
`;

const createSessionTable = `
CREATE TABLE IF NOT EXISTS session (
  session_id VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  data TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  PRIMARY KEY (session_id),
  FOREIGN KEY (user_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE
);
`;

const createEnrollmentsTable = `
CREATE TABLE IF NOT EXISTS enrollments (
  enrollment_id INT NOT NULL,
  student_id INT DEFAULT NULL,
  course_id INT DEFAULT NULL,
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  progress INT DEFAULT 0,
  certificate_url VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (enrollment_id),
  FOREIGN KEY (student_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE,
  FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
    ON DELETE CASCADE
);
`;

const createCompletionMaterialTable = `
CREATE TABLE IF NOT EXISTS completeionmaterial (
  completeion_id INT NOT NULL,
  student_id INT NOT NULL,
  material_id INT NOT NULL,
  course_id INT NOT NULL,
  isCompleted BOOLEAN DEFAULT 0,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (completeion_id),
  UNIQUE KEY unique_student_material (student_id, material_id),
  FOREIGN KEY (student_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE,
  FOREIGN KEY (material_id)
    REFERENCES coursematerials(material_id)
    ON DELETE CASCADE,
  FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
    ON DELETE CASCADE
);
`;

const createReviewsTable = `
CREATE TABLE IF NOT EXISTS reviews (
  review_id INT NOT NULL,
  student_id INT DEFAULT NULL,
  course_id INT DEFAULT NULL,
  first_name VARCHAR(255) NOT NULL,
  stars INT DEFAULT NULL,
  image_url VARCHAR(200) DEFAULT NULL,
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  review_text TEXT,
  PRIMARY KEY (review_id),
  FOREIGN KEY (student_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE,
  FOREIGN KEY (course_id)
    REFERENCES courses(course_id)
    ON DELETE CASCADE
);
`;

const createChatTable = `
CREATE TABLE IF NOT EXISTS chat (
  msg_id INT NOT NULL,
  msg_text TEXT NOT NULL,
  sender_id INT DEFAULT NULL,
  receiver_id INT DEFAULT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (msg_id),
  FOREIGN KEY (sender_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE,
  FOREIGN KEY (receiver_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE
);
`;

const createBlogTable = `
CREATE TABLE IF NOT EXISTS blog (
  blog_id INT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT,
  image_url VARCHAR(200) DEFAULT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (blog_id)
);
`;

const createCommentTable = `
CREATE TABLE IF NOT EXISTS comments (
  comment_id INT NOT NULL,
  student_id INT DEFAULT NULL,
  blog_id INT DEFAULT NULL,
  comment_text TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (student_id)
    REFERENCES user(student_id)
    ON DELETE CASCADE,
  FOREIGN KEY (blog_id)
    REFERENCES blog(blog_id)
    ON DELETE CASCADE
);
`;

const createMaintenanceTable = `
CREATE TABLE IF NOT EXISTS maintenance (
  maintenance_id INT NOT NULL,
  status BOOLEAN DEFAULT 1,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (maintenance_id)
);
`;

const tables = [
  createUserTable,
  createCoursesTable,
  createCoursesMaterials,
  createSystemLogsTable,
  createArchiveSystemLogsTable,
  createSessionTable,
  createEnrollmentsTable,
  createCompletionMaterialTable,
  createReviewsTable,
  createChatTable,
  createBlogTable,
  createCommentTable,
  createMaintenanceTable,
];

const createTables = async () => {
  for (const query of tables) {
    try {
      await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      console.log("Table created or already exists.");
    } catch (err) {
      console.error("Error creating table:", err);
      throw err;
    }
  }

  connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
    } else {
      console.log("Database connection closed.");
    }
  });
};

createTables().catch((err) => {
  console.error("Database initialization failed:", err);

  connection.end(() => {
    console.log("Database connection closed.");
  });
});
