-- Demo data for an EMPTY LearnQuest database after schema.sql.
-- Run once. No DROP, TRUNCATE, GTID, SQL_LOG_BIN, or FOREIGN_KEY_CHECKS changes.
-- Stop on the first error; ROLLBACK if your SQL editor keeps the connection open.
-- Demo passwords match the backend's current plaintext password comparison.
SET NAMES utf8mb4;
START TRANSACTION;

INSERT INTO `user` (student_id, first_name, last_name, status_user, email, password, gender, role, course_joined) VALUES
(90000001, 'Demo', 'Admin', 0, 'admin@learnquest.example', 'DemoAdmin123!', 'Male', 'admin', 0),
(90000002, 'Demo', 'Student', 0, 'student@learnquest.example', 'DemoStudent123!', 'Female', 'user', 1),
(90000003, 'Demo', 'Learner', 0, 'learner@learnquest.example', 'DemoLearner123!', 'Male', 'user', 1);

INSERT INTO `courses` VALUES
(1,'Modern JavaScript: From Fundamentals to Advanced','Master modern JavaScript from the fundamentals to advanced concepts including ES6+, asynchronous programming, promises, modules, closures, prototypes, and modern development patterns.',49.99,20,'Programming','Beginner,Intermediate,JavaScript','https://images.unsplash.com/photo-1627398242454-45a1465c2479',1,42,'2026-08-16 23:58:03'),
(2,'React.js Professional Development','Build production-ready React applications using components, hooks, state management, React Router, API integration, performance optimization, and modern React patterns.',69.99,25,'Frontend Development','React,JavaScript,Frontend,Intermediate','https://images.unsplash.com/photo-1633356122544-f134324a6cee',4.9,56,'2026-08-16 23:58:03'),
(3,'Next.js Full-Stack Development','Learn how to build scalable full-stack applications with Next.js including App Router, Server Components, Server Actions, authentication, API integration, caching, and deployment.',79.99,30,'Full Stack Development','Next.js,React,TypeScript,Advanced','https://images.unsplash.com/photo-1555066931-4365d14bab8c',4.9,48,'2026-08-16 23:58:03'),
(4,'Node.js Backend Engineering','Learn backend development with Node.js by building REST APIs, authentication systems, middleware, validation, error handling, file uploads, and production-ready server architectures.',64.99,15,'Backend Development','Node.js,Backend,REST API,Intermediate','https://images.unsplash.com/photo-1558494949-ef010cbdcc31',4.7,51,'2026-08-16 23:58:03'),
(5,'MySQL Database Design & Engineering','Learn professional relational database development with MySQL including SQL queries, database normalization, indexing, transactions, relationships, constraints, optimization, and database design.',54.99,15,'Database','MySQL,SQL,Database,Intermediate','https://images.unsplash.com/photo-1544383835-bda2bc66a55d',4.8,44,'2026-08-16 23:58:03'),
(6,'TypeScript for Professional Developers','Go beyond JavaScript and learn TypeScript with practical examples covering types, interfaces, generics, utility types, advanced patterns, API typing, and scalable application architecture.',44.99,10,'Programming','TypeScript,JavaScript,Programming','https://images.unsplash.com/photo-1516116216624-53e697fedbea',4.8,38,'2026-08-16 23:58:03'),
(7,'Git & GitHub: Professional Workflow','Master Git and GitHub workflows used by professional development teams including branching, merging, rebasing, pull requests, conflict resolution, code reviews, and collaborative development.',29.99,0,'Software Engineering','Git,GitHub,DevOps,Beginner','https://images.unsplash.com/photo-1618401471353-b98afee0b2eb',4.7,28,'2026-08-16 23:58:03'),
(8,'Docker & DevOps Fundamentals','Learn Docker and essential DevOps concepts by containerizing applications, creating Docker images, managing containers, networking, volumes, Docker Compose, and deployment workflows.',59.99,20,'DevOps','Docker,DevOps,Deployment,Intermediate','https://images.unsplash.com/photo-1605745341112-85968b19335b',4.6,35,'2026-08-16 23:58:03'),
(9,'REST API Design & Security','Design professional REST APIs with authentication, authorization, JWT, validation, rate limiting, error handling, security best practices, pagination, filtering, and API documentation.',49.99,15,'Backend Development','REST API,Security,Backend,Advanced','https://images.unsplash.com/photo-1558494949-ef010cbdcc31',4.9,40,'2026-08-16 23:58:03'),
(10,'Software Engineering & System Design','Learn how professional engineers design scalable software systems. Explore architecture patterns, databases, caching, load balancing, queues, scalability, reliability, and system design fundamentals.',89.99,30,'Software Engineering','System Design,Architecture,Backend,Advanced','https://images.unsplash.com/photo-1518770660439-4636190af475',4.9,62,'2026-08-16 23:58:03');

