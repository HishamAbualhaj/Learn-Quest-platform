import React from "react";

function Loader() {
  return (
    <div className=" dark:border-borderDark rounded-xl p-4 bg-white dark:bg-dark">
      <div>
        <div
          className="rounded-md w-full h-[300px] object-cover bg-gray-500/20 animate-syncPuls"
          src=""
          alt=""
        />
      </div>
      <div className="">
        <div className="flex items-center justify-between h-10 gap-5 mt-5">
          <div className="bg-gray-500/20 rounded-md h-full w-full animate-syncPuls"></div>
          <div className="bg-gray-500/20 rounded-md h-full w-1/4 animate-syncPuls"></div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <div className="bg-gray-500/20 rounded-md w-full h-5 animate-syncPuls"></div>
          <div className="bg-gray-500/20 rounded-md w-full h-5 animate-syncPuls"></div>
          <div className="bg-gray-500/20 rounded-md w-full h-5 animate-syncPuls"></div>
        </div>

        <div className="mt-5 flex gap-2 h-8">
          <div className="bg-gray-500/20 rounded-md h-full w-1/4 animate-syncPuls"></div>
          <div className="bg-gray-500/20 rounded-md h-full w-1/4 animate-syncPuls"></div>
        </div>

      </div>
    </div>
  );
}

export default Loader;
