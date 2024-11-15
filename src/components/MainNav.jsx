import { useEffect, useState } from "react";
import LoginModal from "./auth/LoginModal";
import UserDropdown from "./auth/UserDropdown";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom";
import CartSidebar from "./cart/CartSidebar";
import TechLogo from "@/assets/image/logo.png";
import { Menu, ChevronDown } from "lucide-react";

const MainNav = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hdlLoginIconClick = () => {
    setIsDialogOpen(true);
    setIsMobileMenuOpen(false);
  };

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
    }
  }, [currentUser]);

  const navLinks = [
    { to: "/", text: "HOME" },
    { to: "/store", text: "STORE" },
    { to: "/pcbuild", text: "CUSTOMIZE YOUR SPEC" },
    { to: "/booking", text: "BOOKING" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg">
      <div className="flex h-12 w-full items-center px-4 md:px-8 py-6 bg-white/70 backdrop-blur-lg shadow-lg rounded-md">
        {/* Logo */}
        <Link to="/">
          <img src={TechLogo} alt="Tech Logo" className="h-10 w-10 cursor-pointer" />
        </Link>


        <div className="flex-grow"></div>

        {/* Desktop Navigation and User Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:scale-105 hover:-translate-y-1 hover:duration-200 hover:text-blue-500 hover:font-bold"
              >
                {link.text}
              </Link>
            ))}
          </ul>

          {/* User Controls */}
          {!isLoggedIn ? (
            <button
              onClick={hdlLoginIconClick}
              className="hover:scale-105 hover:duration-200"
            >
              LOGIN
            </button>
          ) : (
            <UserDropdown
              setIsDialogOpen={setIsDialogOpen}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          )}
          <CartSidebar />
        </div>

        {/* Mobile User Controls */}
        <div className="md:hidden flex items-center gap-4">
          {!isLoggedIn ? (
            <button
              onClick={hdlLoginIconClick}
              className="hover:scale-105 hover:duration-200"
            >
              LOGIN
            </button>
          ) : (
            <UserDropdown
              setIsDialogOpen={setIsDialogOpen}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          )}
          <CartSidebar />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-600"
          >
            {isMobileMenuOpen ? <ChevronDown size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 hover:bg-slate-100 hover:scale-105 hover:-translate-y-0.5 hover:text-blue-500 hover:font-bold transition-all duration-200 ease-in-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLogin={hdlLogin}
      />
    </div>
  );
};

export default MainNav;
