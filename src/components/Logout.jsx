import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const dataFetched = useLoaderData();
  useEffect(() => {
    navigate("/");
  }, []);
  return <></>;
}

export default Logout;
