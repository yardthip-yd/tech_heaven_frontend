import React from "react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function AdminSideBar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <ul>
                  <li>
                    <Link to={"/admin"}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to={"/admin/usermng"}>User Manage</Link>
                  </li>
                </ul>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

// function AdminSideBar() {
//   return (
//     <div className="h-full w-[200px]">
//       <ul>
//         <li>
//           <Link to={"/admin"}>Dashboard</Link>
//         </li>
//         <li>
//           <Link to={"/admin/usermng"}>User Manage</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

export default AdminSideBar;
