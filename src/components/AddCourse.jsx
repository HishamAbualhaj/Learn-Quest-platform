import React, { useState , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function AddCourse({setActiveStatus}) {

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

  const [videos, setVideo] = useState([
    {
      id: 1,
    },
  ]);

  function addVideo() {
    const newObj = {
      id: +(Math.random() * 1_000_000_000 + Math.random() * 1_000).toFixed(0),
    };
    console.log(videos);

    setVideo([...videos, newObj]);
    console.log(videos);
  }

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
          <div className="flex flex-col mt-2 text-white">
            <div className="flex items-center justify-between">
              <label htmlFor="">Videos : </label>
              <FontAwesomeIcon
                onClick={addVideo}
                className="bg-gray-500 p-2 rounded-sm cursor-pointer hover:bg-gray-800 hover:text-white "
                icon={faPlus}
              />
            </div>

            {videos.map((video) => (
              <div key={video.id} id={video.id} className="video-handle">
                <input
                  type="file"
                  className="mt-2 border border-textDark/40 rounded-md w-full"
                />
                <div
                  id={video.id}
                  className={`hidden loader bg-white h-2 w-full rounded-md mt-2 after:content[''] after:absolute after:w-1/2 after:h-2 after:bg-blue-400 after:rounded-md`}
                ></div>
              </div>
            ))}
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
