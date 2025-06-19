import instance from "../../config/axios";

// 1. Tạo lịch hẹn khám
export const createAppointment = (data) => {
  return instance.post("/api/appointments", data);
};

// 2. Dời lịch hẹn
export const rescheduleAppointment = (appointmentId, data) => {
  return instance.put(`/api/appointments/${appointmentId}/reschedule`, data);
};

// 3. Lấy lịch hẹn của staff
export const getStaffAppointments = () => {
  return instance.get("/api/staff/appointments");
};

// 4. Lấy lịch hẹn của bệnh nhân
export const getPatientAppointments = () => {
  return instance.get("/api/patient/appointments");
};

// 5. Lấy lịch hẹn của bác sĩ
export const getDoctorAppointments = () => {
  return instance.get("/api/doctors/appointments");
};

// 6. Xem chi tiết lịch hẹn
export const getAppointmentDetail = (appointmentId) => {
  return instance.get(`/api/appointments/${appointmentId}`);
};

// 7. Hủy lịch hẹn
export const cancelAppointment = (appointmentId) => {
  return instance.delete(`/api/appointments/${appointmentId}/cancel`);
};
