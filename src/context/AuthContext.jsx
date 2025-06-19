import { createContext, useContext, useState, useEffect } from "react";
import axios from "../config/axios"; // Giả sử bạn có file axios config
import instance from "../config/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái tải

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    // Chỉ parse nếu storedUser là chuỗi hợp lệ
    const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

    if (parsedUser && token) {
      setUser(parsedUser);
    } else if (token) {
      fetchUser();
    } else {
      setLoading(false); // Chỉ set loading = false nếu không có token
    }
  }, []);

  // Hàm đăng nhập
  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials); // Gọi API login
      const { accessToken, user: userData } = response.data.data;
        console.log("userData after destructuring:", userData); // THÊM DÒNG NÀY ĐỂ DEBUG
      console.log("Login response:", response.data); // Debug dữ liệu trả về

      // Lưu token và user vào localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData); // Cập nhật trạng thái user
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  // Hàm lấy thông tin người dùng
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      const userData = response.data;
      console.log("Fetch user response:", response.data); // Debug dữ liệu trả về
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user:", error);
      logout(); // Đăng xuất nếu không lấy được thông tin người dùng
    } finally {
      setLoading(false); // Đảm bảo set loading = false sau khi fetch hoàn tất
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;