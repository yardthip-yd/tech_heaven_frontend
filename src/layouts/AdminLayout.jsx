import React from "react";
import AdminNav from "../components/admin/AdminNav";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <AdminNav />
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
