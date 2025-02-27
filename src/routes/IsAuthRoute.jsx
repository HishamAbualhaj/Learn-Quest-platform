import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
function IsAuthRoute({ children, isAllowed = true, role = "user" }) {
  const [isLoading, setIsLoading] = useState(false);
  const dataFetched = useLoaderData();
  const { loggedIn, userData: [{ student_id }] = [{}] } = dataFetched;

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      if (isAllowed) {
        if (student_id === 64928871) {
          role === "admin" ? setIsLoading(true) : navigate("/");
        } else {
          role === "user" ? setIsLoading(true) : navigate("/");
        }
      } else {
        navigate("/");
      }
    } else {
      !isAllowed ? setIsLoading(true) : navigate("/");
    }
  }, []);
  return (
    <>
      {isLoading ? (
        children
      ) : (
        <>
          <div className="bg-dark h-[100vh] text-white flex items-center justify-center text-4xl">
            Loading data ...
          </div>
        </>
      )}
    </>
  );
}

export default IsAuthRoute;
