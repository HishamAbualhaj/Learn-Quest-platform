import React from "react";

function Messages(student_id) {
  return (
    <div className="flex flex-col p-5 gap-5 overflow-auto">
      {[].map((message) => (
        <div
          className={`flex flex-col ${isAdmin ? "items-start" : "items-end"} `}
        >
          <div className="dark:text-white text-lightText text-md ">{name}</div>
          <div
            className={`flex lg:w-1/2 w-fit ${
              isAdmin ? "dark:bg-blue-400/40 bg-blue-500/90" : "bg-gray-700"
            }  p-2 rounded-md mt-1`}
          >
            <div className="text-white text-start">{text}</div>
          </div>
          <div className="mt-2 text-sm text-gray-400">25 Oct 3:20 PM</div>
        </div>
      ))}
    </div>
  );
}
export default Messages;
