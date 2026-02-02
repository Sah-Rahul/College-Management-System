import AdminLayout from "@/src/admin/Layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
