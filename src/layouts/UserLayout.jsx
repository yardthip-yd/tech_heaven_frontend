import React from 'react';
import { Outlet } from "react-router-dom";

// Import Components
import MainNav from '@/components/MainNav';
import Footer from "../components/Footer";

const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen w-screen overflow-hidden relative no-scrollbar">
            <MainNav />
            <div className="flex-grow mt-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;
