import React from "react";

function ButtonAdmin({ text = "Button" , props = "" }) {
  return (
    <div className="mt-3 cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border border-borderLight  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 text-black dark:text-white hover:text-white transition">
      {text}
    </div>
  );
}

export default ButtonAdmin;
