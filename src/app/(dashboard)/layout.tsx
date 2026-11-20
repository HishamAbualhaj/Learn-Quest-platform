import React from "react";
import Dashboard from "@/layouts/DashboardLayout";
import getSession from "@/lib/getSession";
const layout = async ({ children }: { children: React.ReactNode }) => {
  const { userDataServer } = await getSession();
  const user = userDataServer?.[0];
  return (
    <Dashboard
      firstName={user?.first_name ?? "Admin"}
      imageUrl={user?.image_url ?? ""}
    >
      {children}
    </Dashboard>
  );
};

export default layout;
