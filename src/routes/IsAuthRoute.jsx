import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
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
  return <>{isLoading ? children : <Loading />}</>;
}

export default IsAuthRoute;
