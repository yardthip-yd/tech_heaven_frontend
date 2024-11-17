import React, { useContext, useEffect } from "react";
import { UserIcon } from "@/components/ui/Icon";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Heart, LayoutDashboard, LogOut, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../Avatar";
import { SocketContext } from "@/contexts/SocketContext";
import useBookingStore from "@/stores/bookingStore";

const UserDropdown = ({ setIsLoggedIn, isLoggedIn, isAdmin, setIsAdmin }) => {
  const { setAdminActiveChat } = useContext(SocketContext);
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const clearBooking = useBookingStore(state => state.clearBooking)
  const hdlLogout = () => {
    setAdminActiveChat(null);
    clearBooking()
    actionLogout();
    setIsLoggedIn(false);
    navigate(`/`);
  };

  useEffect(() => {
    setIsAdmin(user?.role === "ADMIN");
    
  }, [user, setIsAdmin]);

  const goToDashboard = () => navigate("/admin");
  const goToProfile = () => navigate("/user");
  const goToWishlist = () => navigate("/user/wishlist");
  const goToPurchase = () => navigate("/user/purchase");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Avatar
            className="w-8 h-8 rounded-full flex items-center"
            imgSrc={user?.profileImage}
          />
        </div>
      </DropdownMenuTrigger>

      {isLoggedIn && (
        <DropdownMenuContent className="min-w-44">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={goToProfile} className="py-2">
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={goToWishlist} className="py-2">
            <Heart />
            Wishlist
          </DropdownMenuItem>
          <DropdownMenuItem onClick={goToPurchase} className="py-2">
            <ShoppingBag />
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
