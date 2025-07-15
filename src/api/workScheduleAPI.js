import axios from "../config/axios";

export const getWorkingShifts = async () => {
  try {
    const response = await axios.get("/api/work-schedules/working-shifts");
    return response.data.data || [];
  } catch (error) {
    console.error("Không thể lấy danh sách các ca làm việc", error);
    throw new Error("Không thể lấy danh sách các ca làm việc");
  }
};

export const getWorkScheduleByDate = async (payload) => {
  try {
    const response = await axios.post("/api/work-schedules/date", payload);
    return response.data.data || [];
  } catch (error) {
    console.error("Không thể lấy lịch làm việc theo ngày", error);
    throw new Error("Không thể lấy lịch làm việc theo ngày");
  }
};
