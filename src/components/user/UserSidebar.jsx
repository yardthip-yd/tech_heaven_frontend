import React from "react";
import useAuthStore from "@/stores/authStore";
import { UserIcon } from "../ui/Icon";
import { LogOut, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const UserSidebar = ({ onSelect }) => {
    const actionLogout = useAuthStore((state) => state.actionLogout);
    const navigate = useNavigate();

    const handleLogout = () => {
        actionLogout();
        navigate("/");
    };

    return (
        <div className="flex flex-col w-[256px] border-none rounded-2xl">
            <button
                className="btn btn-wide h-[80px] rounded-none bg-white border-none hover:bg-slate-100 shadow-none rounded-tl-2xl flex flex-row gap-4 pl-6 items-center"
                onClick={() => onSelect("profile")}
            >
                <UserIcon className="w-4 h-4" />
                My Profile
            </button>
            <button
                className="btn btn-wide h-[80px] rounded-none bg-white border-none hover:bg-slate-100 shadow-none flex flex-row gap-4 pl-6 items-center"
                onClick={() => onSelect("wishlist")}
            >
                <Heart className="w-4 h-4" />
                Wishlist
            </button>
            <button
                className="btn btn-wide h-[80px] rounded-none bg-white border-none hover:bg-slate-100 shadow-none flex flex-row gap-4 pl-6 items-center"
                onClick={() => onSelect("purchase")}
            >
                <ShoppingBag className="w-4 h-4" />
                Purchase
            </button>
            <button
                className="btn btn-wide h-[80px] rounded-none bg-white border-none hover:bg-slate-100 shadow-none flex flex-row gap-4 pl-6 items-center"
                onClick={handleLogout}
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </div>
    );
};

export default UserSidebar;
