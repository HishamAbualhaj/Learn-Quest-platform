import React from "react";
import Logo from "./Logo";
function Loading() {
  return (
    <div className="text-4xl section flex justify-center items-center w-full h-full absolute top-0 left-0 z-10">
      <div className="animate-syncPuls">
        <Logo />
      </div>
    </div>
  );
}

export default Loading;
