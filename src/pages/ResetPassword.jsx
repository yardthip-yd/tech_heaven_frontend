import Authvdo from "@/assets/video/auth2.mp4";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock } from "lucide-react";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const { token } = useParams()
    const [confirmPassword, setConfirmPassword] = useState("");
    const actionResetPassword = useAuthStore(state => state.actionResetPassword)
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [input, setInput] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const hdlChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Password validation checks
    const passwordChecks = {
        length: input.newPassword.length >= 8,
        uppercase: /[A-Z]/.test(input.newPassword),
        lowercase: /[a-z]/.test(input.newPassword),
        number: /[0-9]/.test(input.newPassword),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(input.newPassword),
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

    // Fn for reset password
    const hdlResetPassword = async (e) => {
        e.preventDefault();

        if (input.newPassword !== input.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const body = { newPassword: input.newPassword, token }

            const response = await actionResetPassword(body);
            toast.success(response.message);

            console.log("Response from reset password:", response);
            navigate(`/login`)
        } catch (error) {
            toast.error(error.response?.data?.error || "Error resetting password");
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
                >
                </video>
                {/* Black Overlay */}
                <div className="absolute h-screen inset-0 bg-black opacity-40 z-[-1]"></div>
            </div>

            <div className="m-auto bg-white p-6 rounded-lg shadow-md w-[500px]">
                <div className="w-full flex flex-col text-start gap-2 text-slate-900">
                    <h2 className="text-3xl font-bold">Reset Password</h2>
                    <p className="mb-4">
                        Your new password must be different from previous used passwords.
                    </p>
                </div>

                <form onSubmit={hdlResetPassword} className="flex flex-col gap-4 relative">
                    {/* <input type="hidden" name="token" value={token}/> */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                name="newPassword"
                                value={input.newPassword}
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
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
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
                    </div>

                    <div className="space-y-4">
                        {/* Password Strength Indicator */}
                        {input.newPassword && (
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Resetting Password..." : "Reset Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword