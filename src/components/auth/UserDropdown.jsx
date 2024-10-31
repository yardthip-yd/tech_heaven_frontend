import { useEffect } from 'react';
import { UserIcon } from '@/components/ui/Icon';
import useAuthStore from '@/stores/authStore';
import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        if (user && user.role === "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        if (user) {
            checkIfAdmin();
        }
    }, [user]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                    <UserIcon className="w-5 h-5" />
                </div>
            </DropdownMenuTrigger>

            {/* Show dropdown content if user is logged in */}
            {isLoggedIn && (
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => alert("Profile clicked")}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert("Wishlist clicked")}>
                        Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert("Purchase clicked")}>
                        Purchase
                    </DropdownMenuItem>
                    {isAdmin && (
                        <DropdownMenuItem onClick={() => alert("Dashboard clicked")}>
                            Dashboard
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={hdlLogout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default UserDropdown;
