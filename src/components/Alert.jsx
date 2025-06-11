import React, { act, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Alert({ msg = "", type }) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (msg) setActive(true);
  }, [msg]);
  return (
    <>
      {active &&
        (type === "success" ? (
          <div
            className={`flex items-center justify-between  dark:bg-green-900/40 bg-green-200 dark:text-green-400 text-green-800 py-3 px-5 rounded-md text-xl relative mb-2`}
          >
            <div className="absolute left-0 top-0 h-full w-3 dark:bg-green-900 bg-green-500/80 rounded-tl-md rounded-bl-md"></div>
            {msg}
            <FontAwesomeIcon
              onClick={() => {
                setActive(false);
              }}
              className="cursor-pointer"
              icon={faXmark}
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-between dark:bg-red-900/40 bg-red-200 dark:text-red-400 text-red-800 py-3 px-5 rounded-md text-xl relative mb-2`}
          >
            <div className="absolute left-0 top-0 h-full w-3 dark:bg-red-900 bg-red-500/80 rounded-tl-md rounded-bl-md"></div>
            {msg}
            <FontAwesomeIcon
              onClick={() => {
                setActive(false);
              }}
              className="cursor-pointer"
              icon={faXmark}
            />
          </div>
        ))}
    </>
  );
}

export default Alert;
