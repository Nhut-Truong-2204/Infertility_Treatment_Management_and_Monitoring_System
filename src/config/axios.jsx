import axios from 'axios';

// Tạo một instance Axios với các cấu hình mặc định
const instance = axios.create({
  baseURL: 'https://infertility-treatment-management-and.onrender.com',
  timeout: 30000, // thời gian chờ tối đa
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Luôn gửi cookie nếu có
});

// Interceptor cho response: xử lý lỗi toàn cục
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 (chưa xác thực)
    if (error.response && error.response.status === 401) {
      console.warn('Hết hạn đăng nhập hoặc không có quyền!');
      // Có thể redirect về login, xóa token, v.v.
    }
    return Promise.reject(error);
  }
);

export default instance; 