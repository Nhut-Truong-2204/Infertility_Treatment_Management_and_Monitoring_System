// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import instance, { deleteCookie } from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khi app khởi động, gọi API để lấy thông tin user
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Login: không lưu token, rely on cookie
  const login = async (credentials) => {
    try {
      deleteCookie("accessToken"); // Xóa cookie cũ nếu có
      const res = await instance.post("/api/auth/login", credentials);
      const { user: userData } = res.data.data;
      setUser(userData);
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // ✅ Logout: gọi API và xoá cookie
  const logout = async () => {
    try {
      await instance.post("/api/auth/logout"); // rely on cookie
    } catch (err) {
      console.error("Lỗi khi logout:", err);
    } finally {
      setUser(null);
      deleteCookie("accessToken");
    }
  };

  // ✅ Lấy thông tin user từ server
  const fetchUser = async () => {
    try {
      const res = await instance.get("/api/auth/me");
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthContext;
