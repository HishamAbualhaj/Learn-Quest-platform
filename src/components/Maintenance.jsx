import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
export default function Maintenance() {
  let status = "inActive";
  let isActive = false;
  return (
    <div>
      <div className="items-center sm:flex block justify-between">
        <div className="title">
          <div className="text-white font-semibold text-4xl">Maintenance</div>
          <div className="text-gray-400 mt-2 ">
            Shut down the server for maintenance purposes
          </div>
        </div>
        <div
          className={`py-2 px-6 rounded-lg text-center text-2xl sm:mt-0 mt-5 sm:w-fit w-full ${
            status === "Active"
              ? "text-green-300 bg-green-400/20"
              : "text-red-300 bg-red-400/20"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="flex  justify-center items-center min-h-[500px] bg-black/20 mt-5">
        <FontAwesomeIcon
          className={`cursor-pointer  text-[200px] ${isActive ? 'text-red-400/40 hover:text-red-500' : 'text-green-400/40 hover:text-green-500'}  transition`}
          icon={faPowerOff}
        />
      </div>
    </div>
  );
}
