import authApi from "@/API/auth-api";
import useAuthStore from "@/stores/authStore";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectRoute({ element, allow }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const token = useAuthStore((state) => state.token);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  const checkRole = async () => {
    try {
      const resp = await getCurrentUser();
      // console.log("resp", resp);
      console.log(resp.role);
      if (allow.includes("ALL")) {
        console.log(allow);
        setIsAllowed(true);
      } else if (allow.includes(resp.role)) {
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
  }, [token]);

  if (isAllowed == null) return <div>Loading...</div>;
  if (!isAllowed) return <Navigate to="/" />;

  return element;
}

export default ProtectRoute;
