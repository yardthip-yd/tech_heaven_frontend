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
} from "@/components/ui/dialog";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const actionLoginGoogle = useAuthStore(state => state.actionLoginGoogle);
    
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

    // State from Stores
    const actionLogin = useAuthStore((state) => state.actionLogin);

    // useState for input
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle login for email/password
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        onLogin();

        if (!(input.email.trim() && input.password.trim())) {
            setLoading(false);
            return toast.info("Please fill all information");
        }

        try {
            const result = await actionLogin(input);
            toast.success("Login Successful!");
            onClose();
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message;
            toast.error("Login not successful: " + errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Sign In</DialogTitle>
                    <DialogDescription>
                        Welcome! Sign in to your account. We are so happy to have you here.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full bg-slate-50 border-none p-2"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full bg-slate-50 border-none p-2"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
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
                <button onClick={()=>hdlLoginGoogle()} type="button" className="my-4">
                    Login Google
                </button>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-1">
                        <p className="text-slate-400 cursor-pointer">
                            Forgot Password?
                        </p>
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
    );
};

export default LoginModal;
