import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing-Page/Landing";
import Student from "./components/Student/Student";

import { Routes, Route, createBrowserRouter } from "react-router-dom";

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
function App() {
  // createBrowserRouter([
  //   {
  //     element: <></>
  //   }
  // ])
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/forgotpassword" element={<ForgotPass />}></Route>
      <Route path="/student" element={<Student />}>
        <Route index element={<Profile />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="chat" element={<ChatStudent />}></Route>

        <Route path="allcourses" element={<AllCourses />}></Route>
        <Route path="CoursePage/:courseName" element={<CoursePage />}></Route>

        <Route path="mycourses" element={<MyCourses />}>
          <Route path=":courseName" element={<CoursePage />}></Route>
        </Route>

        <Route path="blog">
          <Route index element={<Blog />}></Route>
          <Route path=":name" element={<BlogPost />}></Route>
        </Route>

        <Route
          path="*"
          element={
            <h1 className="text-white h-[100vh] text-4xl text-center mt-16">
              Page Not Found
            </h1>
          }
        />
      </Route>

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="Courses">
          <Route index element={<Courses />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="edit/:id" element={<EditCourse />} />
        </Route>
        <Route path="analytics" element={<Analytics />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="chat" element={<Chat />} />
        <Route path="systemlog" element={<SystemLog />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route
          path="*"
          element={
            <h1 className="text-white text-4xl text-center mt-16">
              Page Not Found
            </h1>
          }
        />
      </Route>
    </Routes>

    // <Student/>
  );
}

export default App;
