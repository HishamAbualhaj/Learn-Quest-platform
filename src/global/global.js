// Where we store every data for our project !
import {
  faDashboard,
  faMessage,
  faPersonChalkboard,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBlogger } from "@fortawesome/free-brands-svg-icons";
const tabs = [
  {
    key: 1,
    name: "Profile",
    icon: faUser,
    link: "/student/profile",
  },
  {
    key: 2,
    name: "All Courses",
    icon: faPersonChalkboard,
    link: "/student/allcourses",
  },
  {
    key: 3,
    name: "My Courses",
    icon: faPersonChalkboard,
    link: "/student/mycourses",
  },
  {
    key: 4,
    name: "Chat",
    icon: faMessage,
    link: "/student/chat",
  },
  {
    key: 5,
    name: "Blog",
    icon: faBlogger,
    link: "/student/blog",
  },
  {
    key: 6,
    name: "Log out",
    icon: faRightFromBracket,
    link: "/logout",
  },
];

const adminTabs = [
  {
    key: 1,
    name: "dashboard",
    icon: faDashboard,
    link: "/dashboard",
  },
  {
    key: 2,
    name: "Log out",
    icon: faRightFromBracket,
    link: "/logout",
  },
];
const navs = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "Features",
    url: "#features",
  },
  {
    id: 3,
    name: "Courses",
    url: "/student/allcourses",
  },
  {
    id: 4,
    name: "Blog",
    url: "/student/blog",
  },
];

export { tabs, adminTabs, navs };
