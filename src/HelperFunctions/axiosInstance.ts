// services/axiosInstance.ts This is for making api requests with adding jwt token insider request header
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "@/HelperData/datavariables";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const data = Cookies.get("authenticatedUser");
    const { jwtToken } = JSON.parse(data ?? "{}");
    if (jwtToken) {
      const cleanToken = jwtToken.startsWith("Bearer ")
        ? jwtToken.split(" ")[1]
        : jwtToken;
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
