import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import MedicalAlert from "./ui/MedicalAlert";
import MedicalCard from "./ui/MedicalCard";

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
  const [alert, setAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
      setAlert(null);
      setIsProcessing(false);
      dispatch(clearRegisterState());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && !loading && !isProcessing) {
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
      dispatch(setVerificationEmail(formData.email));
      localStorage.setItem("pendingVerificationEmail", formData.email);

      setAlert({
        type: "success",
        title: "Đăng ký thành công!",
        message: `Mã OTP đã được gửi đến ${formData.email}. Vui lòng kiểm tra email để xác thực tài khoản.`,
      });

      setTimeout(() => {
        setAlert(null);
        dispatch(closeRegisterModal());
        dispatch(openOTPModal());
      }, 3000);
    }
  }, [success, otpSent, formData.email, dispatch]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading && !isProcessing) {
      dispatch(closeRegisterModal());
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!formData.fullName.trim()) {
      errors.fullName = "Họ và tên không được để trống";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Họ và tên phải có ít nhất 2 ký tự";
    }

    if (!formData.email) {
      errors.email = "Email không được để trống";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ (10-11 chữ số)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsProcessing(true);
      await dispatch(register(formData)).unwrap();
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
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
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <MedicalCard className="w-full max-w-md relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={() =>
            !loading && !isProcessing && dispatch(closeRegisterModal())
          }
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
          disabled={loading || isProcessing}
        >
          &times;
        </button>

        <MedicalCard.Content>
          <h2 className="text-2xl font-bold text-center text-primary mb-1">
            Đăng Ký
          </h2>
          <p className="text-center text-gray-600 mb-4">Tạo tài khoản mới</p>

          {alert && (
            <MedicalAlert
              type={alert.type}
              title={alert.title}
              message={alert.message}
              dismissible
              onDismiss={() => setAlert(null)}
              className="mb-4"
            />
          )}

          {error && (
            <MedicalAlert
              type="error"
              title="Lỗi đăng ký"
              message={error}
              dismissible
              onDismiss={() => dispatch(clearRegisterState())}
              className="mb-4"
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Họ và tên",
                id: "fullName",
                type: "text",
                placeholder: "Nhập họ và tên",
              },
              {
                label: "Email",
                id: "email",
                type: "email",
                placeholder: "nhapemail@example.com",
              },
              {
                label: "Số điện thoại",
                id: "phoneNumber",
                type: "tel",
                placeholder: "0123456789",
              },
              {
                label: "Mật khẩu",
                id: "password",
                type: "password",
                placeholder: "••••••••",
              },
              {
                label: "Xác nhận mật khẩu",
                id: "confirmPassword",
                type: "password",
                placeholder: "••••••••",
              },
            ].map(({ label, id, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    validationErrors[id] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={placeholder}
                  required
                />
                {validationErrors[id] && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors[id]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-primary transition duration-300 disabled:opacity-50"
              disabled={loading || isProcessing}
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
        </MedicalCard.Content>
      </MedicalCard>
    </div>
  );
};

export default RegisterModal;
