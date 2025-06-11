import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const result = useLoaderData();
  useEffect(() => {
    if (result) {
      navigate("/");
    }
  }, [result]);
  return <></>;
}

export default Logout;
