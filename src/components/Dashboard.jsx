import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faPersonChalkboard,
  faChartLine,
  faMessage,
  faTerminal,
  faCircleExclamation,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function Dashboard() {
  let tabs = [
    {
      name: "users",
      icon: faUsers,
    },
    {
      name: "courses",
      icon: faPersonChalkboard,
    },
    {
      name: "analytics",
      icon: faChartLine,
    },
    {
      name: "reviews",
      icon: faMessage,
    },
    {
      name: "system log",
      icon: faTerminal,
    },
    {
      name: "maintenance",
      icon: faCircleExclamation,
    },
  ];
  let [activeStatus, setActiveStatus] = useState("users");

  function setActive(e) {
    let currentTab = e.currentTarget
      .querySelector(".data")
      .textContent.toLowerCase();
    setActiveStatus(currentTab);
  }

  let active = `after:absolute after:content[''] after:w-1 after:h-full after:bg-purple-500 after:left-0 bg-hoverDark`;
  return (
    <div className="flex h-[100vh]">
      <div className="border-r border-borderDark bg-lightDark w-[300px]">
        <div className="text-white text-2xl px-5 py-7 font-bold flex gap-1">
          LEARN <div className="text-purple-600">QUEST</div>
        </div>
        <div className="tabs-container flex flex-col gap-4">
          {tabs.map((tab) => (
            <div
              className={
                "flex flex-col gap-5 cursor-pointer hover:bg-hoverDark transition"
              }
              onClick={setActive}
            >
              <div
                className={
                  activeStatus == tab.name
                    ? `flex py-2 px-5 text-lg relative items-center gap-3 ` +
                      active
                    : "flex py-2 px-5 text-lg relative items-center gap-3 "
                }
              >
                <FontAwesomeIcon className="text-white" icon={tab.icon} />
                <div className="text-white data capitalize">{tab.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-dark">
        <div className="text-white py-3 border-b px-8 border-borderDark">
          <div className="flex justify-between items-center gap-3">
            <FontAwesomeIcon
              className="text-xl border px-3 py-3"
              icon={faUserTie}
            />
            <div className="text-white uppercase">
              admin dashboard management
            </div>
            <h1 className="text-xl px-5 py-2 rounded-md cursor-pointer bg-hoverDark/20">
              <a href="">
                Log out
              </a>
            </h1>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;
