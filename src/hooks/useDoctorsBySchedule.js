import { useState, useEffect } from "react";
import { getWorkScheduleByDate } from "../api/workScheduleAPI";

const useDoctorsBySchedule = (date, shift) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      // Chỉ fetch khi có đủ thông tin date và shift
      if (!date || !shift) {
        setDoctors([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Tạo payload theo format API
        const payload = {
          date: date,
          shift: {
            startTime: shift.startTime,
            endTime: shift.endTime,
            dayOfWeek: shift.dayOfWeek || {
              code: new Date(date).getDay().toString(),
              displayName: new Date(date).toLocaleDateString("vi-VN", {
                weekday: "long",
              }),
            },
          },
        };

        const response = await getWorkScheduleByDate(payload);
        setDoctors(response);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi tải danh sách bác sĩ:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [date, shift]);

  return { doctors, loading, error };
};

export default useDoctorsBySchedule;
