import React from "react";
import { useRouteError } from "react-router-dom";
function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex items-center justify-center h-[100vh] bg-dark flex-col gap-2">
      <h1 className="md:text-4xl text-xl text-center   text-red-400 ">
        Something went wrong
      </h1>
      <div className="text-gray-400 text-lg">Try to reload page, </div>
      <div className="mt-4">{error.message || "Unknown error"}</div>
    </div>
  );
}

export default ErrorPage;
