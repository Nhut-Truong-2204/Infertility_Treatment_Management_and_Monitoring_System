import { useState, useEffect, useCallback } from "react";
import { getPatientAppointments } from "../api/appointmentAPI";
import { getTreatmentTimeline } from "../api/treatmentAPI";

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    upcomingAppointments: [],
    treatmentProtocols: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch upcoming appointments
  const fetchUpcomingAppointments = useCallback(async () => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const response = await getPatientAppointments({
        page: 0,
        size: 5,
        fromDate: currentDate,
        status: "CONFIRMED",
      });

      if (response.data && response.data.success) {
        return response.data.data.content || [];
      }
      return [];
    } catch (err) {
      console.error("Error fetching upcoming appointments:", err);
      return [];
    }
  }, []);

  // Fetch treatment timeline
  const fetchTreatmentTimeline = useCallback(async () => {
    try {
      const response = await getTreatmentTimeline();
      if (response.success) {
        // Return the full array of treatment protocols
        return response.data || [];
      }
      return [];
    } catch (err) {
      console.error("Error fetching treatment timeline:", err);
      return [];
    }
  }, []);

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [appointments, treatmentProtocols] = await Promise.all([
        fetchUpcomingAppointments(),
        fetchTreatmentTimeline(),
      ]);

      setDashboardData({
        upcomingAppointments: appointments,
        treatmentProtocols: treatmentProtocols,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Không thể tải dữ liệu dashboard");
    } finally {
      setLoading(false);
    }
  }, [fetchUpcomingAppointments, fetchTreatmentTimeline]);

  // Refresh dashboard data
  const refreshData = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    dashboardData,
    loading,
    error,
    refreshData,
  };
};

export default useDashboard;
