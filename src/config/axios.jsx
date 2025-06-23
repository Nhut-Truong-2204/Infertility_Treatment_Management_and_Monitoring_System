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
    if (error.response && error.response.status === 401) {
      // Nếu token hết hạn hoặc không hợp lệ
      Swal.fire({
        icon: "warning",
        title: "Phiên đăng nhập hết hạn",
        text: "Vui lòng đăng nhập lại để tiếp tục.",
        confirmButtonText: "Đăng nhập lại",
        allowOutsideClick: false,
      }).then(() => {
        // 👉 Sau khi user bấm OK:
        // 1. Xóa localStorage/sessionStorage nếu có:
        localStorage.clear();
        sessionStorage.clear();

        // 2. Optional: gọi hàm logout từ AuthContext nếu bạn có (ví dụ useAuth().logout())
        // 3. Chuyển hướng về trang login
        window.location.href = "/login"; // hoặc navigate("/login") nếu dùng trong component
      });
    }

    return Promise.reject(error);
  }
);

export default instance; 