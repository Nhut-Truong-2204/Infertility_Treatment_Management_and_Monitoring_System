import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">
            Đang kiểm tra quyền truy cập...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Chuyển hướng về trang chủ với thông báo cần đăng nhập
    return (
      <Navigate
        to="/"
        state={{
          from: location,
          message: "Vui lòng đăng nhập để truy cập tính năng này",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
