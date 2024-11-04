import useAuthStore from "@/stores/authStore";
import axios from "../config/axios";



const authApi = {};
authApi.loginGoogle = async (profile) => await axios.post("/auth/register-google", profile)
authApi.register = async (body) => await axios.post("/auth/register", body);

authApi.login = async (body) => await axios.post("/auth/login", body);
authApi.getMe = async () => await axios.get("/auth/getme");

authApi.forgotPassword = async (body) => await axios.post("/auth/forgotPassword", body);
authApi.resetPassword = async(body) => await axios.put("/auth/resetPassword/",body)
authApi.updateUser = async (input) => {
    const token = useAuthStore.getState().token;
    if (!token) return;
    
    return await axios.patch("/auth/updateme", input, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};



export default authApi;
