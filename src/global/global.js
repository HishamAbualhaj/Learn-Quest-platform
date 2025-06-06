// Where we store every data for our project !
import {
  faMessage,
  faPersonChalkboard,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faBlogger } from "@fortawesome/free-brands-svg-icons";
export const tabs = [
  {
    key: 1,
    name: "Profile",
    icon: faUser,
  },
  {
    key: 2,
    name: "All Courses",
    icon: faPersonChalkboard,
  },
  {
    key: 3,
    name: "My Courses",
    icon: faPersonChalkboard,
  },
  {
    key: 4,
    name: "Chat",
    icon: faMessage,
  },
  {
    key: 5,
    name: "Blog",
    icon: faBlogger,
  },
  {
    key: 6,
    name: "Log out",
    icon: faRightFromBracket,
  },
];

export const navs = [
  {
    id: 1,
    name: "Home",
    url: "/Home",
  },
  {
    id: 2,
    name: "Features",
    url: "/Home",
  },
  {
    id: 3,
    name: "Courses",
    url: "/Home",
  },
  {
    id: 4,
    name: "Blog",
    url: "/Home",
  },
];
