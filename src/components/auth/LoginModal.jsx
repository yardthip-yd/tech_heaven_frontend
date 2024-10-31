import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "@/stores/authStore";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


// Import Reset Password
import ForgotPassModal from "./ForgotPassModal";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const actionLoginGoogle = useAuthStore((state) => state.actionLoginGoogle);
    const actionLogin = useAuthStore((state) => state.actionLogin);

    const hdlLoginGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                const res = await actionLoginGoogle(codeResponse);
                // setUser(res);
                // console.log("asdadads")
                console.log("check res function --> ", res);
                onLogin()
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    // State for input
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    // Fn handleChange update input when user fill information
    const hdlChange = (e) => {
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };


    // Fn handleLogin for register success
    const hdlLogin = async (e) => {
        try {
            e.preventDefault()
            onLogin()
            setLoading(true);
            // Validation 
            // Check user fill information or not?
            if (!(input.email.trim() && input.password.trim())) {
                setLoading(false);
                return toast.info("Please fill all informations")
            }

            try {
                // Send information input
                const result = await actionLogin(input)
                // console.log("Login Successful!")
                toast.success("Login Successful!")
                onClose();
                navigate(`/`);
            } catch (err) {
                const errMsg = err.response?.data?.error || err.message;
                toast.error("Login not successful: " + errMsg);
            } finally {
                setLoading(false);
            }
            
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message
            // console.log("Login not success", errMsg)
            toast.error("Login not success", errMsg)
        }
    }

    // State for controlling modal visibility (Reset Password)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fn to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Fn to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Fn to handle reset success navigate to login
    const hdlResetSuccess = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Sign In</DialogTitle>
                        <DialogDescription>
                            Welcome! Sign in to your account. We are so happy to have you here.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={hdlLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Email"
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            name="email"
                            value={input.email}
                            onChange={hdlChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full bg-slate-50 border-none p-2"
                            name="password"
                            value={input.password}
                            onChange={hdlChange}
                            required
                        />
                        <button
                            type="submit"
                            className="btn bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full border-none mt-4 w-full p-2 text-lg"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    {/* Google Login */}
                    <button onClick={() => hdlLoginGoogle()} type="button" className="my-4">
                        Login with Google
                    </button>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-1">
                            <p onClick={openModal} className="text-slate-400 cursor-pointer">Forgot Password?</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-slate-900">Create an Account?</p>
                            <Link
                                to={"/register"}
                                onClick={onClose}
                                className="hover:text-blue-500 transition-colors duration-300"
                            >
                                <p className="text-sky-500">Register</p>
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Reset Password Modal */}
            <ForgotPassModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onResetSuccess={hdlResetSuccess}
                className="z-50"
            />
        </>
    );
};

export default LoginModal;
