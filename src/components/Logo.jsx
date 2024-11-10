import React from "react";

export default function Logo({ textSize = "text-2xl" }) {
  return (
    <div
      className={`dark:text-white text-black ${textSize} py-[18px] font-bold flex gap-1`}
    >
      LEARN <div className="text-purple-600">QUEST</div>
    </div>
  );
}
