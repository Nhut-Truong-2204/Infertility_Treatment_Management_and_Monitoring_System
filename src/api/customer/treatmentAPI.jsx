import instance from "../../config/axios";

export const getTreatmentHistory = async () => {
  try {
    const response = await instance.get("/api/customer/treatment-history");
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Lỗi không xác định",
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      message: "Lỗi kết nối đến máy chủ",
    };
  }
};
