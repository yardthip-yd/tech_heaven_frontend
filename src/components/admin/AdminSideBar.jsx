import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, UserRoundCog, ListOrdered, BookCheck } from "lucide-react";
import { Cpu, Database } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function AdminSidebar() {
  console.log("AdminSidebar");
  return (
    <Sidebar className="w-64 h-full mt-12 border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <LayoutDashboard />
              <NavLink
                to={"/admin"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                  }
                  end
              >
                Dashboard
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <UserRoundCog />
              <NavLink
                to={"/admin/usermng"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                }
              >
                User Manage
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <Cpu />
              <NavLink
                to={"/admin/product"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                }
              >
                Products
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <Database />
              <NavLink
                to={"/admin/category"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                }
              >
                Category
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <BookCheck />
              <NavLink
                to={"/admin/bookingsmng"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                }
              >
                Bookings Manage
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <ListOrdered />
              <NavLink
                to={"/admin/ordermng"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                }
              >
                Order Manage
              </NavLink>
            </SidebarMenuItem>
            <SidebarMenuItem className="py-2 flex flex-row gap-2">
              <ListOrdered />
              <NavLink
                to={"/admin/couponManage"}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 flex gap-2 transform translate-x-8 transition-transform duration-100"
                    : "hover:text-yellow-500 flex gap-2 transform translate-x-0 hover:scale-105 transition-transform duration-100"
                }
              >
                CouponManage
              </NavLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
