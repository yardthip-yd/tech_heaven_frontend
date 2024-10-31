import axios from "../config/axios";



const authApi = {};
authApi.loginGoogle = async (profile) => await axios.post("/auth/register-google", profile)
authApi.register = async (body) => await axios.post("/auth/register", body);

authApi.login = async (body) => await axios.post("/auth/login", body);
authApi.getMe = async () => await axios.get("/auth/getme");

authApi.forgotPassword = async () => await axios.get("/auth/forgotPassword", body);

export default authApi;
