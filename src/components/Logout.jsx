import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const dataFetched = useLoaderData();
  useEffect(() => {
    dataFetched ? navigate("/") : "";
  }, []);
  return <></>;
}

export default Logout;
