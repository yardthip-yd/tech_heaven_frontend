import React, { useState } from "react";
import { toast } from "react-toastify";
import Authvdo from "@/assets/video/auth.mp4";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";

const Register = () => {
    // State from Stores
    const actionRegister = useAuthStore((state) => state.actionRegister);

    // State for Login Modal
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // useState for input
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Fn handleChange update input when user fill information
    const hdlChange = (e) => {
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };

    // Fn handleRegister for register success
    const hdlRegister = async (e) => {
        try {
            e.preventDefault();

            // Validation
            // Check user fill information or not?
            if (
                !(
                    input.firstName &&
                    input.lastName &&
                    input.dateOfBirth &&
                    input.email &&
                    input.password &&
                    input.confirmPassword
                )
            ) {
                // return alert("Please fill all informations")
                return toast.info("Please fill all informations");
            }

            // Check password match with confirm password
            if (input.password !== input.confirmPassword) {
                // return alert("Password do not match")
                return toast.info("Password do not match");
            }

            // Send information input
            await actionRegister(input);

            // Clear input
            setInput({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            console.log("Register Successful!");
            toast.success("Register Successful!");
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message;
            console.log("Register not success", errMsg);
            toast.error("Register not success", errMsg);
        }
    };

    return (
        <div className="h-screen w-full flex items-center min-h-[500px]">
            {/* Background */}
            <div>
                <video
                    className="absolute right-0 top-0 h-screen w-full object-cover z-[-1]"
                    src={Authvdo}
                    autoPlay
                    loop
                    muted
                ></video>
                {/* Black Overlay */}
                <div className="absolute h-screen inset-0 bg-black opacity-40 z-[-1]"></div>
            </div>

            {/* Register */}
            <div className="m-auto p-8 flex flex-col items-center bg-white rounded-lg">
                {/* Intro */}
                <div className="w-full flex flex-col text-start gap-2 text-slate-900">
                    <h2 className="text-2xl font-bold">Register</h2>
                    <p className="mb-4">
                        {" "}
                        Create your account. It’s free and only take a minute.{" "}
                    </p>
                </div>

                {/* Form Register */}
                <form
                    className="flex flex-col gap-3 relative pb-8"
                    onSubmit={hdlRegister}
                >
                    {/* Firstname and Lastname */}
                    <div className="flex items-center gap-2">
                        <input
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            type="text"
                            placeholder="Firstname"
                            name="firstName"
                            value={input.firstName}
                            onChange={hdlChange}
                        />
                        <input
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            type="text"
                            placeholder="Surname"
                            name="lastName"
                            value={input.lastName}
                            onChange={hdlChange}
                        />
                    </div>

                    {/* DateOfBirth */}
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-gray-400 pl-2">Birthdate</p>
                        <input
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            type="date"
                            placeholder="Birthday"
                            name="dateOfBirth"
                            value={input.dateOfBirth}
                            onChange={hdlChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-row items-center gap-2">
                        <input
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={input.email}
                            onChange={hdlChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-row items-center gap-2">
                        <input
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={hdlChange}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-row items-center gap-2">
                        <input
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={hdlChange}
                        />
                    </div>

                    {/* Button Register */}
                    <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full border-none mt-4 text-lg p-2"
                    >
                        Sign up
                    </button>
                </form>

                {/* Go to login */}
                <div className="flex gap-1">
                    <p className="text-slate-900">Already Create an Account?</p>
                    <div
                        onClick={() => setIsLoginModalOpen(true)}
                        className="hover:text-blue-500 transition-colors duration-300"
                    >
                        <p className="text-sky-500">Sign In</p>
                    </div>
                </div>
            </div>

            {/* แสดง LoginModal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={() => setIsLoginModalOpen(false)}
            />
        </div>
    );
};

export default Register;
