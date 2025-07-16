import React, { useState } from "react";
import { MedicalCard, MedicalAlert, Button } from "./ui";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPasswordModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const { loading, error, success, sendResetEmail } = useForgotPassword();

  const handleSubmit = async () => {
    if (!email) {
      message.error("Vui lòng nhập email");
      return;
    }
    await sendResetEmail(email);
    if (error) {
      message.error(error);
    }
    if (success) {
      message.success("Vui lòng kiểm tra email để đặt lại mật khẩu");
      onClose();
    }
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <MedicalCard className="w-full max-w-md relative">
        <MedicalCard.Header>
          <MedicalCard.Title>Quên mật khẩu</MedicalCard.Title>
        </MedicalCard.Header>
        <MedicalCard.Content>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && (
            <MedicalAlert type="error" message={error} className="mb-2" />
          )}
          {success && (
            <MedicalAlert
              type="success"
              message="Vui lòng kiểm tra email để đặt lại mật khẩu"
              className="mb-2"
            />
          )}
          <Button
            variant="medical"
            className="w-full"
            loading={loading}
            onClick={handleSubmit}
          >
            Gửi yêu cầu
          </Button>
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

export default ForgotPasswordModal;
