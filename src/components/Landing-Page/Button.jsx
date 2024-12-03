import React from "react";

function Button({ outlined, size = "px-4 py-2", text, url, props = "" }) {
  let currentSize = size;
  const sizeLg = "px-4 py-2";
  const sizeXl = "xl:text-xl xl:px-5 xl:py-3 px-4 py-2";
  const size2Xl = "xl:text-2xl xl:px-6 xl:py-4 px-4 py-2";

  const btnProperties =
    "cursor-pointer w-fit border rounded-md transition dark:border-mainClrDark dark:hover:bg-mainClr dark:hover:text-white dark:hover:border-mainClr font-[600]";
  if (size === "2xl") {
    currentSize = size2Xl;
  } else if (size === "xl") {
    currentSize = sizeXl;
  } else if (size === "lg") {
    currentSize = sizeLg;
  }
  return (
    <>
      {outlined ? (
        <div
          className={`${currentSize} ${props} ${btnProperties} border-lightBtn text-mainClr dark:text-white hover:bg-mainClr hover:text-white hover:border-mainClr`}
        >
          <a href={url}>{text}</a>
        </div>
      ) : (
        <div
          className={`${currentSize} ${props} ${btnProperties} border-mainClr border dark:bg-mainClrDark   bg-mainClr dark:text-lightText text-white hover:bg-mainClrDark hover:border-mainClrDark`}
        >
          <a href={url}> {text}</a>
        </div>
      )}
    </>
  );
}

export default Button;
