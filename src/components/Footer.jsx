import React from "react";
import { Instagram, Facebook } from "lucide-react";
import TechLogo from "@/assets/image/logo.png";

const Footer = () => {
    return (
        <div className="bg-black text-white py-8 flex flex-col items-center space-y-6 relative backdrop-blur-lg shadow-lg rounded-md">
            {/* Logo */}
            <img src={TechLogo} alt="Tech Heaven Logo" className="w-12 h-12 shadow-glow border-none" />

            {/* Company Info */}
            <div className="text-center space-y-2">
                <p className="text-lg font-semibold">Tech Heaven Ltd.</p>
                <p>Providing reliable tech since 1992</p>
                <p>Copyright © 2024 - All rights reserved</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
                <a href="#" aria-label="Twitter" className="hover:text-blue-500">
                    <Instagram size={24} />
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                    <Facebook size={24} />
                </a>
            </div>
        </div>
    );
};

export default Footer;
