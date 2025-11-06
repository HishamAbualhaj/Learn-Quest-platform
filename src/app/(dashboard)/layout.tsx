import React from "react";
import Dashboard from "@/layouts/DashboardLayout";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <Dashboard>{children}</Dashboard>;
};

export default layout;
