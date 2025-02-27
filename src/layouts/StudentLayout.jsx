import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../pages/Landing-Page/Header";
function Student() {
  const userDataResponse = useLoaderData();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(userDataResponse);
  }, []);
  const [activeDrop, setActiveDrop] = useState(false);
  useEffect(() => {
    setActiveDrop(activeDrop);
  }, [activeDrop]);
  return (
    <div
      onClick={() => {
        setActiveDrop(false);
      }}
      className="section_student border-none"
    >
      <div className="pb-2">
        <Header
          data={userData}
          isStudent={true}
          sendData={setActiveDrop}
          activeDrop={activeDrop}
        />
      </div>

      <Outlet />
    </div>
  );
}

export default Student;
