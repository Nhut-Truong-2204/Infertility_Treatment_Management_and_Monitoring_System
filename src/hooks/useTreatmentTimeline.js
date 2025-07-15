import { useState, useEffect } from "react";
import { getTreatmentTimeline } from "../api/treatmentAPI";

export const useTreatmentTimeline = () => {
  const [treatmentProtocols, setTreatmentProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTreatmentTimeline = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getTreatmentTimeline();

      if (result.success) {
        setTreatmentProtocols(result.data || []);
      } else {
        setError(result.message || "Không thể tải dữ liệu điều trị");
      }
    } catch (err) {
      setError("Lỗi kết nối đến máy chủ");
      console.error("Error fetching treatment timeline:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatmentTimeline();
  }, []);

  return {
    treatmentProtocols,
    loading,
    error,
    refetch: fetchTreatmentTimeline,
  };
};
