import http from "http";
import signup from "./api/auth/signup.js";
import login from "./api/auth/login.js";
import logout from "./api/auth/logout.js";
import session from "./api/system/session.js";
import getUserData from "./utils/getUserData.js";
import addCourse from "./api/dashboard/addCourse.js";
import getCourses from "./api/course/getCourses.js";
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
import sendMsg from "./api/chat/sendMsg.js";
import getCoursesAdmin from "./api/course/getCoursesAdmin.js";

import getBlogData from "./api/blog/getBlogData.js";
import addBlog from "./api/blog/addBlog.js";
import editBlog from "./api/blog/editBlog.js";
import deleteBlog from "./api/blog/deleteBlog.js";

import authLogin from "./middleware/authLogin.js";

import dotenv from "dotenv";
import getMsg from "./api/chat/getMsg.js";
dotenv.config();

import { WebSocketServer } from "ws";
import getAdminId from "./utils/getAdminId.js";
import addComment from "./api/blog/addComment.js";
import getComments from "./api/blog/getComments.js";

import setMaintenance from "./api/system/setMaintenance.js";
import getMaintenace from "./api/system/getMaintenance.js";

let response = null;
const server = http.createServer(async (req, res) => {
  response = res;
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", frontendURL); // Allow requests from React app
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
      "/sendMsg": sendMsg,
      "/getMsg": getMsg,
      "/getBlogData": getBlogData,
      "/addBlog": addBlog,
      "/deleteBlog": deleteBlog,
      "/addComment": addComment,
      "/getComments": getComments,
      "/setMaintenance": setMaintenance,
    },
    GET: {
      "/session": session,
      "/logout": logout,
      "/getAnalystic": getAnalystic,
      "/getAdminId": getAdminId,
      "/getMaintenace": getMaintenace,
    },
    PUT: {
      "/updateCourse": updateCourse,
      "/updateUser": updateUser,
      "/completeCourse": completeCourse,
      "/enrollCourse": enrollCourse,
      "/updateBlog": editBlog,
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

const wss = new WebSocketServer({ server });
const client = new Map(); // userId => socket
wss.on("connection", (socket) => {
  try {
    socket.once("message", (data) => {
      const { type, sender_id } = JSON.parse(data);
      if (type === "init") {
        client.set(sender_id, socket);
      }
    });
    socket.on("message", async (data) => {
      const paredData = JSON.parse(data);

      const { type, receiver_id, msg, sender_id } = paredData;
      let dataToClient = {};
      if (type === "chat") {
        let [msg_id, date] = await sendMsg(paredData, response);
        dataToClient = {
          msg_id: msg_id,
          msg: msg,
          date: date,
          to: receiver_id,
          from: sender_id,
          isMaintenance: false,
        };

        if (msg_id) {
          socket.send(JSON.stringify(dataToClient));
        } else {
          socket.send(JSON.stringify({ msg: "Something went wrong" }));
        }

        const receiverSocket = client.get(receiver_id);
        if (receiverSocket && receiverSocket.readyState === 1) {
          receiverSocket.send(JSON.stringify(dataToClient));
        }
      }
    });
    socket.on("close", () => {
      console.log("Client disconnected");
    });
  } catch (error) {
    console.log("Error", error);
  }
});
server.listen(PORT, () => {
  const backendURL = process.env.BACKEND_URL || "http://localhost:3002";
  console.log(`Server running on ${backendURL}`);
});
