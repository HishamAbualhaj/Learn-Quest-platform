"use client";
import React, { useState, useEffect } from "react";
import { createContext } from "react";
export const UserData = createContext();
function UserDataContext({ children }) {
  // const userDataResponse = useLoaderData();

  const userData = {}

  return <UserData.Provider value={userData}>{children}</UserData.Provider>;
}

export default UserDataContext;
