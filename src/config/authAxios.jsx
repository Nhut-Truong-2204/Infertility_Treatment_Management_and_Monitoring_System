import axios from "axios";
import Cookies from "js-cookie";

// Tạo instance riêng cho authentication để tránh interceptor loops
const authAxios = axios.create({
  baseURL: "https://infertility-treatment-management-and.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - chỉ thêm token nếu có
authAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - không tự động retry, chỉ log lỗi
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log lỗi nhưng không tự động retry
    if (error.response) {
      console.log(
        `Auth API Error: ${error.response.status} - ${error.config.url}`
      );
    }
    return Promise.reject(error);
  }
);

export default authAxios;
