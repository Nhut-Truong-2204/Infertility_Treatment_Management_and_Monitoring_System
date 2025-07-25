import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeResetPasswordModal } from "../redux/slices/uiSlice";
import { clearResetPasswordData } from "../redux/slices/authSlice";
import MedicalCard from "./ui/MedicalCard";
import MedicalAlert from "./ui/MedicalAlert";
import { resetPassword } from "../api/forgotPassword";

const ResetPasswordModal = ({ email, token }) => {
  // Lấy email và token từ Redux nếu cần
  const reduxEmail = useSelector((state) => state.auth.resetEmail);
  const reduxToken = useSelector((state) => state.auth.resetToken);
  // Quản lý state cho tất cả trường nhập
  const [inputEmail, setInputEmail] = useState(email || reduxEmail || "");
  const [inputToken, setInputToken] = useState(token || reduxToken || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isResetPasswordModalOpen);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeResetPasswordModal());
      dispatch(clearResetPasswordData());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await resetPassword(inputToken, password, confirmPassword, inputEmail);
      setSuccess(res.message || "Đổi mật khẩu thành công. Bạn có thể đăng nhập lại.");
      // Đóng modal và xóa dữ liệu reset khỏi Redux
      setTimeout(() => {
        dispatch(closeResetPasswordModal());
        dispatch(clearResetPasswordData());
      }, 1500);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <MedicalCard className="w-full max-w-md relative max-h-[95vh] scrollable-hidden modal-container">
        <button
          onClick={() => dispatch(closeResetPasswordModal())}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <MedicalCard.Content>
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">Đặt lại mật khẩu</h2>
          <p className="text-center text-text-color mb-6">Nhập mã xác thực, email và mật khẩu mới.</p>
          {error && (
            <MedicalAlert type="error" title="Lỗi" message={error} dismissible className="mb-4" />
          )}
          {success && (
            <MedicalAlert type="success" title="Thành công" message={success} dismissible className="mb-4" />
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                Mã xác thực
              </label>
              <input
                type="text"
                id="token"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Nhập mã xác thực từ email"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="nhapemail@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        </MedicalCard.Content>
      </MedicalCard>
    </div>
  );
};

export default ResetPasswordModal;
