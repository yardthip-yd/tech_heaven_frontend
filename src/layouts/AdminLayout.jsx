import React from "react";
import AdminNav from "../components/admin/AdminNav";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/admin/AdminSideBar";

function AdminLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <AdminNav />
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="flex h-full">
            <AdminSideBar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
