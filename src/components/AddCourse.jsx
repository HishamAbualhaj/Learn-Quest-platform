import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function AddCourse() {
  const [files, setFiles] = useState(null);

  const setMultiple = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const inputs = [
    {
      key: 1,
      title: "Title : ",
      inType: "text",
    },
    {
      key: 2,
      title: "Price : ",
      inType: "number",
    },
    {
      key: 3,
      title: "Discount : ",
      inType: "number",
    },
  ];

  const category = [
    { id: 1, name: "Introduction to Computer Science" },
    { id: 2, name: "Web Development with HTML, CSS, and JavaScript" },
    { id: 3, name: "Data Structures and Algorithms" },
    { id: 4, name: "Database Management Systems" },
    { id: 5, name: "Object-Oriented Programming with Java" },
    { id: 6, name: "Cloud Computing Fundamentals" },
    { id: 7, name: "Cybersecurity Basics" },
    { id: 8, name: "Mobile App Development with React Native" },
    { id: 9, name: "Machine Learning and Artificial Intelligence" },
    { id: 10, name: "DevOps and Continuous Integration/Delivery" },
  ];

  return (
    <div>
      <div className="rounded-sm  w-full overflow-auto h-[800px]">
        <div className="text-center text-white text-xl py-5 border-b border-borderDark flex justify-between px-4">
          Add Course Details
          <Link to="/courses">
            <FontAwesomeIcon
              className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
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

          <div className="flex flex-col mt-2 text-white gap-2">
            <label htmlFor="">Category : </label>

            <select
              className="bg-transparent border border-[#888] rounded-md text-white focus:outline-none p-2 text-lg appearance-none w-full mt-2"
              name="courses"
              id=""
            >
              {category.map((category) => (
                <option
                  className="text-black"
                  key={category.id}
                  id={category.id}
                  value={`${category.name}`}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-2 text-white">
            <label htmlFor="">Image : </label>

            <div className="image-handle relative cursor-pointer mt-2">
              <div className="border border-gray-500 rounded-md flex justify-center py-10">
                <div className="text-xl"> Upload image</div>
                <input
                  type="file"
                  className="border border-textDark/40 rounded-md w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2 text-white">
            <label htmlFor="">Videos : </label>

            <div className="video-handle relative cursor-pointer">
              <div className="border border-gray-500 rounded-md flex justify-center py-10">
                <div className="text-xl"> Upload videos</div>
                <input
                  type="file"
                  multiple
                  onChange={setMultiple}
                  className="border border-textDark/40 rounded-md w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2 text-white">
            <label htmlFor="">Description : </label>
            <textarea className="mt-2 border border-textDark/40 rounded-md w-full" />
          </div>
          <div className="bg-gray-500 text-white font-semibold rounded-md p-2 hover:bg-gray-800 hover:text-white transition cursor-pointer text-center mt-3">
            ADD
          </div>
        </div>
      </div>
    </div>
  );
}
