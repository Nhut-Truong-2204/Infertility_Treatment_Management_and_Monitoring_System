// src/config/axios.js
import axios from 'axios';
import Swal from 'sweetalert2';

// Tạo instance
const instance = axios.create({
  baseURL: 'https://infertility-treatment-management-and.onrender.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // QUAN TRỌNG: để cookie được gửi theo request
});

// Response interceptor: xử lý lỗi hết hạn phiên
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

// Hàm xóa cookie
const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

export default instance;
export { deleteCookie };
