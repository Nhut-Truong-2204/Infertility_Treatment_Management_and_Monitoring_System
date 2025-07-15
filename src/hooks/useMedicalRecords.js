import { useState, useCallback } from "react";
import { getMedicalRecords } from "../api/medicalRecordsAPI";

export const useMedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy danh sách hồ sơ y tế
  const fetchMedicalRecords = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getMedicalRecords();
      if (result.success) {
        setMedicalRecords(result.data);
      } else {
        setError(result.message);
        setMedicalRecords([]);
      }
    } catch {
      setError("Có lỗi xảy ra khi tải hồ sơ y tế");
      setMedicalRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Chọn một record để xem chi tiết (không cần gọi API)
  const selectRecord = useCallback((record) => {
    setSelectedRecord(record);
  }, []);

  // Clear selected record
  const clearSelectedRecord = useCallback(() => {
    setSelectedRecord(null);
  }, []);

  // Refresh data
  const refetch = useCallback(() => {
    fetchMedicalRecords();
  }, [fetchMedicalRecords]);

  return {
    medicalRecords,
    selectedRecord,
    loading,
    error,
    fetchMedicalRecords,
    selectRecord,
    clearSelectedRecord,
    refetch,
  };
};
