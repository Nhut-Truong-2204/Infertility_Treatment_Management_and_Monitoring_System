import { useState, useEffect } from "react";
import { getWorkingShifts } from "../api/workScheduleAPI";

const useWorkingShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        setLoading(true);
        const response = await getWorkingShifts();
        setShifts(response);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi tải ca làm việc:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShifts();
  }, []);

  return { shifts, loading, error };
};

export default useWorkingShifts;
