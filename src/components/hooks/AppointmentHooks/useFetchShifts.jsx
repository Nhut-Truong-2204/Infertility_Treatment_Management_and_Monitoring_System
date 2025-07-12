import { useState, useEffect } from "react";
import instance from "../../../config/axios"; // lưu ý: bạn nên dùng `instance` thay vì `axios`

export const useFetchShifts = (selectedDate) => {
  const [shifts, setShifts] = useState([]);
  const [loadingShifts, setLoadingShifts] = useState(false);

  useEffect(() => {
    const fetchShifts = async (date) => {
      try {
        const res = await instance.get("/api/work-schedules/working-shifts", {
          params: { date },
        });

        const data = res?.data?.data;

        if (Array.isArray(data)) {
          setShifts(data);
        } else {
          setShifts([]);
        }
      } catch (error) {
        console.error("Lỗi lấy ca làm việc:", error);
        setShifts([]);
      } finally {
        setLoadingShifts(false);
      }
    };

    if (selectedDate) {
      setLoadingShifts(true);
      fetchShifts(selectedDate);
    }
  }, [selectedDate]);

  return { shifts, loadingShifts };
};
