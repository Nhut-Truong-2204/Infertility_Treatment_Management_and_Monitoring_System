import { useState, useEffect, useCallback } from "react";
import { getWorkScheduleByDate } from "../api/workScheduleAPI";

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = [
    { code: "SUNDAY", displayName: "Chủ Nhật" },
    { code: "MONDAY", displayName: "Thứ Hai" },
    { code: "TUESDAY", displayName: "Thứ Ba" },
    { code: "WEDNESDAY", displayName: "Thứ Tư" },
    { code: "THURSDAY", displayName: "Thứ Năm" },
    { code: "FRIDAY", displayName: "Thứ Sáu" },
    { code: "SATURDAY", displayName: "Thứ Bảy" },
  ];
  const dayInfo = days[date.getDay()];
  return { code: dayInfo.code, displayName: dayInfo.displayName };
};

const useDoctors = (date, shift) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async () => {
    if (!date || !shift) {
      setDoctors([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const payload = {
        date,
        shift,
        dayOfWeek: getDayOfWeek(date),
      };
      const response = await getWorkScheduleByDate(payload);
      setDoctors(response.doctors || []);
    } catch (err) {
      setError(err);
      console.error("Lỗi khi tải danh sách bác sĩ:", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [date, shift]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return { doctors, loading, error, refetch: fetchDoctors };
};

export default useDoctors;
