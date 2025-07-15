import instance from "../config/axios";

async function getClinicIntroduction() {
  try {
    const response = await instance.get("/api/clinic-info");
    if (!response.data.success) {
      if (response.status === 404) {
        throw new Error("Không tìm thấy thông tin phòng khám");
      }
      throw new Error("Lỗi khi tải dữ liệu");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching clinic introduction:", error);
    throw error;
  }
}
export { getClinicIntroduction };
