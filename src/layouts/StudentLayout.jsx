import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/Landing-Page/Header";
function Student() {
  return (
    <div className="section_student border-none">
      <div className="pb-2">
        <Header isStudent={true} />
      </div>
      <Outlet />
    </div>
  );
}

export default Student;
