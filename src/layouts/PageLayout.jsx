import React from "react";
import { Outlet } from "react-router-dom";

// Import Components
import MainNav from "../components/MainNav";
import ChatButtonContainer from "@/components/chat/ChatButtonContainer";
import Footer from "../components/Footer";

const PageLayout = () => {
  return (

    <div className="flex flex-col min-h-screen w-screen overflow-hidden relative no-scrollbar">
      <MainNav />
      <div className="flex-grow mt-12">
        <Outlet />
      </div>
      <Footer />
      <ChatButtonContainer />
    </div>

  );
};

export default PageLayout;

