import { getAccessToken, removeAccessToken } from "@/utils/local-storage";
import axios from "axios";

// import { getAccessToken, removeAccessToken } from '../utils/local-storage';
axios.defaults.baseURL = import.meta.env.VITE_API;

axios.interceptors.request.use(
  (config) => {
    console.log("config", config);
    const accessToken = getAccessToken();
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
    console.log("err.response.status", err.response.status);
    if (err.response?.status === 401) {
      removeAccessToken();
      window.location.assign("/login");
      return;
    }
    return Promise.reject(err);
  }
);

export default axios;
