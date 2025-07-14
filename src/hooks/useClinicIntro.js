import { useState, useEffect, useCallback } from "react";
import { getClinicIntroduction } from "../api/clinicIntroAPI";

const useClinicIntro = () => {
  const [clinicIntro, setClinicIntro] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClinicIntro = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClinicIntroduction();
      setClinicIntro(data);
    } catch (err) {
      setError(err);
      console.error("Lỗi khi tải thông tin phòng khám:", err);
      setClinicIntro(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClinicIntro();
  }, [fetchClinicIntro]);

  return {
    clinicIntro,
    loading,
    error,
    refetch: fetchClinicIntro,
  };
};

export default useClinicIntro;
