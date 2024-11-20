import React from "react";

function Button({
  text,
  textClr = "text-white",
  textDarkClr,
  bgClr = "bg-purple-600",
  bgDarkClr = "bg-purple-700/40",
  hoverTextClr,
  hoverBgClr = "bg-purple-700",
  hoverDarkTextClr,
  hoverDarkBgClr = "bg-purple-700",
  padding = "p-2",
  margin = "mt-4",
  props,
}) {
  return (
    <div
      className={`btn ${padding} ${props} ${margin} rounded-md dark:${bgDarkClr} w-fit cursor-pointer dark:hover:${hoverDarkBgClr} ${bgClr} ${textClr} hover:${hoverBgClr} transition`}
    >
      {text}
    </div>
  );
}

export default Button;
