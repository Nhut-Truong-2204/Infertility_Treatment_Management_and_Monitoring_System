import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  closeRegisterModal,
  openOTPModal,
  openLoginModal,
} from "../redux/slices/uiSlice";
import {
  register,
  setVerificationEmail,
  clearRegisterState,
} from "../redux/slices/registerSlice";

const RegisterModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isRegisterModalOpen);
  const { loading, error, success, otpSent } = useSelector(
    (state) => state.register
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset form khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
      setValidationErrors({});
      setIsProcessing(false);
      dispatch(clearRegisterState());
    }
  }, [isOpen, dispatch]);

  // Handle ESC key và prevent scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && !loading && !isProcessing) {
        dispatch(closeRegisterModal());
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
  }, [isOpen, loading, isProcessing, dispatch]);

  useEffect(() => {
    if (success && otpSent) {
      setIsProcessing(true);

      // Set email vào Redux state
      dispatch(setVerificationEmail(formData.email));

      // Backup email vào localStorage để đảm bảo không mất
      localStorage.setItem("pendingVerificationEmail", formData.email);

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: `Mã OTP đã được gửi đến ${formData.email}. Vui lòng kiểm tra email để xác thực tài khoản.`,
          confirmButtonText: "Nhập mã OTP",
          confirmButtonColor: "#10b981",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          setIsProcessing(false);
          dispatch(closeRegisterModal());
          dispatch(openOTPModal());
        });
      }, 100);
    }
  }, [success, otpSent, formData.email, dispatch]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !loading && !isProcessing) {
      dispatch(closeRegisterModal());
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      errors.fullName = "Họ và tên không được để trống";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email không được để trống";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ (10-11 chữ số)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(register(formData)).unwrap();
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const switchToLogin = () => {
    if (!loading && !isProcessing) {
      dispatch(closeRegisterModal());
      dispatch(openLoginModal());
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative max-h-[95vh] scrollable-hidden modal-container">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() =>
              !loading && !isProcessing && dispatch(closeRegisterModal())
            }
            className={`text-2xl w-8 h-8 flex items-center justify-center rounded-full ${
              loading || isProcessing
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-400 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
            }`}
            disabled={loading || isProcessing}
          >
            &times;
          </button>
        </div>

        <h2 className="text-3xl font-bold text-primary mb-2 text-center">
          Đăng Ký
        </h2>
        <p className="text-center text-text-color mb-6">Tạo tài khoản mới</p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Họ và tên
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                validationErrors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập họ và tên"
              required
            />
            {validationErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                validationErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="nhapemail@example.com"
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                validationErrors.phoneNumber
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="0123456789"
              required
            />
            {validationErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                validationErrors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              required
            />
            {validationErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                validationErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••••"
              required
            />
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <button
              onClick={switchToLogin}
              disabled={loading || isProcessing}
              className={`font-medium ${
                loading || isProcessing
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-accent hover:underline"
              }`}
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
