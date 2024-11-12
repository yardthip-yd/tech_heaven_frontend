import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserRoundCog, 
  Package, 
  CalendarDays,
  Cpu, 
  Database,
  ChevronRight,
  Tag
} from "lucide-react";

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
    <Sidebar className="w-64 h-full mt-12 border-r border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-lg font-semibold text-slate-700">
            Admin Menu
          </SidebarGroupLabel>
          <SidebarMenu className="mt-4 space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem 
                key={item.path}
                className="relative py-2 px-4 group"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center w-full rounded-lg p-2 text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 transition-colors duration-200
                      group-hover:text-blue-500`}
                    />
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight className={`ml-auto w-4 h-4 transition-transform duration-200
                    group-hover:translate-x-1 opacity-0 group-hover:opacity-100`}
                  />
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin"
  },
  {
    label: "User Management",
    icon: UserRoundCog,
    path: "/admin/usermng"
  },
  {
    label: "Products",
    icon: Cpu,
    path: "/admin/product"
  },
  {
    label: "Categories",
    icon: Database,
    path: "/admin/category"
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    path: "/admin/bookingsmng"
  },
  {
    label: "Orders",
    icon: Package,
    path: "/admin/ordermng"
  },
  {
    label: "Promotion",
    icon: Tag,
    path: "/admin/promotion"
  }
];

export default AdminSidebar;