INSERT INTO `coursematerials` VALUES
(1,1,'JavaScript Fundamentals','Variables, data types, operators and basic syntax','https://learnquest.example.com/materials/javascript/fundamentals',1,'2026-08-17 00:02:52.256'),
(2,1,'Functions & Scope','Functions, parameters, closures and lexical scope','https://learnquest.example.com/materials/javascript/functions-scope',1,'2026-08-17 00:02:52.256'),
(3,1,'Arrays & Objects','Working with JavaScript arrays and objects','https://learnquest.example.com/materials/javascript/arrays-objects',0,'2026-08-17 00:02:52.256'),
(4,1,'ES6+ Features','Destructuring, spread, rest, modules and modern syntax','https://learnquest.example.com/materials/javascript/es6',0,'2026-08-17 00:02:52.256'),
(5,1,'Asynchronous JavaScript','Promises, async/await and asynchronous workflows','https://learnquest.example.com/materials/javascript/async',0,'2026-08-17 00:02:52.256'),
(6,1,'DOM Manipulation','Selecting, modifying and interacting with the DOM','https://learnquest.example.com/materials/javascript/dom',0,'2026-08-17 00:02:52.256'),
(7,1,'Advanced JavaScript','Closures, prototypes, this and advanced concepts','https://learnquest.example.com/materials/javascript/advanced',0,'2026-08-17 00:02:52.256'),
(8,1,'JavaScript Final Project','Build a complete JavaScript application','https://learnquest.example.com/materials/javascript/final-project',0,'2026-08-17 00:02:52.256'),
(9,2,'React Fundamentals','Components, JSX and the React mental model','https://learnquest.example.com/materials/react/fundamentals',1,'2026-08-17 00:02:52.256'),
(10,2,'Props & Component Design','Passing data and designing reusable components','https://learnquest.example.com/materials/react/props-components',1,'2026-08-17 00:02:52.256'),
(11,2,'React Hooks','useState, useEffect and essential React hooks','https://learnquest.example.com/materials/react/hooks',0,'2026-08-17 00:02:52.256'),
(12,2,'Forms & Validation','Build controlled forms and validate user input','https://learnquest.example.com/materials/react/forms',0,'2026-08-17 00:02:52.256'),
(13,2,'React Router','Routing and navigation in modern React applications','https://learnquest.example.com/materials/react/router',0,'2026-08-17 00:02:52.256'),
(14,2,'API Integration','Connect React applications to REST APIs','https://learnquest.example.com/materials/react/api-integration',0,'2026-08-17 00:02:52.256'),
(15,2,'React Performance','Memoization, lazy loading and performance optimization','https://learnquest.example.com/materials/react/performance',0,'2026-08-17 00:02:52.256'),
(16,2,'React Production Project','Build and deploy a production-ready React application','https://learnquest.example.com/materials/react/final-project',0,'2026-08-17 00:02:52.256'),
(17,3,'Next.js Introduction','Understanding Next.js and the App Router','https://learnquest.example.com/materials/nextjs/introduction',1,'2026-08-17 00:02:52.256'),
(18,3,'App Router','Layouts, pages, nested routes and navigation','https://learnquest.example.com/materials/nextjs/app-router',1,'2026-08-17 00:02:52.256'),
(19,3,'Server & Client Components','Understanding server and client rendering','https://learnquest.example.com/materials/nextjs/server-client-components',0,'2026-08-17 00:02:52.256'),
(20,3,'Data Fetching','Fetching and caching data in Next.js applications','https://learnquest.example.com/materials/nextjs/data-fetching',0,'2026-08-17 00:02:52.256'),
(21,3,'Authentication','Implement secure authentication in Next.js','https://learnquest.example.com/materials/nextjs/authentication',0,'2026-08-17 00:02:52.256'),
(22,3,'Server Actions','Building server-side mutations with Server Actions','https://learnquest.example.com/materials/nextjs/server-actions',0,'2026-08-17 00:02:52.256'),
(23,3,'API Routes','Create backend endpoints inside Next.js','https://learnquest.example.com/materials/nextjs/api-routes',0,'2026-08-17 00:02:52.256'),
(24,3,'Next.js Production Project','Build and deploy a complete full-stack application','https://learnquest.example.com/materials/nextjs/final-project',0,'2026-08-17 00:02:52.256'),
(25,4,'Node.js Fundamentals','Runtime architecture and asynchronous programming','https://learnquest.example.com/materials/nodejs/fundamentals',1,'2026-08-17 00:02:52.256'),
(26,4,'HTTP & Web Servers','Build HTTP servers using Node.js','https://learnquest.example.com/materials/nodejs/http-servers',1,'2026-08-17 00:02:52.256'),
(27,4,'REST API Architecture','Design clean and scalable REST APIs','https://learnquest.example.com/materials/nodejs/rest-api',0,'2026-08-17 00:02:52.256'),
(28,4,'Authentication & Authorization','JWT authentication and role-based access','https://learnquest.example.com/materials/nodejs/authentication',0,'2026-08-17 00:02:52.256'),
(29,4,'Middleware & Error Handling','Build reusable middleware and error handlers','https://learnquest.example.com/materials/nodejs/middleware',0,'2026-08-17 00:02:52.256'),
(30,4,'File Uploads','Handle file uploads and media processing','https://learnquest.example.com/materials/nodejs/file-uploads',0,'2026-08-17 00:02:52.256'),
(31,4,'Database Integration','Connect Node.js applications to MySQL','https://learnquest.example.com/materials/nodejs/database',0,'2026-08-17 00:02:52.256'),
(32,4,'Backend Final Project','Build a production-style REST API','https://learnquest.example.com/materials/nodejs/final-project',0,'2026-08-17 00:02:52.256'),
(33,5,'SQL Fundamentals','SELECT, INSERT, UPDATE and DELETE queries','https://learnquest.example.com/materials/mysql/sql-fundamentals',1,'2026-08-17 00:02:52.256'),
(34,5,'Database Design','Tables, relationships and database modeling','https://learnquest.example.com/materials/mysql/database-design',1,'2026-08-17 00:02:52.256'),
(35,5,'Primary & Foreign Keys','Designing relationships between database tables','https://learnquest.example.com/materials/mysql/keys',0,'2026-08-17 00:02:52.256'),
(36,5,'Joins & Subqueries','Master complex SQL queries and joins','https://learnquest.example.com/materials/mysql/joins',0,'2026-08-17 00:02:52.256'),
(37,5,'Indexes','Improve query performance using database indexes','https://learnquest.example.com/materials/mysql/indexes',0,'2026-08-17 00:02:52.256'),
(38,5,'Transactions','ACID properties and transaction management','https://learnquest.example.com/materials/mysql/transactions',0,'2026-08-17 00:02:52.256'),
(39,5,'Database Optimization','Analyze and optimize slow database queries','https://learnquest.example.com/materials/mysql/optimization',0,'2026-08-17 00:02:52.256'),
(40,5,'Database Engineering Project','Design a complete production database','https://learnquest.example.com/materials/mysql/final-project',0,'2026-08-17 00:02:52.256'),
(41,6,'TypeScript Fundamentals','Types, variables and type inference','https://learnquest.example.com/materials/typescript/fundamentals',1,'2026-08-17 00:02:52.256'),
(42,6,'Interfaces & Type Aliases','Define reusable application types','https://learnquest.example.com/materials/typescript/interfaces',1,'2026-08-17 00:02:52.256'),
(43,6,'Functions in TypeScript','Typing function parameters and return values','https://learnquest.example.com/materials/typescript/functions',0,'2026-08-17 00:02:52.256'),
(44,6,'Generics','Build reusable and type-safe components','https://learnquest.example.com/materials/typescript/generics',0,'2026-08-17 00:02:52.256'),
(45,6,'Utility Types','Partial, Pick, Omit, Record and advanced utilities','https://learnquest.example.com/materials/typescript/utility-types',0,'2026-08-17 00:02:52.256'),
(46,6,'Advanced Types','Unions, intersections, narrowing and conditional types','https://learnquest.example.com/materials/typescript/advanced-types',0,'2026-08-17 00:02:52.256'),
(47,6,'TypeScript with React','Build strongly typed React applications','https://learnquest.example.com/materials/typescript/react',0,'2026-08-17 00:02:52.256'),
(48,6,'TypeScript Project','Build a production-ready TypeScript application','https://learnquest.example.com/materials/typescript/final-project',0,'2026-08-17 00:02:52.256'),
(49,7,'Git Fundamentals','Repositories, commits and basic Git commands','https://learnquest.example.com/materials/git/fundamentals',1,'2026-08-17 00:02:52.256'),
(50,7,'Branches','Create and manage feature branches','https://learnquest.example.com/materials/git/branches',1,'2026-08-17 00:02:52.256'),
(51,7,'Merge & Rebase','Understand merging and rebasing workflows','https://learnquest.example.com/materials/git/merge-rebase',0,'2026-08-17 00:02:52.256'),
(52,7,'Resolving Conflicts','Handle merge conflicts professionally','https://learnquest.example.com/materials/git/conflicts',0,'2026-08-17 00:02:52.256'),
(53,7,'GitHub Pull Requests','Collaborate using pull requests and reviews','https://learnquest.example.com/materials/git/pull-requests',0,'2026-08-17 00:02:52.256'),
(54,7,'GitHub Actions','Automate testing and deployment with CI/CD','https://learnquest.example.com/materials/git/github-actions',0,'2026-08-17 00:02:52.256'),
(55,7,'Team Git Workflow','Professional Git workflows for development teams','https://learnquest.example.com/materials/git/team-workflow',0,'2026-08-17 00:02:52.256'),
(56,7,'Git Professional Challenge','Practice a complete team development workflow','https://learnquest.example.com/materials/git/final-project',0,'2026-08-17 00:02:52.256'),
(57,8,'Docker Fundamentals','Containers, images and Docker architecture','https://learnquest.example.com/materials/docker/fundamentals',1,'2026-08-17 00:02:52.256'),
(58,8,'Docker Images','Create and manage Docker images','https://learnquest.example.com/materials/docker/images',1,'2026-08-17 00:02:52.256'),
(59,8,'Dockerfiles','Create optimized Dockerfiles for applications','https://learnquest.example.com/materials/docker/dockerfiles',0,'2026-08-17 00:02:52.256'),
(60,8,'Docker Networking','Connect containers using Docker networks','https://learnquest.example.com/materials/docker/networking',0,'2026-08-17 00:02:52.256'),
(61,8,'Docker Volumes','Persist application and database data','https://learnquest.example.com/materials/docker/volumes',0,'2026-08-17 00:02:52.256'),
(62,8,'Docker Compose','Run multi-container applications','https://learnquest.example.com/materials/docker/compose',0,'2026-08-17 00:02:52.256'),
(63,8,'CI/CD Fundamentals','Automate testing and deployment pipelines','https://learnquest.example.com/materials/docker/cicd',0,'2026-08-17 00:02:52.256'),
(64,8,'DevOps Deployment Project','Containerize and deploy a complete application','https://learnquest.example.com/materials/docker/final-project',0,'2026-08-17 00:02:52.256'),
(65,9,'REST API Fundamentals','REST principles and HTTP methods','https://learnquest.example.com/materials/api/rest-fundamentals',1,'2026-08-17 00:02:52.256'),
(66,9,'API Resource Design','Design clean API resources and endpoints','https://learnquest.example.com/materials/api/resource-design',1,'2026-08-17 00:02:52.256'),
(67,9,'Authentication','Implement secure API authentication','https://learnquest.example.com/materials/api/authentication',0,'2026-08-17 00:02:52.256'),
(68,9,'Authorization','Roles, permissions and access control','https://learnquest.example.com/materials/api/authorization',0,'2026-08-17 00:02:52.256'),
(69,9,'API Validation','Validate requests and protect your API','https://learnquest.example.com/materials/api/validation',0,'2026-08-17 00:02:52.256'),
(70,9,'Rate Limiting','Protect APIs from abuse and excessive traffic','https://learnquest.example.com/materials/api/rate-limiting',0,'2026-08-17 00:02:52.256'),
(71,9,'API Security','Common API vulnerabilities and security practices','https://learnquest.example.com/materials/api/security',0,'2026-08-17 00:02:52.256'),
(72,9,'Secure API Project','Build a secure production-style REST API','https://learnquest.example.com/materials/api/final-project',0,'2026-08-17 00:02:52.256'),
(73,10,'System Design Fundamentals','Learn the foundations of designing scalable systems','https://learnquest.example.com/materials/system-design/fundamentals',1,'2026-08-17 00:02:52.256'),
(74,10,'Scalability','Vertical and horizontal scaling strategies','https://learnquest.example.com/materials/system-design/scalability',1,'2026-08-17 00:02:52.256'),
(75,10,'Load Balancing','Distribute traffic across application servers','https://learnquest.example.com/materials/system-design/load-balancing',0,'2026-08-17 00:02:52.256'),
(76,10,'Caching Systems','Improve performance using caching strategies','https://learnquest.example.com/materials/system-design/caching',0,'2026-08-17 00:02:52.256'),
(77,10,'Database Scaling','Replication, partitioning and database scaling','https://learnquest.example.com/materials/system-design/database-scaling',0,'2026-08-17 00:02:52.256'),
(78,10,'Message Queues','Build asynchronous systems using message queues','https://learnquest.example.com/materials/system-design/message-queues',0,'2026-08-17 00:02:52.256'),
(79,10,'Microservices Architecture','Understand service decomposition and communication','https://learnquest.example.com/materials/system-design/microservices',0,'2026-08-17 00:02:52.256'),
(80,10,'System Design Case Study','Design a scalable real-world application','https://learnquest.example.com/materials/system-design/final-project',0,'2026-08-17 00:02:52.256');

