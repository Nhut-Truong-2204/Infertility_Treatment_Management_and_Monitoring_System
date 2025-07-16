import { useState } from "react";
import { requestPasswordReset } from "../api/forgotPassword";

export default function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendResetEmail = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await requestPasswordReset(email);
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

  return { loading, error, success, sendResetEmail };
}
