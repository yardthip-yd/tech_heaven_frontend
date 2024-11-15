import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSideBar";
import ChatButtonContainer from "@/components/chat/ChatButtonContainer";
import MainNav from "@/components/MainNav";

function AdminLayout() {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col min-h-screen w-screen overflow-hidden relative no-scrollbar">
        {/* Navbar*/}
        <MainNav />

        {/* Main content*/}
        <SidebarProvider>
          <div className="flex flex-1">
            {/* Sidebar*/}
            <AdminSidebar />

            {/* Content area */}
            <div className="flex-1 overflow-auto flex-grow mt-12">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </div>
      <ChatButtonContainer />
    </div>
  );
}

export default AdminLayout;
