import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
function IsAuthRoute({ children, isAllowed = true, isAdmin = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const dataFetched = useLoaderData();
  const { loggedIn, userData: [{ role }] = [{}] } = dataFetched;

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      if (isAllowed) {
        if (isAdmin) {
          role === "admin" ? setIsLoading(true) : navigate("/");
        } else {
          role === "admin" ? navigate("/") : setIsLoading(true);
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
