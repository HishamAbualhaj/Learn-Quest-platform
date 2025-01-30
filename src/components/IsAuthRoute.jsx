import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

function IsAuthRoute({ children }) {
  const dataFetched = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    dataFetched ? navigate("/") : "";
  }, []);
  return <>{children}</>;
}

export default IsAuthRoute;
