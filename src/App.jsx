import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Dashboard from "./layouts/DashboardLayout";
import Landing from "./layouts/LandingLayout";
import Student from "./layouts/StudentLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./pages/Student/Profile";
import ChatStudent from "./pages/Student/ChatStudent";
import MyCourses from "./pages/Student/MyCourses";
import Blog from "./pages/Student/Blog";
import BlogPost from "./pages/Student/BlogPost";
import CoursePage from "./pages/Student/CoursePage";
import AllCourses from "./pages/Student/AllCourses";
import Users from "./pages/Dashboard/Users";
import Courses from "./pages/Dashboard/Courses";
import AddCourse from "./pages/Dashboard/AddCourse";
import EditCourse from "./pages/Dashboard/EditCourse";
import Analytics from "./pages/Dashboard/Analytics";
import Reviews from "./pages/Dashboard/Reviews";
import Chat from "./pages/Dashboard/Chat";
import SystemLog from "./pages/Dashboard/SystemLog";
import Maintenance from "./pages/Dashboard/Maintenance";
import useFetch from "./hooks/useFetch";
import Logout from "./pages/auth/Logout";
import IsAuthRoute from "./routes/IsAuthRoute";
import Logo from "./components/Logo";
import ErrorPage from "./components/ErrorPage";
import UserDataContext from "./context/UserDataContext";
import { useContext, useEffect } from "react";
import { Theme } from "./context/ThemeContext";

import VerifyCode from "./pages/auth/VerifyCode";
import ConfirmPass from "./pages/auth/ConfirmPass";
import ForgotPass from "./pages/auth/ForgotPass";
import Blogs from "./pages/Dashboard/Blogs";
import API_BASE_URL from "./config/config";
import AddBlog from "./pages/Dashboard/AddBlog";
import EditBlog from "./pages/Dashboard/EditBlog";

function App() {
  // using  react hook to get the theme value from the context theme
  const { theme } = useContext(Theme);
  useEffect(() => {
    document
      .querySelector("body")
      .classList.remove(`${theme === "dark" ? "light" : "dark"}`);
    document.querySelector("body").classList.add(theme);
  }, [theme]);

  async function fetchData(url) {
    const response = await useFetch(url, null, "GET");
    return response?.msg;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserDataContext>
          <Landing />
        </UserDataContext>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: (
        <IsAuthRoute isAllowed={false}>
          <Login />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: (
        <IsAuthRoute isAllowed={false}>
          <Signup />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/forgotpassword",
      element: (
        <IsAuthRoute isAllowed={false}>
          <ForgotPass />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/verifycode",
      element: (
        <IsAuthRoute isAllowed={false}>
          <VerifyCode />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/confirmpass",
      element: (
        <IsAuthRoute isAllowed={false}>
          <ConfirmPass />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
    },
    {
      path: "/student",
      element: (
        <UserDataContext>
          <IsAuthRoute>
            <Student />
          </IsAuthRoute>
        </UserDataContext>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
          errorElement: <ErrorPage />,
        },
        { path: "chat", element: <ChatStudent /> },
        { path: "allcourses", element: <AllCourses /> },
        {
          path: "CoursePage/:courseName",
          element: (
            <UserDataContext>
              <CoursePage />
            </UserDataContext>
          ),
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
          errorElement: <ErrorPage />,
        },
        {
          path: "mycourses",
          children: [
            { index: true, element: <MyCourses /> },
            {
              path: ":courseName",
              element: (
                <UserDataContext>
                  <CoursePage />
                </UserDataContext>
              ),
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
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
            return fetchData(`${API_BASE_URL}/logout`);
          },
          errorElement: <ErrorPage />,
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
        <IsAuthRoute isAdmin={true}>
          <Dashboard />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      children: [
        { index: true, element: <Users /> },
        { path: "users", element: <Users /> },
        {
          path: "courses",
          children: [
            { index: true, element: <Courses /> },
            {
              path: "add",
              element: (
                <UserDataContext>
                  <AddCourse />
                </UserDataContext>
              ),
              errorElement: <ErrorPage />,
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
            {
              path: "edit/:id",
              element: (
                <UserDataContext>
                  <EditCourse />
                </UserDataContext>
              ),
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
          ],
        },
        { path: "analytics", element: <Analytics /> },
        { path: "reviews", element: <Reviews /> },
        {
          path: "chat",
          element: (
            <UserDataContext>
              <Chat />
            </UserDataContext>
          ),
          errorElement: <ErrorPage />,
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
        },
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
        {
          path: "blogs",
          children: [
            { index: true, element: <Blogs /> },
            {
              path: "add",
              element: (
                <UserDataContext>
                  <AddBlog />
                </UserDataContext>
              ),
               errorElement: <ErrorPage />,
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
            {
              path: "edit/:id",
              element: (
                <UserDataContext>
                  <EditBlog />
                </UserDataContext>
              ),
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
          ],
        },
      ],
    },
    {
      path: "logout",
      element: <Logout />,
      loader: () => {
        return fetchData(`${API_BASE_URL}/logout`);
      },
      errorElement: <ErrorPage />,
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
