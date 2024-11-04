import React from "react";
import AdminNav from "@/components/admin/AdminNav";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSideBar";

function AdminLayout() {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col flex-1">
        {/* Navbar*/}
        <AdminNav />

        {/* Main content*/}
        <SidebarProvider>
          <div className="flex flex-1">

            {/* Sidebar*/}  
            <AdminSidebar />

            {/* Content area */}
            <div className="flex-1 p-4 overflow-auto">
              <Outlet />
            </div>

          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

export default AdminLayout;
