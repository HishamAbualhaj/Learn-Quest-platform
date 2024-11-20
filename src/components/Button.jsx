import React from "react";
function Button({
  text,
  textClr = "text-white",
  textDarkClr,
  bgClr = "bg-purple-600",
  bgDarkClr = "dark:bg-purple-700/40",
  hoverTextClr,
  hoverBgClr = "hover:bg-purple-700",
  hoverDarkTextClr,
  hoverDarkBgClr = "dark:hover:bg-purple-700",
  padding = "p-2",
  margin = "mt-4",
  props = "",
}) {
  return (
    <div
      className={`${padding} ${props} ${margin} rounded-md ${bgDarkClr} w-fit cursor-pointer ${hoverDarkBgClr} ${bgClr} ${textClr} ${hoverBgClr} transition`}
    >
      {text}
    </div>
  );
}

export default Button;
