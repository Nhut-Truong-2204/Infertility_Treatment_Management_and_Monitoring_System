import axios from 'axios';
import Cookies from 'js-cookie'; // Thêm dòng này

const instance = axios.create({
  baseURL: 'https://infertility-treatment-management-and.onrender.com',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy token từ cookie thay vì localStorage
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken'); // ⬅ Lấy token từ cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.warn('Hết hạn đăng nhập hoặc không có quyền!');
    }
    return Promise.reject(error);
  }
);

export default instance;
