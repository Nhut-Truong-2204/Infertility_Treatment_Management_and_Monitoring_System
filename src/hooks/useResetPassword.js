import { useState } from "react";
import { resetPassword } from "../api/forgotPassword";

export default function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetPasswordHandler = async (token, password, confirmPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await resetPassword(token, password, confirmPassword);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra");
    }
    setLoading(false);
  };

  return { loading, error, success, resetPasswordHandler };
}
