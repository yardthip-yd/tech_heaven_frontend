import React from "react";
import { Link } from "react-router-dom";

function AdminSideBar() {
  return (
    <div className="h-full w-[200px]">
      <ul>
        <li>
          <Link to={"/admin"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/admin/usermng"}>User Manage</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSideBar;
