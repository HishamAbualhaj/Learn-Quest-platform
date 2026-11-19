-- LearnQuest schema, based on the supplied latest learnquest.sql dump.
-- Select an existing database before running. MySQL 8.0+. No existing rows are deleted.
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `user` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `status_user` tinyint(1) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT 'Male',
  `birthdate` date DEFAULT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `image_url` varchar(200) DEFAULT NULL,
  `course_joined` int DEFAULT '0',
  `login_method` enum('google','local') DEFAULT 'local',
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expires` bigint DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `price` float NOT NULL,
  `discount` int NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `tabs` text,
  `image_url` varchar(250) DEFAULT NULL,
  `stars` double DEFAULT '0',
  `lessons` int DEFAULT '0',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `coursematerials` (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `url` varchar(2083) NOT NULL,
  `allowed` tinyint(1) DEFAULT '0',
  `created_date` timestamp(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`material_id`),
  KEY `fk_course_materials_course` (`course_id`),
  CONSTRAINT `fk_course_materials_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `systemlogs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `message` text NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `fk_system_logs_user` (`student_id`),
  CONSTRAINT `fk_system_logs_user` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `archivesystemlogs` (
  `archive_id` int NOT NULL AUTO_INCREMENT,
  `data_id` int NOT NULL,
  `type` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`archive_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `session` (
  `session_id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `data` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `fk_session_user` (`user_id`),
  CONSTRAINT `fk_session_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `enrollments` (
  `enrollment_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `enrollment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `progress` int DEFAULT '0',
  `certificate_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `fk_enrollments_student` (`student_id`),
  KEY `fk_enrollments_course` (`course_id`),
  CONSTRAINT `fk_enrollments_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enrollments_student` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `completeionmaterial` (
  `completeion_id` int NOT NULL,
  `student_id` int NOT NULL,
  `material_id` int NOT NULL,
  `course_id` int NOT NULL,
  `isCompleted` tinyint(1) DEFAULT '0',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`completeion_id`),
  UNIQUE KEY `unique_student_material` (`student_id`,`material_id`),
  KEY `fk_completion_material` (`material_id`),
  KEY `fk_completion_course` (`course_id`),
  CONSTRAINT `fk_completion_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_completion_material` FOREIGN KEY (`material_id`) REFERENCES `coursematerials` (`material_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_completion_student` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `stars` int DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `review_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `review_text` text,
  PRIMARY KEY (`review_id`),
  KEY `fk_reviews_student` (`student_id`),
  KEY `fk_reviews_course` (`course_id`),
  CONSTRAINT `fk_reviews_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_student` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `chat` (
  `msg_id` int NOT NULL,
  `msg_text` text NOT NULL,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`msg_id`),
  KEY `fk_chat_sender` (`sender_id`),
  KEY `fk_chat_receiver` (`receiver_id`),
  CONSTRAINT `fk_chat_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_chat_sender` FOREIGN KEY (`sender_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `blog` (
  `blog_id` int NOT NULL,
  `title` text NOT NULL,
  `subtitle` text,
  `content` text,
  `image_url` varchar(200) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`blog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `blog_id` int DEFAULT NULL,
  `comment_text` text,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comments_student` (`student_id`),
  KEY `fk_comments_blog` (`blog_id`),
  CONSTRAINT `fk_comments_blog` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`blog_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comments_student` FOREIGN KEY (`student_id`) REFERENCES `user` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `maintenance` (
  `maintenance_id` int NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`maintenance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
