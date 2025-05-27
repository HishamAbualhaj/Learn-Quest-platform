import http from "http";
import signup from "./api/auth/signup.js";
import login from "./api/auth/login.js";
import logout from "./api/auth/logout.js";
import session from "./api/system/session.js";
import getUserData from "./utils/getUserData.js";
import addCourse from "./api/dashboard/addCourse.js";
import getCourses from './api/course/getCourses.js'
import deleteCourse from "./api/dashboard/deleteCourse.js";
import getCourseData from "./api/course/getCourseData.js";
import updateCourse from "./api/dashboard/updateCourse.js";
import updateUser from "./api/user/updateUser.js";
import getUsers from "./api/user/getUsers.js";
import deleteUser from "./api/dashboard/deleteUser.js";
import getSystemLog from "./api/dashboard/getSystemLog.js";
import getImage from "./utils/getImage.js";
import completeCourse from "./api/course/completeCourse.js";
import enrollCourse from "./api/course/enrollCourse.js";
import addReview from "./api/course/addReview.js";
// Test upload image
import handleUploads from "./utils/handleUploads.js";
import getReviews from "./api/course/getReviews.js";
import getAnalystic from "./api/dashboard/getAnalystic.js";
import getEnrolledCourses from "./api/course/getEnrolledCourses.js";

import handleImage from "./utils/handleImage.js";
//Google auth
import url from "url";
import handleGoogleAuth from "./services/handleGoogleAuth.js";
import googleAuth from "./services/googleAuth.js";
import forgotPass from "./api/auth/forgotpass.js";
import confirmCode from "./api/auth/confirmCode.js";
import resetPass from "./api/auth/resetpass.js";

import getCoursesAdmin from "./api/course/getCoursesAdmin.js";


import authLogin from './middleware/authLogin.js'
const server = http.createServer(async (req, res) => {
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
      "/getCourses": getCourses,
      "/getCoursesAdmin": getCoursesAdmin,
      "/getSystemLog": getSystemLog,
      "/getUsers": getUsers,
      "/getEnrolledCourses": getEnrolledCourses,
      "/forgotPass": forgotPass,
      "/verifyCode": confirmCode,
      "/resetPass": resetPass,
    },
    GET: {
      "/session": session,
      "/logout": logout,
      "/getAnalystic": getAnalystic,
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
  await authLogin(req, res, () => {
    const methodRoutes = routes[req.method];

    if (methodRoutes && methodRoutes[req.url]) {
      methodRoutes[req.url](req, res);
    } else if (req.url.startsWith("/uploads/")) {
      handleImage(req, res);
    } else if (url.parse(req.url).pathname === "/auth/google") {
      const [authUrl] = googleAuth();
      res.writeHead(302, { Location: authUrl });
      res.end();
    } else if (url.parse(req.url).pathname === "/oauth2callback") {
      const [_, client] = googleAuth();
      handleGoogleAuth(req, res, client);
    }
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
