import authApi from "@/API/auth-api";
import useAuthStore from "@/stores/authStore";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectRoute({ element, allow }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const checkRole = async () => {
    try {
      const resp = await authApi.getMe();
      console.log("resp", resp);
      if (allow.includes(resp.data.role)) {
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
  if (!isAllowed) return <Navigate to="/login" />;

  return element;
}

export default ProtectRoute;
