import useAuthStore from "@/stores/authStore";
import axios from "../config/axios";



const authApi = {};
authApi.loginGoogle = async (profile) => await axios.post("/auth/register-google", profile)
authApi.register = async (body) => await axios.post("/auth/register", body);

authApi.login = async (body) => await axios.post("/auth/login", body);
// authApi.getMe = async () => await axios.get("/auth/getme");

authApi.getMe = async () => {
    const token = useAuthStore.getState().token;
    console.log("Token getme:", token); 
    return await axios.get("/auth/getme", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  };

  authApi.updateUser = async (input) => {
    const token = useAuthStore.getState().token;
    if (!token) return;
    
    return await axios.patch("/auth/updateme", input, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

authApi.forgotPassword = async () => await axios.get("/auth/forgotPassword", body);

export default authApi;
