import useAuthStore from "@/stores/authStore";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectRoute() {
  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const checkRole = async () => {};

  return <div>ProtectRoute</div>;
}

export default ProtectRoute;
