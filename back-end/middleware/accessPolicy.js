const publicRoutes = new Set([
  "/getLandingContent",
  "/session",
  "/logout",
  "/login",
  "/signup",
  "/auth/google",
  "/oauth2callback",
  "/forgotPass",
  "/verifyCode",
  "/resetPass",
  "/getMaintenace",
  "/getCourses",
  "/getBlogData",
  "/getCourseData",
  "/getReviews",
  "/getComments",
  "/getImage",
]);
const adminRoutes = new Set([
  "/getContentAdmin",
  "/saveManagedContent",
  "/setContentVisibility",
  "/deleteManagedContent",
  "/addCourse",
  "/deleteCourse",
  "/updateCourse",
  "/deleteUser",
  "/getUsers",
  "/getCoursesAdmin",
  "/getSystemLog",
  "/getAnalystic",
  "/setMaintenance",
  "/addBlog",
  "/deleteBlog",
  "/updateBlog",
]);
export function isPublicRequest(path) {
  return publicRoutes.has(path) || path.startsWith("/uploads/");
}
export function isAdminRequest(path) {
  return adminRoutes.has(path);
}
export function rejectRequest(res, status, message) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: false, data: message }));
}
