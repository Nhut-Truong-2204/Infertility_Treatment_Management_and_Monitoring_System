import { useState } from "react";
import { validateResetToken } from "../api/forgotPassword";

export default function useValidateResetToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);

  const validateToken = async (token, email) => {
    setLoading(true);
    setError(null);
    setValid(false);
    try {
      const res = await validateResetToken(token, email);
      if (res.success && res.data === true) {
        setValid(true);
      } else {
        setError(res.message || "Token không hợp lệ hoặc đã hết hạn");
      }
    } catch (err) {
      setError(err.message || "Token không hợp lệ hoặc đã hết hạn");
    }
    setLoading(false);
  };

  return { loading, error, valid, validateToken };
}
