import React, { useState, useEffect } from "react";
import { MedicalCard, MedicalAlert, Button } from "./ui";
import useResetPassword from "../hooks/useResetPassword";
import useValidateResetToken from "../hooks/useValidateResetToken";

const ResetPasswordModal = ({ visible, onClose, token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, success, resetPasswordHandler } = useResetPassword();
  const {
    loading: validating,
    error: validateError,
    valid,
    validateToken,
  } = useValidateResetToken();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (visible && token) {
      // Nếu có email trong URL, truyền vào validate
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email") || "";
      setEmail(emailParam);
      validateToken(token, emailParam);
    }
  }, [visible, token]);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp");
      return;
    }
    await resetPasswordHandler(token, password, confirmPassword);
    if (error) {
      message.error(error);
    }
    if (success) {
      message.success("Đặt lại mật khẩu thành công");
      onClose();
    }
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <MedicalCard className="w-full max-w-md relative">
        <MedicalCard.Header>
          <MedicalCard.Title>Đặt lại mật khẩu</MedicalCard.Title>
        </MedicalCard.Header>
        <MedicalCard.Content>
          {validating && (
            <MedicalAlert type="info" message="Đang xác thực liên kết..." />
          )}
          {validateError && (
            <MedicalAlert type="error" message={validateError} />
          )}
          {valid && (
            <>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <MedicalAlert type="error" message={error} />}
              {success && (
                <MedicalAlert
                  type="success"
                  message="Đặt lại mật khẩu thành công"
                />
              )}
              <Button
                variant="medical"
                className="w-full"
                loading={loading}
                onClick={handleSubmit}
              >
                Đặt lại mật khẩu
              </Button>
            </>
          )}
        </MedicalCard.Content>
        <MedicalCard.Footer>
          <Button variant="ghost" onClick={onClose}>
            Đóng
          </Button>
        </MedicalCard.Footer>
      </MedicalCard>
    </div>
  );
};

export default ResetPasswordModal;
