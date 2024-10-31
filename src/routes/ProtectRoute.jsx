import authApi from "@/API/auth-api";
import useAuthStore from "@/stores/authStore";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectRoute({ element, allow }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const checkRole = async () => {
    try {
      const resp = await authApi.getMe();
      console.log("resp", resp);
      console.log(resp.data.user.role);
      if (allow.includes(resp.data.user.role)) {
        console.log("allow", allow);
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  if (isAllowed == null) return <div>Loading...</div>;
  if (!isAllowed) return <Navigate to="/" />;

  return element;
}

export default ProtectRoute;
