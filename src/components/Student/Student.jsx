import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Logo from "../Logo";
import Person from "../../assets/Screenshot_1.jpg";
import Avatar from "../Avatar";
import {
  faHeadset,
  faMessage,
  faPersonChalkboard,
  faRightFromBracket,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlogger } from "@fortawesome/free-brands-svg-icons";
function Student() {
  const tabs = [
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

  const [active, setActive] = useState(false);
  return (
    <div className="section ">
      <div className="max-container">
        <div className="flex justify-between lg:gap-0 gap-5 items-center relative">
          <Logo />
          <div
            onClick={() => {
              setActive(!active);
            }}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-300/40 dark:hover:bg-gray-200/20  rounded-md p-2"
          >
            <div className=" bg-slate-400/20 rounded-[50%]">
              <Avatar img={Person} className={"h-[50px] w-[50px]"} />
            </div>
            <div className="text-lg">Hisham</div>
            <FontAwesomeIcon
              className="text-lg text-slate-400 dark:text-white"
              icon={faShare}
              rotation={90}
            />
          </div>
          {active && (
            <div className="box-shadow-light w-[250px] flex justify-between flex-col absolute text-black dark:text-white right-0 top-[70px] border pb-5 bg-white dark:bg-lightDark rounded-md">
              {tabs.map((tab) => (
                <div key={tab.key} className="flex flex-col">
                  <div
                    className={`flex items-center gap-3 text-lg py-3 px-5 cursor-pointer hover:bg-gray-300/20 dark:hover:bg-gray-200/20`}
                  >
                    <FontAwesomeIcon
                      className="text-gray-400/80 dark:text-white"
                      icon={tab.icon}
                    />
                    <div>{tab.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Routes>
        <Route
          path="/Student"
          element={<div className="bg-white text-black">Main path</div>}
        ></Route>
      </Routes>
    </div>
  );
}

export default Student;