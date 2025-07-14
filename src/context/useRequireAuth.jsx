import { useAuth } from "../hooks/useAuth";
import { useCallback } from "react";

/**
 * Hook để kiểm tra và yêu cầu authentication khi cần thiết
 */
export const useRequireAuth = () => {
  const { user } = useAuth();

  /**
   * Kiểm tra xem user đã đăng nhập chưa
   * @returns {boolean} true nếu đã đăng nhập, false nếu chưa
   */
  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  /**
   * Yêu cầu đăng nhập nếu chưa đăng nhập
   * @param {Function} onSuccess - Callback thực hiện khi đã đăng nhập
   * @param {Function} onCancel - Callback thực hiện khi user hủy đăng nhập
   * @returns {boolean} true nếu đã đăng nhập, false nếu cần đăng nhập
   */
  const requireAuth = useCallback(
    (onSuccess, onCancel) => {
      if (user) {
        if (onSuccess) onSuccess();
        return true;
      } else {
        // Hiển thị modal đăng nhập hoặc chuyển hướng
        const shouldLogin = window.confirm(
          "Bạn cần đăng nhập để sử dụng tính năng này. Đăng nhập ngay?"
        );
        if (shouldLogin) {
          // Mở modal đăng nhập (cần implement)
          console.log("Mở modal đăng nhập");
        } else if (onCancel) {
          onCancel();
        }
        return false;
      }
    },
    [user]
  );

  /**
   * Lấy thông tin user hiện tại
   * @returns {Object|null} Thông tin user hoặc null nếu chưa đăng nhập
   */
  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  /**
   * Kiểm tra role của user
   * @param {string} requiredRole - Role cần thiết
   * @returns {boolean} true nếu user có role phù hợp
   */
  const hasRole = useCallback(
    (requiredRole) => {
      return user && user.role === requiredRole;
    },
    [user]
  );

  return {
    isAuthenticated,
    requireAuth,
    getCurrentUser,
    hasRole,
    user,
  };
};
