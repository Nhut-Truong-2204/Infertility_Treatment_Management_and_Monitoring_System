// axios.js
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://infertility-treatment-management-and.onrender.com",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Để gửi cookie refresh token nếu server dùng cookie
});

// Gắn accessToken vào request
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor xử lý refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await instance.post("/api/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        Cookies.set("accessToken", newAccessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });

        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        processQueue(null, newAccessToken);
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        import("sweetalert2").then(({ default: Swal }) => {
          Swal.fire({
            icon: "warning",
            title: "Phiên đăng nhập đã hết hạn",
            text: "Vui lòng đăng nhập lại để tiếp tục.",
            confirmButtonText: "Đăng nhập",
          }).then(() => {
            Cookies.remove("accessToken");
            Cookies.remove("user");
            window.location.href = "/login";
          });
        });

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
