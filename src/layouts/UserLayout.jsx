import React from 'react';
import { Outlet } from "react-router-dom";

// Import Components
import MainNav from '@/components/MainNav';
import Footer from "../components/Footer";

const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <MainNav />
            {/* Content area */}
            <div className="flex-grow">
                <Outlet />
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default UserLayout;
