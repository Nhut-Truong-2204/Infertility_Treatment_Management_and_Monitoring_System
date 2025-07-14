import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import authAxios from "../config/authAxios"; // Cho auth-related APIs
import Cookies from "js-cookie";
import IdleWarningModal from "../components/IdleWarningModal";

const AuthContext = createContext();

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Bắt đầu với trạng thái đang tải
  const [showWarning, setShowWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(180); // 3 phút = 180 giây

  const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 phút không hoạt động
  const WARNING_TIME = 3 * 60 * 1000; // Cảnh báo 3 phút trước khi logout
  const REFRESH_INTERVAL = 10 * 60 * 1000; // Làm mới token mỗi 10 phút

  const idleTimer = useRef(null);
  const warningTimer = useRef(null);
  const countdownTimer = useRef(null);
  const refreshInterval = useRef(null);
  const handleUserActivityRef = useRef(null);

  // --- Các Hàm Chính ---

  const clearWarningTimers = useCallback(() => {
    clearTimeout(warningTimer.current);
    clearInterval(countdownTimer.current);
    setShowWarning(false);
    setWarningCountdown(180);
  }, []);

  const cleanupEventListeners = useCallback(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => {
      if (handleUserActivityRef.current) {
        window.removeEventListener(event, handleUserActivityRef.current);
      }
    });
    clearTimeout(idleTimer.current);
    clearTimeout(warningTimer.current);
    clearWarningTimers();
    if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
      refreshInterval.current = null;
    }
  }, [clearWarningTimers]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Gọi API logout để vô hiệu hóa token trên server
      const token = Cookies.get("accessToken");
      if (token) {
        await authAxios.post("/api/auth/logout");
      }
    } catch (error) {
      console.error("Lỗi khi logout trên server:", error);
      // Vẫn tiếp tục logout ở client dù API thất bại
    }

    setUser(null);
    setShowWarning(false);
    Cookies.remove("accessToken");
    Cookies.remove("user");
    cleanupEventListeners();
  }, [cleanupEventListeners]);

  const refreshToken = useCallback(async () => {
    // Chỉ refresh token nếu user đang đăng nhập
    if (!user || !Cookies.get("accessToken")) {
      console.log("⏭️ Bỏ qua refresh token - không có user hoặc token");
      return;
    }

    console.log("🔄 Đang thử làm mới token...");
    try {
      await authAxios.post("/api/auth/refresh-token");
      console.log("✅ Làm mới token thành công.");
    } catch (err) {
      console.error("❌ Không thể làm mới token, đang đăng xuất.", err);
      logout();
    }
  }, [logout, user]);

  const startRefreshInterval = useCallback(() => {
    if (refreshInterval.current) clearInterval(refreshInterval.current);
    refreshInterval.current = setInterval(refreshToken, REFRESH_INTERVAL);
  }, [refreshToken, REFRESH_INTERVAL]);

  const showIdleWarning = useCallback(() => {
    setShowWarning(true);
    setWarningCountdown(180); // Reset countdown về 3 phút

    // Bắt đầu countdown
    countdownTimer.current = setInterval(() => {
      setWarningCountdown((prev) => {
        if (prev <= 1) {
          logout(); // Tự động logout khi hết thời gian
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [logout]);

  const handleUserActivity = useCallback(() => {
    clearTimeout(idleTimer.current);
    clearTimeout(warningTimer.current);
    clearWarningTimers(); // Ẩn warning nếu đang hiển thị

    // Chỉ start refresh interval nếu user đã đăng nhập
    if (!refreshInterval.current && user) {
      console.log("👤 Người dùng hoạt động trở lại, bắt đầu làm mới token.");
      startRefreshInterval();
    }

    // Chỉ set timers nếu user đã đăng nhập
    if (user) {
      // Set timer cho warning (12 phút = 15 phút - 3 phút warning)
      warningTimer.current = setTimeout(() => {
        console.log("⚠️ Hiển thị cảnh báo không hoạt động.");
        showIdleWarning();
      }, IDLE_TIMEOUT - WARNING_TIME);

      // Set timer cho auto logout (15 phút)
      idleTimer.current = setTimeout(() => {
        console.log("🚪 Người dùng không hoạt động. Tự động đăng xuất.");
        logout();
      }, IDLE_TIMEOUT);
    }
  }, [
    IDLE_TIMEOUT,
    WARNING_TIME,
    startRefreshInterval,
    showIdleWarning,
    logout,
    clearWarningTimers,
    user,
  ]);

  // Cập nhật ref khi function thay đổi
  useEffect(() => {
    handleUserActivityRef.current = handleUserActivity;
  }, [handleUserActivity]);

  const continueSession = useCallback(() => {
    clearWarningTimers();
    if (handleUserActivityRef.current) {
      handleUserActivityRef.current(); // Reset idle timer
    }
  }, [clearWarningTimers]);

  const startIdleMonitoring = useCallback(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => {
      if (handleUserActivityRef.current) {
        window.addEventListener(event, handleUserActivityRef.current);
      }
    });
    if (handleUserActivityRef.current) {
      handleUserActivityRef.current(); // Kích hoạt ngay lần đầu
    }
  }, []);

  const login = async (credentials) => {
    const response = await authAxios.post("/api/auth/login", credentials);
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
    startIdleMonitoring();
    return response.data;
  };

  // --- Hook Khởi Tạo Chính ---
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🚀 Khởi tạo authentication...");
      const token = Cookies.get("accessToken");

      if (token) {
        console.log("🔍 Có token, đang xác thực với server...");
        try {
          // Nếu có token, luôn xác thực lại với server
          const res = await authAxios.get("/api/auth/information");
          const userData = res.data.data;
          console.log("✅ Xác thực thành công:", userData.email);
          setUser(userData);
          // Cập nhật lại cookie user phòng trường hợp thông tin đã thay đổi
          Cookies.set("user", JSON.stringify(userData), {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          });
          startIdleMonitoring();
        } catch (error) {
          console.error(
            "❌ Token không hợp lệ, xóa token:",
            error.response?.status
          );
          // Xóa token không hợp lệ một cách im lặng
          setUser(null);
          Cookies.remove("accessToken");
          Cookies.remove("user");
        }
      } else {
        console.log("🔓 Không có token, cho phép truy cập guest");
        // Không có token là bình thường, user có thể browse như guest
        setUser(null);
      }

      // Chỉ kết thúc trạng thái tải sau khi đã kiểm tra xong
      console.log("✅ Kết thúc khởi tạo authentication");
      setLoading(false);
    };

    initializeAuth().catch((error) => {
      // Catch any unexpected errors and still allow the app to load
      console.error("🚨 Lỗi không mong muốn trong quá trình khởi tạo:", error);
      setUser(null);
      setLoading(false);
    });

    // Cleanup
    return () => {
      cleanupEventListeners();
    };
  }, [startIdleMonitoring, cleanupEventListeners]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      <IdleWarningModal
        isOpen={showWarning}
        onContinue={continueSession}
        onLogout={logout}
        countdown={warningCountdown}
      />
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Đang khởi tạo...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
