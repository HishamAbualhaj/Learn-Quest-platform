"use client";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";

import Logout from "@/pages-content/auth/Logout";

const page = async () => {
  await useFetch(`${API_BASE_URL}/logout`, null, "GET");
  return <Logout />;
};

export default page;
