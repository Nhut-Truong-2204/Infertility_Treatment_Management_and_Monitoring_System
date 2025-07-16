import React, { useState, useEffect, useCallback } from "react";
import { X, Lock, Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import { useChangePassword } from "../hooks/useChangePassword";
import MedicalCard from "./ui/MedicalCard";
import MedicalAlert from "./ui/MedicalAlert";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { isLoading, errors, handleChangePassword, clearFieldError } =
    useChangePassword();

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setShowPasswords({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
    }
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleChangePassword(formData, () => {
      onClose();
    });

    // If successful, form will be closed via onClose callback
    return success;
  };

  // Handle modal close
  const handleClose = useCallback(() => {
    if (isLoading) return;
    onClose();
  }, [isLoading, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !isLoading) {
      handleClose();
    }
  };

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && !isLoading) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isLoading, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <MedicalCard className="w-full max-w-md relative max-h-[95vh] scrollable-hidden modal-container">
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <MedicalCard.Content>
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">Đổi mật khẩu</h2>
                <p className="text-gray-600">Cập nhật mật khẩu bảo mật</p>
              </div>
            </div>
          </div>

          {/* Alert nếu có lỗi */}
          {(errors.global || errors.submit) && (
            <MedicalAlert
              type="error"
              title="Lỗi đổi mật khẩu"
              message={errors.global || errors.submit}
              dismissible
              onDismiss={() => clearFieldError("global")}
              className="mb-4"
            />
          )}

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Lưu ý bảo mật</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Mật khẩu phải có ít nhất 6 ký tự</li>
                  <li>Nên sử dụng kết hợp chữ, số và ký tự đặc biệt</li>
                  <li>Không chia sẻ mật khẩu với người khác</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu hiện tại *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.currentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.currentPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.currentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.newPassword ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.newPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu mới *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.confirmNewPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="Nhập lại mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>
          </form>
        </MedicalCard.Content>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-primary hover:bg-accent text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Đổi mật khẩu
                </>
              )}
            </button>
          </div>
        </div>
      </MedicalCard>
    </div>
  );
};

export default ChangePasswordModal;
