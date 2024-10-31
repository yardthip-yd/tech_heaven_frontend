import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "@/stores/authStore";

const LoginModal = ({ isOpen, onClose, onLogin }) => {

    // State from Stores
    const actionLogin = useAuthStore((state) => state.actionLogin)

    // Navigate
    const navigate = useNavigate();

    // useState for input
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

            // Validation 
            // Check user fill information or not?
            if (!(input.email.trim() && input.password.trim())) {
                return toast.info("Please fill all informations")
            }

            // Send information input
            const result = await actionLogin(input)

            // console.log("Login Successful!")
            toast.success("Login Successful!")
            onClose();
            navigate(`/`);

        } catch (err) {
            const errMsg = err.response?.data?.error || err.message
            // console.log("Login not success", errMsg)
            toast.error("Login not success", errMsg)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Sign In</DialogTitle>
                    <DialogDescription>
                        Welcome! Sign in to your account. We are so happy to have you here.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={hdlLogin}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full bg-slate-50 border-none p-2"
                        name="email"
                        value={input.email}
                        onChange={hdlChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full bg-slate-50 border-none p-2"
                        name="password"
                        value={input.password}
                        onChange={hdlChange}
                    />
                    <button
                        type="submit"
                        className="btn bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full border-none mt-4 w-full p-2 text-lg"
                    >
                        Sign In
                    </button>
                </form>

                {/* Google Login */}
                <div>
                    <hr />
                    <div></div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {/* Forgot password */}
                    <div className="flex gap-1">
                        <p onClick={() => { }} className="text-slate-400 cursor-pointer">
                            Forgot Password?
                        </p>
                    </div>

                    {/* Go to login */}
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
