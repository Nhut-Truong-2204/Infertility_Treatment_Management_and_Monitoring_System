import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: "https://infertility-treatment-management-and.onrender.com",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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

    // Chỉ thử refresh token nếu:
    // 1. Có lỗi 401/403
    // 2. Chưa retry
    // 3. Có token ban đầu (không phải guest user)
    // 4. Không phải request đến auth endpoints
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      Cookies.get("accessToken") && // Chỉ retry nếu có token
      !originalRequest.url.includes("/api/auth/") // Không retry cho auth endpoints
    ) {
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

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await instance.post("/api/auth/refresh-token");
        const newAccessToken = response.data.data;

        Cookies.set("accessToken", newAccessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });

        instance.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);
        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Chỉ hiển thị popup khi thực sự cần thiết
        const hasToken = Cookies.get("accessToken");
        if (hasToken) {
          Swal.fire({
            icon: "warning",
            title: "Phiên đăng nhập đã hết hạn",
            text: "Vui lòng đăng nhập lại để tiếp tục.",
            confirmButtonText: "Đồng ý",
          }).then(() => {
            Cookies.remove("accessToken");
            Cookies.remove("user");
            window.location.href = "/";
          });
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
