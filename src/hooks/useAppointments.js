import { useState, useCallback } from "react";
import {
  getPatientAppointments,
  getAppointmentDetail,
} from "../api/appointmentAPI";

const useAppointments = () => {
  const [appointments, setAppointments] = useState({
    content: [],
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    size: 10,
    number: 0,
  });

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch appointments list with filters
  const fetchAppointments = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPatientAppointments(filters);
      if (response.data && response.data.success) {
        setAppointments(response.data.data);
      } else {
        setError("Không thể tải danh sách lịch hẹn");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch appointment detail
  const fetchAppointmentDetail = useCallback(async (appointmentId) => {
    setDetailLoading(true);
    setError(null);
    try {
      const response = await getAppointmentDetail(appointmentId);
      if (response.data && response.data.success) {
        setSelectedAppointment(response.data.data);
        return response.data.data;
      } else {
        setError("Không thể tải chi tiết lịch hẹn");
        return null;
      }
    } catch (err) {
      console.error("Error fetching appointment detail:", err);
      setError(
        err.response?.data?.message || "Có lỗi xảy ra khi tải chi tiết lịch hẹn"
      );
      return null;
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // Clear selected appointment
  const clearSelectedAppointment = useCallback(() => {
    setSelectedAppointment(null);
  }, []);

  // Get appointment statistics
  const getStats = useCallback(() => {
    if (!appointments.content)
      return { total: 0, completed: 0, scheduled: 0, cancelled: 0 };

    const total = appointments.totalElements;
    const completed = appointments.content.filter(
      (apt) => apt.status?.status === "COMPLETED"
    ).length;
    const scheduled = appointments.content.filter(
      (apt) => apt.status?.status === "SCHEDULED"
    ).length;
    const cancelled = appointments.content.filter(
      (apt) =>
        apt.status?.status === "CANCELLED_BY_PATIENT" ||
        apt.status?.status === "CANCELLED_BY_CLINIC"
    ).length;

    return { total, completed, scheduled, cancelled };
  }, [appointments]);

  return {
    // Data
    appointments,
    selectedAppointment,
    loading,
    detailLoading,
    error,

    // Functions
    fetchAppointments,
    fetchAppointmentDetail,
    clearSelectedAppointment,
    getStats,

    // Setters (if needed for external control)
    setAppointments,
    setSelectedAppointment,
    setError,
  };
};

export default useAppointments;
