import React from "react";

function Avatar({ img, className }) {

  return (
    <img
      className={`rounded-[50%] object-cover ${className}`}
      src={img}
      alt=""
    />
  );
}

export default Avatar;
