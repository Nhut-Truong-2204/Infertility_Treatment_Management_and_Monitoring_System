import instance from "../../config/axios";

// Lấy danh sách bác sĩ
export const getDoctors = async (page = 0, limit = 10) => {
  try {
    const response = await instance.get(`/api/doctors?page=${page}&size=${limit}`);
    
    const contentType = response.headers["content-type"];
    console.log("Content-Type:", contentType);
    if (!contentType?.includes("application/json")) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }

    return response.data; // axios trả sẵn JSON rồi
  } catch (error) {
    console.error("❌ Failed to fetch doctors:", error);
    throw error;
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
