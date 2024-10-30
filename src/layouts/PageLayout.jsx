import React from 'react'
import { Outlet } from 'react-router-dom'

// Import Components
import MainNav from '../components/MainNav'


const PageLayout = () => {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="flex flex-col flex-1">
                <MainNav />
                <div className="flex-1 min-h-0 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PageLayout