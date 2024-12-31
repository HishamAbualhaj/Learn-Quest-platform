import React from "react";

function Alert({ msg, type }) {
  let isMsg = false;
  isMsg = msg === "" ? false : true;
  {
    return type === "success" ? (
      <div
        className={`dark:bg-green-900/40 bg-green-200 dark:text-green-400 text-green-800 py-3 pl-5 rounded-md text-xl relative mb-2 ${
          isMsg ? "" : "hidden"
        }`}
      >
        <div className="absolute left-0 top-0 h-full w-3 dark:bg-green-900 bg-green-500/80 rounded-tl-md rounded-bl-md"></div>
        {msg}
      </div>
    ) : (
      <div
        className={`dark:bg-red-900/40 bg-red-200 dark:text-red-400 text-red-800 py-3 pl-5 rounded-md text-xl relative mb-2 ${
          isMsg ? "" : "hidden"
        }`}
      >
        <div className="absolute left-0 top-0 h-full w-3 dark:bg-red-900 bg-red-500/80 rounded-tl-md rounded-bl-md"></div>
        {msg}
      </div>
    );
  }
}

export default Alert;
