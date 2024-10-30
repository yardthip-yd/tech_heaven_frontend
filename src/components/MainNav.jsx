import React, { useState } from 'react'
import { CartIcon, UserIcon } from './ui/Icon'
import LoginModal from './LoginModal';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MainNav = () => {
    // State for Login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // State incase user is Admin
    const [isAdmin, setIsAdmin] = useState(false);

    // Fn when click UserIcon
    const hdlUserIconClick = () => {
        if (!isLoggedIn) {
            setIsDialogOpen(true);
        }
    };

    // Fn Mockup will change after we have admin
    const hdlLogin = () => {
        const userRole = "Admin";

        setIsLoggedIn(true);
        setIsDialogOpen(false);
        setIsAdmin(userRole === "Admin");
    };

    return (
        <div className="flex h-12 w-full items-center px-8 justify-between">

            {/* Logo */}
            <a className="text-2xl font-bold">LOGO</a>

            {/* NavBar  */}
            <div>
                <ul className="flex items-center gap-4">
                    <li className="hover:scale-105 hover:-translate-y-1 hover:duration-200">
                        <p>HOME</p>
                    </li>
                    <li className="hover:scale-105 hover:-translate-y-1 hover:duration-200">
                        <p>STORE</p>
                    </li>
                    <li className="hover:scale-105 hover:-translate-y-1 hover:duration-200">
                        <p>BOOKING</p>
                    </li>
                    <li>
                        {/* <UserIcon
                            onClick={hdlUserIconClick}
                            className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" /> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div onClick={hdlUserIconClick} className="cursor-pointer">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                            </DropdownMenuTrigger>

                            {/* แสดง DropdownMenuContent หากผู้ใช้ login แล้ว */}
                            {isLoggedIn && (
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => alert("Profile clicked")}>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => alert("Billing clicked")}>
                                        Wishlist
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => alert("Billing clicked")}>
                                        Purchase
                                    </DropdownMenuItem>
                                    {isAdmin && (
                                        <DropdownMenuItem onClick={() => alert("Dashboard clicked")}>
                                            Dashboard
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => alert("Logout clicked")}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            )}
                        </DropdownMenu>
                    </li>
                    <li>
                        <CartIcon className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" />
                    </li>
                </ul>
            </div>

            {/* Show Dialog Login */}
            <LoginModal
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onLogin={hdlLogin}
            />
        </div>
    )
}

export default MainNav