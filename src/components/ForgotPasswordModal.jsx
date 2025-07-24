import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MedicalCard from "./ui/MedicalCard";
import MedicalAlert from "./ui/MedicalAlert";
import { requestPasswordReset } from "../api/forgotPassword";
import { openResetPasswordModal, closeForgotPasswordModal } from "../redux/slices/uiSlice";
import { setResetPasswordData } from "../redux/slices/authSlice";
// import action để đóng modal nếu có: closeForgotPasswordModal

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  // const isOpen = useSelector((state) => state.ui.isForgotPasswordModalOpen); // tuỳ redux
  const isOpen = true; // demo, sửa lại theo state thực tế
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeForgotPasswordModal());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      setSuccess(res.message || "Vui lòng kiểm tra email để nhận hướng dẫn đặt lại mật khẩu.");
    
      dispatch(setResetPasswordData({ email, token: res.token || "" }));
      dispatch(closeForgotPasswordModal());
      dispatch(openResetPasswordModal());
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
          onClick={() => dispatch(closeForgotPasswordModal())}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <MedicalCard.Content>
          <h2 className="text-2xl font-bold text-primary mb-2 text-center">Quên mật khẩu</h2>
          <p className="text-center text-text-color mb-6">Nhập email để nhận hướng dẫn đặt lại mật khẩu.</p>
          {error && (
            <MedicalAlert type="error" title="Lỗi" message={error} dismissible className="mb-4" />
          )}
          {success && (
            <MedicalAlert type="success" title="Thành công" message={success} dismissible className="mb-4" />
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="nhapemail@example.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
          </form>
        </MedicalCard.Content>
      </MedicalCard>
    </div>
  );
};

export default ForgotPasswordModal;
