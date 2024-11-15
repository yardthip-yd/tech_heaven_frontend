import React, { useState } from "react";
import { toast } from "react-toastify";
import Authvdo from "@/assets/video/auth2.mp4";
import useAuthStore from "@/stores/authStore";
import LoginModal from "@/components/auth/LoginModal";
import { Eye, EyeOff, User, Mail, Calendar, Lock, Phone } from "lucide-react";

const Register = () => {
    // State from Stores
    const actionRegister = useAuthStore((state) => state.actionRegister);

    // State for Login Modal
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // useState for input
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    // Fn handleChange update input when user fill information
    const hdlChange = (e) => {
        if (e.target.name === 'phone') {
            if (isNaN(Number(e.target.value))) {
                return
            }
        }
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };


    // Password validation checks
    const passwordChecks = {
        length: input.password.length >= 8,
        uppercase: /[A-Z]/.test(input.password),
        lowercase: /[a-z]/.test(input.password),
        number: /[0-9]/.test(input.password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(input.password),
    };

    const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 2) return "Weak";
        if (passwordStrength <= 4) return "Medium";
        return "Strong";
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return "bg-red-500";
        if (passwordStrength <= 4) return "bg-yellow-500";
        return "bg-green-500";
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
                    input.confirmPassword &&
                    input.phone
                )
            ) {
                // return alert("Please fill all informations")
                return toast.info("Please fill all informations");
            }
            if (input.dateOfBirth) {
                // console.log("call register")
                const today = new Date();
                const dateOfBirth = new Date(input.dateOfBirth);

                if (dateOfBirth >= today) {
                    // throw new Error("Date of birth must be in the past.")
                    return toast.error("Date of birth must be in the past.");
                }
            }
            // Check password match with confirm password
            if (input.password !== input.confirmPassword) {
                // return alert("Password do not match")
                return toast.info("Password do not match");
            }


            // Send information input


            const result = await actionRegister(input);
            console.log(result)
            // Clear input
            setInput({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                dateOfBirth: "",
                phone: ""
            });

            console.log("Register Successful!");
            toast.success("Register Successful!");
            setIsLoginModalOpen(true)

        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            console.log(errMsg);
            toast.error(errMsg);
        }
    };

    return (
        <div className="h-screen w-full flex items-center min-h-[800px] my-ภ">
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
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="mb-4">
                        {" "}
                        Join us today! It’s free and only take a minute.{" "}
                    </p>
                </div>

                {/* Form Register */}
                <form
                    className="flex flex-col gap-3 relative pb-8"
                    onSubmit={hdlRegister}
                >
                    {/* Firstname and Lastname */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={input.firstName}
                                onChange={hdlChange}
                            />
                        </div>
                        <div className="relative flex-1">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={input.lastName}
                                onChange={hdlChange}
                            />
                        </div>
                    </div>

                    {/* DateOfBirth */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            type="date"
                            placeholder="Birthday"
                            name="dateOfBirth"
                            value={input.dateOfBirth}
                            onChange={hdlChange}
                        />
                    </div>
                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={input.phone}
                            maxLength={10}
                            onChange={hdlChange}

                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={input.email}
                            onChange={hdlChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={hdlChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>


                    {/* Confirm Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={hdlChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {input.password && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-600">Password Strength:</span>
                                <span className={`text-sm font-medium ${passwordStrength <= 2 ? 'text-red-500' :
                                    passwordStrength <= 4 ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                    {getPasswordStrengthText()}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Password Requirements */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-700">Password Requirements:</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.length ? 'bg-green-500' : 'bg-slate-300'}`} />
                                At least 8 characters
                            </li>
                            <li className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.uppercase && passwordChecks.lowercase ? 'bg-green-500' : 'bg-slate-300'
                                    }`} />
                                At least one uppercase and lowercase letter [A-Z, a-z]
                            </li>
                            <li className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.number ? 'bg-green-500' : 'bg-slate-300'}`} />
                                At least one number [0-9]
                            </li>
                            <li className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${passwordChecks.special ? 'bg-green-500' : 'bg-slate-300'}`} />
                                At least one special character {"[!@#$%^&*(),.?\":{}|<>]"}
                            </li>
                        </ul>
                    </div>

                    {/* Button Register */}
                    <button
                        // onClick={() => setIsLoginModalOpen(true)}
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        Create Account
                    </button>
                </form>

                {/* Go to login */}
                <div className="flex gap-1">
                    <p className="text-slate-900">Already Create an Account?</p>
                    <div
                        onClick={() => setIsLoginModalOpen(true)}
                        className="hover:text-blue-600 text-blue-500 font-semibold transition-colors duration-300"
                    >
                        <p>Sign In</p>
                    </div>
                </div>
            </div >

            {/* แสดง LoginModal */}
            < LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={() => setIsLoginModalOpen(false)}
            />
        </div >
    );
};

export default Register;
