import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing-Page/Landing";
import Student from "./components/Student/Student";
import Blog from "./components/Student/Blog";
import BlogPost from "./components/Student/BlogPost";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/student" element={<Student />}></Route>
    </Routes>
  );
}

export default App;
