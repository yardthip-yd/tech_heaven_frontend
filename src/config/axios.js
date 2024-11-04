import useAuthStore from "@/stores/authStore";
import { getAccessToken, removeAccessToken } from "@/utils/local-storage";
import axios from "axios";

// import { getAccessToken, removeAccessToken } from '../utils/local-storage';
axios.defaults.baseURL = import.meta.env.VITE_API;

axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore.getState();
    // console.log("config", config);
    const accessToken = authStore.token;
    // console.log(accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (value) => Promise.resolve(value),
  (err) => {
    if (err.response && err.response.status === 401) {
      console.log(err);
      const authStore = useAuthStore.getState();
      const removeToken = authStore.removeToken();
      removeToken();
      return;
    }
    return Promise.reject(err);
  }
);

export default axios;
