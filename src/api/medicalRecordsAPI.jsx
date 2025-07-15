import axios from "../config/axios";

export const getMedicalRecords = async () => {
  try {
    const response = await axios.get("/api/customer/medical-records/patient");
    return {
      success: true,
      data: response.data.data || [],
      message: response.data.message,
    };
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return {
      success: false,
      data: [],
      message:
        error.response?.data?.message || "Có lỗi xảy ra khi lấy hồ sơ y tế",
    };
  }
};
