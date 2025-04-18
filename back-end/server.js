import http from "http";
import signup from "./api/auth/signup.js";
import login from "./api/auth/login.js";
import logout from "./api/auth/logout.js";
import session from "./system/session.js";
import getUserData from "./utils/getUserData.js";
import addCourse from "./api/data/addCourse.js";
import getCourses from "./api/data/getCourses.js";
import deleteCourse from "./api/data/deleteCourse.js";
import getCourseData from "./api/data/getCourseData.js";
import updateCourse from "./api/data/updateCourse.js";
import updateUser from "./api/data/updateUser.js";
import getUsers from "./api/data/getUsers.js";
import deleteUser from "./api/data/deleteUser.js";
import getSystemLog from "./api/data/getSystemLog.js";
import getImage from "./utils/getImage.js";
import completeCourse from "./api/data/completeCourse.js";
import enrollCourse from "./api/data/enrollCourse.js";
import addReview from "./api/data/addReview.js";
// Test upload image
import handleUploads from "./utils/handleUploads.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import getReviews from "./api/data/getReviews.js";

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow requests from React app
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,OPTIONS"); // Allow specific methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
  res.setHeader("Access-Control-Allow-Credentials", true);

  const routes = {
    POST: {
      "/signup": signup,
      "/login": login,
      "/getUserData": getUserData,
      "/addCourse": addCourse,
      "/deleteCourse": deleteCourse,
      "/getCourseData": getCourseData,
      "/deleteUser": deleteUser,
      "/handleUploads": handleUploads,
      "/getImage": getImage,
      "/addReview": addReview,
      "/getReviews": getReviews,
    },
    GET: {
      "/session": session,
      "/logout": logout,
      "/getCourses": getCourses,
      "/getUsers": getUsers,
      "/getSystemLog": getSystemLog,
    },
    PUT: {
      "/updateCourse": updateCourse,
      "/updateUser": updateUser,
      "/completeCourse": completeCourse,
      "/enrollCourse": enrollCourse,
    },
  };

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  const methodRoutes = routes[req.method];
  if (methodRoutes && methodRoutes[req.url]) {
    methodRoutes[req.url](req, res);
  } else if (req.url.startsWith("/uploads/")) {
    // No route defined then its an image request

    // find current url from this file ,
    const __filename = fileURLToPath(import.meta.url);

    // find current dir for this file
    const __dirname = path.dirname(__filename);

    // resolving current dir with another folder
    const uploadDir = path.resolve(__dirname, "./uploads");
    // getting image name from url
    const imagePath = path.join(uploadDir, req.url.split("/")[2]);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`Image not found ${err}`);
      } else {
        // Determine content type
        const ext = path.extname(imagePath).toLowerCase();
        let contentType = "application/octet-stream";
        if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
        else if (ext === ".png") contentType = "image/png";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
