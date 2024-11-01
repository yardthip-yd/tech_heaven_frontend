import React from "react";
import { Link } from "react-router-dom";
import { Cpu, Database, LayoutDashboard, UserRoundCog } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function AdminSidebar() {
  return (
    <Sidebar className="w-64 h-full mt-12 border-none absolute">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <LayoutDashboard />
              <Link to={"/admin"}>Dashboard</Link>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <UserRoundCog />
              <Link to={"/admin/usermng"}>User Manage</Link>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <Cpu />
              <Link to={"/admin/product"}>Products</Link>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <Database />
              <Link to={"/admin/category"}>Category</Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
