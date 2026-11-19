import React from "react";

function ButtonAdmin({
  text = "Button",
  props = "",
}: {
  text: string;
  props?: string;
}) {
  return (
    <div className="mt-3 cursor-pointer bg-action border border-action  py-2 px-2 text-center rounded-md hover:bg-action-hover text-white transition">
      {text}
    </div>
  );
}

export default ButtonAdmin;
