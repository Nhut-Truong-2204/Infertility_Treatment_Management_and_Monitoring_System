import React, { useState } from "react";
import { MEDICAL_COLORS, MEDICAL_SHADOWS } from "../../styles/medicalTheme";
import { X } from "lucide-react";

const OTPVerificationModal = ({
  isOpen,
  onClose,
  onSendOtp,
  onVerifyOtp,
  contract,
  email,
  loading,
  error,
}) => {
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("send");
  const [localError, setLocalError] = useState("");

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    setLocalError("");
    try {
      await onSendOtp();
      setStep("verify");
    } catch (err) {
      setLocalError(err?.message || "Gửi OTP thất bại");
    }
  };

  const handleVerifyOtp = async () => {
    setLocalError("");
    if (!otp) {
      setLocalError("Vui lòng nhập mã OTP");
      return;
    }
    try {
      await onVerifyOtp(otp);
      setStep("success");
    } catch (err) {
      setLocalError(err?.message || "Xác thực OTP thất bại");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(32,41,110,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6"
        style={{ boxShadow: MEDICAL_SHADOWS.large }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-semibold"
            style={{ color: MEDICAL_COLORS.primary[700] }}
          >
            Xác thực ký hợp đồng
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-gray-700">
            <div>
              Mã hợp đồng:{" "}
              <span className="font-semibold">{contract?.contractNumber}</span>
            </div>
            <div>
              Email nhận OTP: <span className="font-semibold">{email}</span>
            </div>
          </div>
          {step === "send" && (
            <button
              className="w-full px-4 py-2 rounded-lg bg-primary text-white font-semibold"
              style={{ backgroundColor: MEDICAL_COLORS.primary[500] }}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Đang gửi OTP..." : "Gửi mã OTP"}
            </button>
          )}
          {step === "verify" && (
            <>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Nhập mã OTP từ email..."
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                autoFocus
              />
              <button
                className="w-full px-4 py-2 rounded-lg bg-success text-white font-semibold mt-2"
                style={{ backgroundColor: MEDICAL_COLORS.success[500] }}
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Đang xác thực..." : "Xác thực OTP"}
              </button>
            </>
          )}
          {step === "success" && (
            <div className="text-success-700 text-center font-semibold py-4">
              Ký hợp đồng thành công!
            </div>
          )}
          {(localError || error) && (
            <div className="text-red-600 text-sm text-center mt-2">
              {localError || error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
