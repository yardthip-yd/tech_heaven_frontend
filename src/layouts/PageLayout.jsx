import React from "react";
import { Outlet } from "react-router-dom";

// Import Components
import MainNav from "../components/MainNav";
import ChatButtonContainer from "@/components/chat/ChatButtonContainer";
import Footer from "../components/Footer";

const PageLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden relative no-scrollbar">
      <MainNav />
      <div className="flex-1 min-h-0 overflow-auto no-scrollbar">
        <Outlet />
        <Footer />
      </div>
      <ChatButtonContainer />
    </div>
  );
};

export default PageLayout;
