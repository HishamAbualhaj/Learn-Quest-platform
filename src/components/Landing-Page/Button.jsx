import React from "react";

function Button({ outlined, size = "px-4 py-2", text, url }) {
  let currentSize = size;
  const sizeLg = "px-4 py-2";
  const sizeXl = "xl:text-xl xl:px-5 xl:py-3 px-4 py-2";
  const size2Xl = "xl:text-2xl xl:px-6 xl:py-4 px-4 py-2";

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
          className={`${currentSize} cursor-pointer w-fit border rounded-md dark:border-mainClrDark border-lightBtn text-mainClr dark:text-white font-[600] hover:bg-mainClrDark hover:text-white hover:border-mainClrDark transition`}
        >
          <a href={url}>{text}</a>
        </div>
      ) : (
        <div
          className={`${currentSize} cursor-pointer w-fit rounded-md border dark:bg-mainClrDark dark:border-mainClrDark border-mainClr bg-mainClr dark:text-black text-white  font-[600] transition hover:bg-mainClrDark hover:text-white hover:border-mainClrDark`}
        >
          <a href={url}> {text}</a>
        </div>
      )}
    </>
  );
}

export default Button;
