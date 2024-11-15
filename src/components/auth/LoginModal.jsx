import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "@/stores/authStore";
import GoogleLogo from "@/assets/image/logo-google.png";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false);

  const hdlLoginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await actionLoginGoogle(codeResponse);
        // setUser(res);
        // console.log("asdadads")
        console.log("check res function --> ", res);
        onLogin();
        onClose()
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
    password: "",
  });

  // Fn handleChange update input when user fill information
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  // Fn handleLogin for register success
  const hdlLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      onLogin();
      // Validation
      // Check user fill information or not?
      if (!(input.email.trim() && input.password.trim())) {
        setLoading(false);
        return toast.info("Please fill all informations");
      }

      try {
        // Send information input
        const result = await actionLogin(input);
        // console.log("Login Successful!")
        toast.success("Login Successful!");
        if (onLogin) {
          onLogin();
        }
        onClose();
      } catch (err) {
        const errorMsg = err.response?.data?.error || "Login failed. Please check your credentials.";
        toast.error(errorMsg);
        console.error("Login error:", errorMsg);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      // console.log("Login not success", errMsg)
      toast.error("Login not success", errMsg);
    }
  };

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
            <DialogTitle className="text-2xl">Welcome Back!</DialogTitle>
            <DialogDescription>
              Sign in to your account. We are so happy to have you here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={hdlLogin} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  name="email"
                  value={input.email}
                  onChange={hdlChange}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                  name="password"
                  value={input.password}
                  onChange={hdlChange}
                  required
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

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={() => hdlLoginGoogle()}
              type="button"
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <img src={GoogleLogo} alt="Google" className="w-6 h-6" />
              Sign In with Google
            </button>
          </form>


          <div className="text-center pt-2">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                onClick={onClose}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
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
