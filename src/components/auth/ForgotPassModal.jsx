import React, { useState } from 'react';
import useAuthStore from "@/stores/authStore";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ForgotPassModal = ({ isOpen, onClose, onResetSuccess }) => {
  // State for the email input
  const [email, setEmail] = useState("");

  // State from Stores
  const actionSendResetPassLink = useAuthStore(state => state.actionSendResetPassLink);

  // Fn for handle sending reset link
  const hdlSendResetLink = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return toast.info("Please enter your email");
    }

    try {
      await actionSendResetPassLink(email);
      toast.success("Reset link sent to your email!");
      onResetSuccess(); // Optionally call success callback
      onClose(); // Close the modal
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email to receive a reset password link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={hdlSendResetLink} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-slate-50 border-none my-6 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full border-none w-full p-2"
          >
            Get Reset Password Link
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn text-slate-900 border-none rounded-full w-full mt-2"
          >
            Cancel
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassModal;
