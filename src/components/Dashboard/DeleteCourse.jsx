import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
function DeleteCourse({ setdeleteCoursePopup, id }) {
  return (
    <div>
      <div
        onClick={() => {
          setdeleteCoursePopup(false);
        }}
        className="bg-black/50 w-full h-full absolute top-0 left-0"
      ></div>
      <div className="bg-lightDark rounded-sm md:w-[650px] w-full h-fit overflow-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="text-center text-white text-xl py-5 border-b border-borderDark flex justify-between px-4">
          WARNING !
          <FontAwesomeIcon
            onClick={() => {
              setdeleteCoursePopup(false);
            }}
            className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
            icon={faXmark}
          />
        </div>
        <div className="flex items-center p-3 flex-col">
          <FontAwesomeIcon
            className="text-4xl text-red-500/90"
            icon={faTriangleExclamation}
          />
          <div className="text-gray-400 text-center mt-5 text-xl leading-10">
            Warning: You are about to permanently delete the selected course.
            <span className="bg-red-800 mx-2 text-white p-1">{`Advanced CSS & Sass`}</span>
            This action cannot be undone. Please confirm if you wish to proceed.
          </div>
        </div>
        <div className="mt-3 bg-red-500/80 text-center px-4 py-2 text-white text-xl hover:bg-red-600/70 cursor-pointer">YES !</div>
      </div>
    </div>
  );
}

export default DeleteCourse;
