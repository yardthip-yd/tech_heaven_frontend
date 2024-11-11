import Authvdo from "@/assets/video/auth.mp4";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const {token} = useParams()
    const [confirmPassword, setConfirmPassword] = useState("");
    const actionResetPassword = useAuthStore(state => state.actionResetPassword)
    const navigate = useNavigate()
    // Fn for reset password
    const hdlResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const body = {newPassword,token}
            
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
                    <h2 className="text-3xl font-bold">Create New Password</h2>
                    <p className="mb-4">
                        Your new password must be different from previous used passwords.
                    </p>
                </div>

                <form onSubmit={hdlResetPassword} className="flex flex-col gap-4 relative">
                    {/* <input type="hidden" name="token" value={token}/> */}
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input input-bordered w-full bg-slate-50 border-none p-3"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full bg-slate-50 border-none p-3"
                    />
                    <button type="submit" className="btn bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full border-none w-full mt-4 p-2">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword