import axios from 'axios';

// Tạo một instance Axios với các cấu hình mặc định
const instance = axios.create({
  baseURL: 'https://infertility-treatment-management-and.onrender.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Cho phép gửi kèm cookie trong các request
});

// Interceptor cho request: thêm access token vào header nếu có trong cookie
instance.interceptors.request.use(
  (config) => {
    // Lấy accessToken từ cookie
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response: xử lý lỗi toàn cục
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Phiên đăng nhập hết hạn",
        text: "Vui lòng đăng nhập lại để tiếp tục.",
        confirmButtonText: "Đăng nhập lại",
        allowOutsideClick: false,
      }).then(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