INSERT INTO enrollments (enrollment_id, student_id, course_id, progress) VALUES
(90000001, 90000002, 1, 25), (90000002, 90000003, 2, 0);

INSERT INTO completeionmaterial (completeion_id, student_id, material_id, course_id, isCompleted) VALUES
(90000001, 90000002, 1, 1, 1), (90000002, 90000002, 2, 1, 1);

INSERT INTO reviews (review_id, student_id, course_id, first_name, stars, review_text) VALUES
(90000001, 90000002, 1, 'Demo', 5, 'Clear examples and a useful introduction.'),
(90000002, 90000003, 2, 'Demo', 4, 'Helpful React lessons for beginners.');

INSERT INTO blog (blog_id, title, subtitle, content, image_url) VALUES
(90000001, 'Welcome to LearnQuest', 'Start your learning journey', '<p>Browse the courses and try the free preview lessons.</p>', NULL),
(90000002, 'Build a learning habit', 'Small steps every day', '<p>Complete one lesson, take notes, and practice what you learned.</p>', NULL);

INSERT INTO comments (comment_id, student_id, blog_id, comment_text) VALUES
(90000001, 90000002, 90000001, 'Looking forward to learning!');

INSERT INTO chat (msg_id, msg_text, sender_id, receiver_id) VALUES
(90000001, 'Welcome! How can I help?', 90000001, 90000002),
(90000002, 'Where should I start?', 90000002, 90000001);

INSERT INTO systemlogs (log_id, student_id, message, email) VALUES
(90000001, 90000001, 'Demo database initialized', 'admin@learnquest.example');

INSERT INTO archivesystemlogs (archive_id, data_id, type, message, email) VALUES
(90000001, 90000001, 'demo', 'Sample archived event', 'admin@learnquest.example');

-- status=1 means the site is running (see src/proxy.ts).
INSERT INTO maintenance (maintenance_id, status) VALUES (90000001, 1);

-- Reconcile display counters with the actual demo rows.
UPDATE courses c SET
  lessons = (SELECT COUNT(*) FROM coursematerials m WHERE m.course_id = c.course_id),
  stars = COALESCE((SELECT AVG(r.stars) FROM reviews r WHERE r.course_id = c.course_id), 0);

-- Expired sessions and reset tokens from the original dump are intentionally excluded.
COMMIT;
