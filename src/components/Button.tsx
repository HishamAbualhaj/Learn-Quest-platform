import React from "react";
function Button({
  type,
  text = "Click Here",
  loadingText = "Loading",
  textClr = "text-white",
  textDarkClr,
  bgClr = "bg-purple-700",
  bgDarkClr = "dark:bg-purple-700",
  hoverTextClr,
  hoverBgClr = "hover:bg-purple-900",
  hoverDarkTextClr,
  hoverDarkBgClr = "dark:hover:bg-purple-900",
  padding = "p-2",
  margin = "mt-4",
  props = "",
  isloading = false,
}) {
  return isloading ? (
    <div
      className={`${padding} ${props} ${margin} flex items-center justify-center rounded-md ${bgDarkClr} w-fit cursor-pointer ${hoverDarkBgClr} ${bgClr} ${textClr} ${hoverBgClr} transition`}
    >
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {loadingText}
    </div>
  ) : (
    <button
      type={type}
      className={`${padding} ${props} ${margin} rounded-md ${bgDarkClr} w-fit cursor-pointer ${hoverDarkBgClr} ${bgClr} ${textClr} ${hoverBgClr} transition`}
    >
      {text}
    </button>
  );
}

export default Button;
