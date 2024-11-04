// Import
import React from 'react'
import { Outlet } from "react-router-dom";

//Import Components
import MainNav from '@/components/MainNav';

const UserLayout = () => {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            <div className="flex flex-1 flex-col flex-grow">
                <MainNav />
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout