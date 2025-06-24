// src/config/axios.js
import axios from 'axios';
import Swal from 'sweetalert2';

// Hàm để lấy cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Hàm xóa cookie
const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

// Tạo instance Axios với các cấu hình mặc định
const instance = axios.create({
  baseURL: 'https://infertility-treatment-management-and.onrender.com',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// REQUEST INTERCEPTOR: THÊM ACCESS TOKEN VÀO HEADER TẠI ĐÂY
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: xử lý lỗi hết hạn phiên (401 Unauthorized)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie('accessToken');
      Swal.fire({
        icon: "warning",
        title: "Phiên đăng nhập hết hạn",
        text: "Vui lòng đăng nhập lại để tiếp tục.",
        confirmButtonText: "Đăng nhập lại",
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
export { getCookie, deleteCookie }; // Export cả getCookie và deleteCookie