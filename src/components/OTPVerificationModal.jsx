import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { closeOTPModal, openLoginModal } from "../redux/slices/uiSlice";
import {
  verifyRegistrationOTP,
  resendRegistrationOTP,
  clearAllRegisterState,
  setVerificationEmail,
} from "../redux/slices/registerSlice";

const OTPVerificationModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isOTPModalOpen);
  const { loading, error, registrationSuccess, verificationEmail } =
    useSelector((state) => state.register);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Get email từ Redux hoặc localStorage làm fallback
  const currentEmail =
    verificationEmail || localStorage.getItem("pendingVerificationEmail");

  // Debug log để kiểm tra
  useEffect(() => {
    if (isOpen) {
      console.log("OTP Modal opened - verificationEmail:", verificationEmail);
      console.log(
        "localStorage email:",
        localStorage.getItem("pendingVerificationEmail")
      );
      console.log("currentEmail:", currentEmail);
    }
  }, [isOpen, verificationEmail, currentEmail]);

  // Reset OTP khi modal đóng
  useEffect(() => {
    if (!isOpen) {
      setOtp(["", "", "", "", "", ""]);
    } else {
      // Khi modal mở, đảm bảo email được set vào Redux nếu chưa có
      if (!verificationEmail && currentEmail) {
        dispatch(setVerificationEmail(currentEmail));
      }
    }
  }, [isOpen, verificationEmail, currentEmail, dispatch]);

  // Handle ESC key và prevent scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        dispatch(closeOTPModal());
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
  }, [isOpen, dispatch]);

  // Chuyển đến login modal khi xác thực thành công
  useEffect(() => {
    if (registrationSuccess) {
      // Clear localStorage khi thành công
      localStorage.removeItem("pendingVerificationEmail");

      dispatch(closeOTPModal());
      dispatch(clearAllRegisterState());

      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công!",
        text: "Tài khoản của bạn đã được xác thực. Vui lòng đăng nhập để tiếp tục.",
        confirmButtonText: "Đăng nhập ngay",
        confirmButtonColor: "#10b981",
      }).then(() => {
        dispatch(openLoginModal());
      });
    }
  }, [registrationSuccess, dispatch]);

  // Focus vào input đầu tiên khi modal mở
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeOTPModal());
    }
  };

  const handleOTPChange = (index, value) => {
    // Chỉ cho phép số
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động chuyển đến ô tiếp theo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // Xử lý phím Backspace
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Xử lý phím mũi tên
    else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const otpArray = pastedData.slice(0, 6).split("");

    // Kiểm tra nếu tất cả là số
    if (otpArray.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      otpArray.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);

      // Focus vào ô cuối cùng có giá trị hoặc ô tiếp theo
      const nextIndex = Math.min(otpArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      return;
    }

    try {
      await dispatch(
        verifyRegistrationOTP({
          email: currentEmail,
          otp: otpString,
        })
      ).unwrap();
      // Success handling is done in useEffect
    } catch (err) {
      console.error("OTP verification error:", err);
    }
  };

  const handleResendOTP = async () => {
    try {
      await dispatch(resendRegistrationOTP(currentEmail)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Đã gửi lại OTP!",
        text: "Vui lòng kiểm tra email của bạn.",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Resend OTP error:", err);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Không thể gửi lại OTP. Vui lòng thử lại sau.",
      });
    }
  };

  const backToLogin = () => {
    dispatch(closeOTPModal());
    dispatch(openLoginModal());
  };

  const isOTPComplete = otp.every((digit) => digit !== "");

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative max-h-[95vh] scrollable-hidden modal-container">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => dispatch(closeOTPModal())}
            className="text-2xl w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <h2 className="text-3xl font-bold text-primary mb-2 text-center">
          Xác Thực OTP
        </h2>
        <p className="text-center text-text-color mb-2">
          Nhập mã xác thực đã được gửi đến
        </p>
        <p className="text-center text-accent font-medium mb-6">
          {currentEmail || "Email không xác định"}
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                inputMode="numeric"
                pattern="\d*"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300 disabled:opacity-50"
            disabled={loading || !isOTPComplete}
          >
            {loading ? "Đang xác thực..." : "Xác Thực"}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Không nhận được mã?{" "}
            <button
              onClick={handleResendOTP}
              className="text-accent hover:underline font-medium"
            >
              Gửi lại
            </button>
          </p>
          <p className="text-sm text-gray-600">
            <button
              onClick={backToLogin}
              className="text-accent hover:underline font-medium"
            >
              Quay lại đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
