import axios from "../config/axios";

const authApi = {};

authApi.register = async (body) => await axios.post("/auth/register", body);

authApi.login = async (body) => await axios.post("/auth/login", body);
authApi.getMe = async () => await axios.get("/auth/getme");

export default authApi;
