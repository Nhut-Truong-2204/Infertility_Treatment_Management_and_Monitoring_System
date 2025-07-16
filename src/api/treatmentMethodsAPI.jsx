import instance from "../config/axios";

// Lấy danh sách phương pháp điều trị
export const getTreatmentMethods = async () => {
  try {
    const response = await instance.get("/api/treatment-methods");
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch treatment methods:", error);
    throw new Error("Lỗi khi lấy danh sách phương pháp điều trị");
  }
};

// Lấy danh sách mẫu phác đồ điều trị
export const getProtocolTemplates = async () => {
  try {
    const response = await instance.get("/api/protocol-templates");
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch protocol templates:", error);
    throw new Error("Lỗi khi lấy danh sách mẫu phác đồ điều trị");
  }
};
