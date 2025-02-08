import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing-Page/Landing";
import Student from "./components/Student/Student";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./components/Student/Profile";
import ChatStudent from "./components/Student/ChatStudent";
import MyCourses from "./components/Student/MyCourses";
import Blog from "./components/Student/Blog";
import BlogPost from "./components/Student/BlogPost";
import CoursePage from "./components/Student/CoursePage";
import AllCourses from "./components/Student/AllCourses";
import Users from "./components/Dashboard/Users";
import Courses from "./components/Dashboard/Courses";
import AddCourse from "./components/Dashboard/AddCourse";
import EditCourse from "./components/Dashboard/EditCourse";
import Analytics from "./components/Dashboard/Analytics";
import Reviews from "./components/Dashboard/Reviews";
import Chat from "./components/Dashboard/Chat";
import SystemLog from "./components/Dashboard/SystemLog";
import Maintenance from "./components/Dashboard/Maintenance";
import ForgotPass from "./components/ForgotPass";
import useFetch from "./components/Hooks/useFetch";
import Logout from "./components/logout";
import IsAuthRoute from "./components/IsAuthRoute";
import Logo from "./components/Logo";
function App() {
  const error = (
    <div className="flex items-center justify-center h-[100vh] bg-dark flex-col gap-2">
      <h1 className="md:text-4xl text-xl text-center   text-red-400 ">
        Something went wrong
      </h1>
      <div className="text-gray-400 text-lg">Try to reload page, </div>
    </div>
  );

  async function fetchData(url) {
    const response = await useFetch(url, null, "GET");
    return response.msg;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      loader: () => {
        return fetchData("http://localhost:3002/session");
      },
      errorElement: error,
    },
    {
      path: "/login",
      element: (
        <IsAuthRoute isAllowed={false}>
          <Login />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData("http://localhost:3002/session");
      },
      errorElement: error,
    },
    {
      path: "/signup",
      element: (
        <IsAuthRoute isAllowed={false}>
          <Signup />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData("http://localhost:3002/session");
      },
      errorElement: error,
    },
    {
      path: "/forgotpassword",
      element: (
        <IsAuthRoute isAllowed={false}>
          <ForgotPass />
        </IsAuthRoute>
      ),
    },
    {
      path: "/student",
      element: (
        <IsAuthRoute>
          <Student />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData("http://localhost:3002/session");
      },
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        { path: "chat", element: <ChatStudent /> },
        { path: "allcourses", element: <AllCourses /> },
        { path: "CoursePage/:courseName", element: <CoursePage /> },
        {
          path: "mycourses",
          children: [
            { index: true, element: <MyCourses /> },
            { path: ":courseName", element: <CoursePage /> },
          ],
        },
        {
          path: "blog",
          children: [
            { index: true, element: <Blog /> },
            { path: ":blogId", element: <BlogPost /> },
          ],
        },
        {
          path: "logout",
          element: <Logout />,
          loader: () => {
            return fetchData("http://localhost:3002/logout");
          },
          errorElement: error,
        },
        {
          path: "*",
          element: (
            <h1 className="text-white h-[100vh] text-4xl text-center mt-16">
              Page Not Found
            </h1>
          ),
        },
        {},
      ],
    },
    {
      path: "/dashboard",
      element: (
        <IsAuthRoute role="admin">
          <Dashboard />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData("http://localhost:3002/session");
      },
      children: [
        { index: true, element: <Users /> },
        { path: "users", element: <Users /> },
        {
          path: "courses",
          children: [
            { index: true, element: <Courses /> },
            { path: "add", element: <AddCourse /> },
            { path: "edit/:id", element: <EditCourse /> },
          ],
        },
        { path: "analytics", element: <Analytics /> },
        { path: "reviews", element: <Reviews /> },
        { path: "chat", element: <Chat /> },
        { path: "systemlog", element: <SystemLog /> },
        { path: "maintenance", element: <Maintenance /> },
        {
          path: "*",
          element: (
            <h1 className="text-white text-4xl text-center mt-16">
              Page Not Found
            </h1>
          ),
        },
      ],
    },
    {
      path: "logout",
      element: <Logout />,
      loader: () => {
        return fetchData("http://localhost:3002/logout");
      },
      errorElement: error,
    },
    {
      path: "*",
      element: (
        <div className="dark:text-white dark:bg-dark text-4xl text-center h-[100vh] flex items-center justify-center flex-col gap-4">
          <div className="font-bold"> 404 - Page Not Found</div>
          <Logo />
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
