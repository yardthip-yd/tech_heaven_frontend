import React from "react";
import { Outlet } from "react-router-dom";

// Import Components
import MainNav from "../components/MainNav";
import ChatButtonContainer from "@/components/chat/ChatButtonContainer";

const PageLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden relative">
      <div className="flex flex-col flex-1">
        <MainNav />
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
      <ChatButtonContainer />
    </div>
  );
};

export default PageLayout;
