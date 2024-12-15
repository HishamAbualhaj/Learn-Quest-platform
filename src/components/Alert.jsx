import React from "react";

function Alert({ msg, type }) {
  return type === "success" ? (
    <div className="bg-green-900/40 text-green-400 py-3 pl-5 rounded-md text-xl relative mb-2">
      <div className="absolute left-0 top-0 h-full w-3 bg-green-900 rounded-tl-md rounded-bl-md"></div>
      {msg}
    </div>
  ) : (
    <div className="bg-red-900/40 text-red-400 py-3 pl-5 rounded-md text-xl relative mb-2">
      <div className="absolute left-0 top-0 h-full w-3 bg-red-900 rounded-tl-md rounded-bl-md"></div>
      {msg}
    </div>
  );
}

export default Alert;
