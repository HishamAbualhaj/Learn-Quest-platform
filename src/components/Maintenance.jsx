import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
export default function Maintenance() {
  let status = "Active";
  let isActive = true;
  return (
    <div>
      <div className="items-center sm:flex block justify-between">
        <div className="title">
          <div className="dark:text-white text-lightText font-semibold text-4xl">
            Maintenance
          </div>
          <div className="dark:text-gray-400 text-lightText mt-2 ">
            Shut down the server for maintenance purposes
          </div>
        </div>
        <div
          className={`py-2 px-6 rounded-lg text-center text-2xl sm:mt-0 mt-5 sm:w-fit w-full ${
            status === "Active"
              ? "dark:text-green-300 text-green-400 bg-green-400/20"
              : "dark:text-red-300  text-red-400 bg-red-400/20"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="flex  justify-center items-center min-h-[500px] dark:bg-black/20 bg-black/10 mt-5">
        <FontAwesomeIcon
          className={`cursor-pointer  text-[200px] ${
            isActive
              ? "dark:text-red-400/40 text-red-300 dark:hover:text-red-500 hover:text-red-500"
              : "dark:text-green-400/40 text-green-300 dark:hover:text-green-500 hover:text-green-500"
          }  transition`}
          icon={faPowerOff}
        />
      </div>
    </div>
  );
}

/*


*/
