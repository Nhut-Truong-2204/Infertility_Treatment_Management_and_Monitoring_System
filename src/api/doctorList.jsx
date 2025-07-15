import instance from "../config/axios";

// Lấy danh sách bác sĩ
export const getDoctors = async (doctocName) => {
  try {
    const response = await instance.get(
      `/api/doctors/doctor-profiles-summary?${
        doctocName ? `doctorName=${doctocName}` : ""
      }`
    );
    return response.data;
  } catch (_) {
    throw new Error("Lỗi khi lấy danh sách bác sĩ");
  }
};

// Lấy chi tiết bác sĩ
export const getDoctorDetail = async (userId) => {
  try {
    const response = await instance.get(`/api/doctors/${userId}`);

    const contentType = response.headers["content-type"];
    if (!contentType?.includes("application/json")) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    return response.data; // axios cũng tự parse JSON
  } catch (error) {
    console.error(`❌ Failed to fetch doctor detail for ID ${userId}:`, error);
    throw error;
  }
};
