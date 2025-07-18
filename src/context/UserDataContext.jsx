import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useLoaderData } from "react-router-dom";
export const UserData = createContext();
function UserDataContext({ children }) {
  const userDataResponse = useLoaderData();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(userDataResponse);
  }, [userDataResponse]);
  return <UserData.Provider value={userData}>{children}</UserData.Provider>;
}

export default UserDataContext;
