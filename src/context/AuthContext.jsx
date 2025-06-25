import { createContext, useContext, useState, useEffect } from "react";
import axios from "../config/axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Đọc user và token từ cookie
  useEffect(() => {
    const token = Cookies.get("accessToken");
    const storedUser = Cookies.get("user");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (token) {
      fetchUser(); // Lấy user nếu chỉ có token
    } else {
      setLoading(false);
    }
  }, []);

  // Đăng nhập
  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { accessToken, user: userData } = response.data.data;

      Cookies.set("accessToken", accessToken, {
        expires: 1, // 1 ngày
        secure: true, // ✅ chỉ dùng HTTPS
        sameSite: "Strict", // ✅ bảo vệ CSRF
      });

      Cookies.set("user", JSON.stringify(userData), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      setUser(userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("user");
  };

  // Gọi API lấy user nếu token hợp lệ
  const fetchUser = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) throw new Error("Token không tồn tại");

      const response = await axios.get("/api/auth/me");

      const userData = response.data;
      setUser(userData);

      Cookies.set("user", JSON.stringify(userData), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthContext;
