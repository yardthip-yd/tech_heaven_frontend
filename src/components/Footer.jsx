import React from "react";
import { Instagram, Facebook } from "lucide-react";
import TechLogo from "@/assets/image/logo.png";

const Footer = () => {
    return (
        <div className="bg-black text-white py-8 px-4 sm:px-8 flex flex-col items-center space-y-4 sm:space-y-6 text-center">
            {/* Logo */}
            <img src={TechLogo} alt="Tech Heaven Logo" className="w-10 h-10 sm:w-12 sm:h-12 shadow-glow" />

            {/* Company Info */}
            <div className="space-y-1 sm:space-y-2">
                <p className="text-base sm:text-lg font-semibold">Tech Heaven Ltd.</p>
                <p className="text-sm sm:text-base">Providing reliable tech since 1992</p>
                <p className="text-xs sm:text-sm">Copyright © 2024 - All rights reserved</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 sm:space-x-4">
                <a href="#" aria-label="Instagram" className="hover:text-blue-500">
                    <Instagram size={20} sm:size={24} />
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                    <Facebook size={20} sm:size={24} />
                </a>
            </div>
        </div>
    );
};

export default Footer;
