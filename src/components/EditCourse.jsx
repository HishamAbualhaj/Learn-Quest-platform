import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function AddCourse({ seteditCoursePopup, id }) {
  const inputs = [
    {
      key: 1,
      title: "Title : ",
      inType: "text",
    },
    {
      key: 2,
      title: "Category : ",
      inType: "text",
    },
    {
      key: 3,
      title: "Price : ",
      inType: "number",
    },
    {
      key: 4,
      title: "Discount : ",
      inType: "number",
    },
    {
      key: 5,
      title: "Image : ",
      inType: "file",
    },
  ];

  return (
    <div>
      <div
        onClick={() => {
          seteditCoursePopup(false);
        }}
        className="bg-black/50 w-full h-full absolute top-0 left-0"
      ></div>
      <div className="bg-lightDark rounded-sm md:w-[650px] w-full h-[700px] overflow-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="text-center text-white text-xl py-5 border-b border-borderDark flex justify-between px-4">
          Edit Course Details{" "}
          <FontAwesomeIcon
            onClick={() => {
              seteditCoursePopup(false);
            }}
            className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
            icon={faXmark}
          />
        </div>

        <div className="form p-3">
          {/* <div className="bg-red-500/20 text-center py-2 rounded-sm text-red-400">
            Something went wrong
          </div>
          <div className="bg-green-500/20 text-center py-2 rounded-sm text-green-400">
            Successfully Added !
          </div> */}
          {inputs.map((input) => (
            <div key={input.key} className="flex flex-col mt-2 text-white">
              <label htmlFor="">{input.title}</label>
              <input
                className="mt-2 border border-textDark/40 rounded-md w-full"
                type={input.inType}
              />
            </div>
          ))}

          <div className="flex flex-col mt-2 text-white">
            <label htmlFor="">Description : </label>
            <textarea className="mt-2 border border-textDark/40 rounded-md w-full" />
          </div>
          <div className="bg-gray-500 text-white font-semibold rounded-md p-2 hover:bg-gray-800 hover:text-white transition cursor-pointer text-center mt-3">
            EDIT
          </div>
        </div>
      </div>
    </div>
  );
}
