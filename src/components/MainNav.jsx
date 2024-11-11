import { useEffect, useState } from "react";
import LoginModal from "./auth/LoginModal";
import UserDropdown from "./auth/UserDropdown";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom";
import CartSidebar from "./cart/CartSidebar";

const MainNav = () => {
  const currentUser = useAuthStore((state) => state.user);

  // State for Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State incase user is Admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Fn when click UserIcon
  const hdlLoginIconClick = () => {
    setIsDialogOpen(true);
  };

  // Fn handle login
  const hdlLogin = () => {
    if (currentUser) {
      setIsLoggedIn(true);
      setIsDialogOpen(false);
      setIsAdmin(currentUser.role === "ADMIN");
    }
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
      console.log("Current user:", currentUser);
    }
  }, [currentUser]);

  return (
    <div className="flex h-12 w-full items-center px-8 justify-between">
      {/* Logo */}
      <a className="text-2xl font-bold">LOGO</a>

      {/* NavBar  */}
      <div>
        <ul className="flex items-center gap-4">
          <Link
            to={"/"}
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            HOME
          </Link>
          <Link
            to={"/store"}
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            STORE
          </Link>
          <Link
            to={"/pcbuild"}
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            PC BUILD
          </Link>
          <Link
            to={"/booking"}
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            BOOKING
          </Link>
          <li>
            {!isLoggedIn && (
              <button
                onClick={hdlLoginIconClick}
                className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
              >
                LOGIN
              </button>
            )}

            {isLoggedIn && (
              <UserDropdown
                setIsDialogOpen={setIsDialogOpen}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            )}
          </li>
          <li>
            <CartSidebar />
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
  );
};

export default MainNav;
