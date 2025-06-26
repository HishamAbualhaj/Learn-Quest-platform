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
import { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "./context/ThemeContext";

import VerifyCode from "./pages/auth/VerifyCode";
import ConfirmPass from "./pages/auth/ConfirmPass";
import ForgotPass from "./pages/auth/ForgotPass";
import Blogs from "./pages/Dashboard/Blogs";
import API_BASE_URL from "./config/config";
import AddBlog from "./pages/Dashboard/AddBlog";
import EditBlog from "./pages/Dashboard/EditBlog";
import MaintenancePage from "./components/MaintenancePage";
import { useQuery } from "@tanstack/react-query";

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

  const [isMaintenance, setIsMaintenance] = useState(false);

  const { data } = useQuery({
    queryKey: ["maintenance"],
    queryFn: async () => {
      return await useFetch(`${API_BASE_URL}/getMaintenace`, null, "GET");
    },
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (data) {
      const status = data?.msg?.[0]?.status ?? true;
      setIsMaintenance(!status);
    }
  }, [data]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserDataContext>
          <IsAuthRoute isMaintenance={isMaintenance}>
            <Landing />
          </IsAuthRoute>
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
        <IsAuthRoute>
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
        <IsAuthRoute isMaintenance={isMaintenance}>
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
        <IsAuthRoute isMaintenance={isMaintenance}>
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
        <IsAuthRoute isMaintenance={isMaintenance}>
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
        <IsAuthRoute isMaintenance={isMaintenance}>
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
          <IsAuthRoute isMaintenance={isMaintenance}>
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
          errorElement: <ErrorPage />,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
          errorElement: <ErrorPage />,
        },
        { path: "chat", element: <ChatStudent />, errorElement: <ErrorPage /> },
        {
          path: "allcourses",
          element: <AllCourses />,
          errorElement: <ErrorPage />,
        },
        {
          path: "CoursePage/:courseName",
          element: <CoursePage />,
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
          errorElement: <ErrorPage />,
        },
        {
          path: "mycourses",
          children: [
            {
              index: true,
              element: <MyCourses />,
              errorElement: <ErrorPage />,
            },
            {
              path: ":courseName",
              element: (
                <IsAuthRoute isMaintenance={isMaintenance}>
                  <CoursePage />
                </IsAuthRoute>
              ),
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
              errorElement: <ErrorPage />,
            },
          ],
          errorElement: <ErrorPage />,
        },
        {
          path: "blog",
          children: [
            { index: true, element: <Blog /> },
            {
              path: ":blogId",
              element: (
                <IsAuthRoute isMaintenance={isMaintenance}>
                  <BlogPost />
                </IsAuthRoute>
              ),
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
              errorElement: <ErrorPage />,
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
            <h1 className="text-white h-[100vh] text-4xl text-center mt-16">
              Page Not Found
            </h1>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <UserDataContext>
          <IsAuthRoute isMaintenance={isMaintenance}>
            <Dashboard />
          </IsAuthRoute>
        </UserDataContext>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
      },
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Users />, errorElement: <ErrorPage /> },
        { path: "users", element: <Users />, errorElement: <ErrorPage /> },
        {
          path: "courses",
          children: [
            { index: true, element: <Courses />, errorElement: <ErrorPage /> },
            {
              path: "add",
              element: <AddCourse />,
              errorElement: <ErrorPage />,
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
            {
              path: "edit/:id",
              element: <EditCourse />,
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
              errorElement: <ErrorPage />,
            },
          ],
        },
        {
          path: "analytics",
          element: <Analytics />,
          errorElement: <ErrorPage />,
        },
        { path: "reviews", element: <Reviews />, errorElement: <ErrorPage /> },
        {
          path: "chat",
          element: <Chat />,
          errorElement: <ErrorPage />,
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
        },
        {
          path: "systemlog",
          element: <SystemLog />,
          errorElement: <ErrorPage />,
        },
        {
          path: "maintenance",
          element: <Maintenance />,
          errorElement: <ErrorPage />,
          loader: () => {
            return fetchData(`${API_BASE_URL}/session`);
          },
        },
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
            { index: true, element: <Blogs />, errorElement: <ErrorPage /> },
            {
              path: "add",
              element: <AddBlog />,
              errorElement: <ErrorPage />,
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
            },
            {
              path: "edit/:id",
              element: <EditBlog />,
              loader: () => {
                return fetchData(`${API_BASE_URL}/session`);
              },
              errorElement: <ErrorPage />,
            },
          ],
          errorElement: <ErrorPage />,
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
      path: "/maintenance",
      element: (
        <IsAuthRoute isMaintenance={isMaintenance}>
          <MaintenancePage />
        </IsAuthRoute>
      ),
      loader: () => {
        return fetchData(`${API_BASE_URL}/session`);
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
