import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "../config/axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👉 Thời gian người dùng không thao tác (ms)
  const IDLE_TIMEOUT =  15 * 60 * 1000; //10 phút gọi refreshToken nếu có thao tác
  const REFRESH_INTERVAL = 10 * 60 * 1000; // 5 phút không thao tác thì không gọi refresh nữa

  const idleTimer = useRef(null);
  const refreshInterval = useRef(null);
  const isUserActive = useRef(false); // Trạng thái tương tác gần nhất

  // ======================
  // ====== AUTH ==========

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const storedUser = Cookies.get("user");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await axios.post("/api/auth/login", credentials);
    const { accessToken, user: userData } = response.data.data;

    Cookies.set("accessToken", accessToken, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    Cookies.set("user", JSON.stringify(userData), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });

    setUser(userData);
    startIdleMonitoring(); // ⬅ bắt đầu theo dõi tương tác
    return response.data;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("user");
    stopIdleMonitoring(); // ⬅ dừng khi logout
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      const userData = res.data;
      setUser(userData);
      Cookies.set("user", JSON.stringify(userData), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      startIdleMonitoring(); // ⬅ khi fetchUser thành công thì bắt đầu
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("/api/auth/refresh-token");
      const newToken = res.data.accessToken;
      Cookies.set("accessToken", newToken, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      return newToken;
    } catch (err) {
      logout();
      throw err;
    }
  };

  // ============================
  // ======= IDLE & REFRESH =====

  const handleUserActivity = () => {
    isUserActive.current = true;
    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => {
      isUserActive.current = false;
      stopRefreshInterval(); // ngừng gọi refresh nếu không thao tác
    }, IDLE_TIMEOUT);

    // Nếu đang thao tác thì đảm bảo interval đang chạy
    if (!refreshInterval.current) {
      startRefreshInterval();
    }
  };

  const startIdleMonitoring = () => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) =>
      window.addEventListener(event, handleUserActivity)
    );
    resetIdleTimer(); // gọi ngay từ đầu
  };

  const stopIdleMonitoring = () => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) =>
      window.removeEventListener(event, handleUserActivity)
    );
    clearTimeout(idleTimer.current);
    stopRefreshInterval();
  };

  const startRefreshInterval = () => {
    refreshInterval.current = setInterval(() => {
      if (isUserActive.current) {
        refreshToken(); // ⬅ gọi refresh nếu đang thao tác
      }
    }, REFRESH_INTERVAL);
  };

  const stopRefreshInterval = () => {
    if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
      refreshInterval.current = null;
    }
  };

  // ============================

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook tiện dụng
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthContext;
