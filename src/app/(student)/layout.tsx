import React from "react";
import Student from "@/layouts/StudentLayout";
const layout = ({ children }: { children: React.ReactNode }) => {
  return <Student>{children}</Student>;
};

export default layout;
