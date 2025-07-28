import axios from "../config/axios";

// Lấy lịch làm việc của bác sĩ theo ngày
export const getDoctorWorkScheduleByDate = async (doctorId, date) => {
  try {
    const response = await axios.get(
      `/api/doctors/${doctorId}/work-schedules/date`,
      {
        params: { date },
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Không thể lấy lịch làm việc của bác sĩ theo ngày", error);
    throw new Error("Không thể lấy lịch làm việc của bác sĩ theo ngày");
  }
};
