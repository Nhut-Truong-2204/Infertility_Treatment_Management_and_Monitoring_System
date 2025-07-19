import { useState } from "react";
import axios from "../config/axios";

/**
 * Custom hook for submitting feedback
 * @returns {object} { submitFeedback, loading, error, success }
 */
export default function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitFeedback = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post("/api/customer/feedback", data);
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Gửi feedback thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return { submitFeedback, loading, error, success };
}
