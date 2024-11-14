import React from 'react';
import { Outlet } from "react-router-dom";

// Import Components
import MainNav from '@/components/MainNav';
import Footer from "../components/Footer";

const UserLayout = () => {
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden relative no-scrollbar">
            <MainNav />
            {/* Content area */}
            <div className="flex-1 min-h-0 overflow-auto no-scrollbar">
                <Outlet />
                <Footer />
            </div>
            {/* Footer */}
        </div>
    );
}

export default UserLayout;
