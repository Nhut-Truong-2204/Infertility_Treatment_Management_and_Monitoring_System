import axios from "../config/axios";

// 1. Tạo lịch hẹn khám
export const createAppointment = async (data) => {
  try {
    const res = await axios.post("/api/customer/appointments", data);
    return res.data;
  } catch (err) {
    console.error("API Appointment Error:", err.response?.data || err);
    return { success: false, message: "Lỗi server hoặc kết nối" };
  }
};

export const getAppointmentTypes = async () => {
  try {
    const res = await axios.get("/api/appointment-types");
    return res.data.data || [];
  } catch (err) {
    console.error("API Appointment Types Error:", err.response?.data || err);
    throw new Error("Không thể lấy danh sách loại lịch hẹn");
  }
};

// 2. Dời lịch hẹn
export const rescheduleAppointment = (appointmentId, data) => {
  return axios.put(`/api/appointments/${appointmentId}/reschedule`, data);
};

// 4. Lấy lịch hẹn của bệnh nhân
export const getPatientAppointments = (params = {}) => {
  const { page = 0, size = 10, status, fromDate, toDate } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (status) queryParams.append("status", status);
  if (fromDate) queryParams.append("fromDate", fromDate);
  if (toDate) queryParams.append("toDate", toDate);

  return axios.get(`/api/patient/appointments?${queryParams.toString()}`);
};

// 6. Xem chi tiết lịch hẹn
export const getAppointmentDetail = (appointmentId) => {
  return axios.get(`/api/appointments/${appointmentId}`);
};

// 7. Hủy lịch hẹn
export const cancelAppointment = (appointmentId, reason = "") => {
  return axios.delete(`/api/appointments/${appointmentId}/cancel`, {
    data: reason ? reason : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
