import { useEffect } from 'react';
import { CartIcon, UserIcon } from '@/components/ui/Icon';
import useAuthStore from '@/stores/authStore';
import { useNavigate } from "react-router-dom";
import { Heart, LayoutDashboard, LogOut } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from '../Avatar';

const UserDropdown = ({ setIsLoggedIn, isLoggedIn, isAdmin, setIsAdmin }) => {
    const actionLogout = useAuthStore((state) => state.actionLogout);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const hdlLogout = () => {
        actionLogout();
        setIsLoggedIn(false);
        navigate(`/`);
    };

    const checkIfAdmin = () => {
        if (user && user.user && user.user.role === "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        console.log("User role:", user?.user?.role);
    };

    useEffect(() => {
        if (user && user.user && user.user.role) {
            checkIfAdmin();
            console.log("User role from useEffect:", user?.user?.role);
        }
    }, [user]);

    const goToDashboard = () => {
        navigate("/admin");
    };

    const goToProfile = () => {
        navigate("/user");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                    <Avatar className="w-8 h-8 rounded-full flex items-center" imgSrc={user?.profileImage}/>
                </div>
            </DropdownMenuTrigger>

            {/* Show dropdown content if user is logged in */}
            {isLoggedIn && (
                <DropdownMenuContent className="min-w-44">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={goToProfile} className="py-2">
                        <UserIcon />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert("Wishlist clicked")} className="py-2">
                        <Heart />
                        Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert("Purchase clicked")} className="py-2">
                        <CartIcon />
                        Purchase
                    </DropdownMenuItem>
                    {isAdmin && (
                        <DropdownMenuItem onClick={goToDashboard} className="py-2">
                            <LayoutDashboard />
                            Dashboard
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={hdlLogout}>
                        <LogOut />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default UserDropdown;
