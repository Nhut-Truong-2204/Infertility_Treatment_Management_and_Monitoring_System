// src/api/customer/LabTestApi.jsx
import api from "../config/axios"; // Import instance axios đã cấu hình

const LABTEST_API_BASE_PATH = "/api/customer/lab-test-orders"; // Đường dẫn cơ sở cho các API xét nghiệm

/**
 * Lấy lịch sử xét nghiệm cho bệnh nhân
 * @param {number} page - Số trang (bắt đầu từ 0)
 * @param {number} size - Số lượng phần tử trên mỗi trang
 * @param {string} statusFilter - Trạng thái lọc (ví dụ: 'COMPLETED', 'PENDING')
 * @returns {Promise<Object>} Dữ liệu phản hồi từ API
 */
export const getLabTestHistory = async (
  page = 0,
  size = 10,
  statusFilter = ""
) => {
  let url = `${LABTEST_API_BASE_PATH}?page=${page}&size=${size}`;
  if (statusFilter) {
    url += `&status=${encodeURIComponent(statusFilter)}`;
  }

  try {
    const response = await api.get(url);
    // API phản hồi trực tiếp dữ liệu phân trang ở root, không có 'data' hay 'success' ở cấp root cho danh sách
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch lab test history:", error);
    throw error;
  }
};

/**
 * Lấy chi tiết một đơn xét nghiệm cụ thể
 * @param {number} orderId - ID của đơn xét nghiệm
 * @returns {Promise<Object>} Dữ liệu chi tiết đơn xét nghiệm
 */
export const getLabTestOrderDetail = async (orderId) => {
  try {
    const response = await api.get(`${LABTEST_API_BASE_PATH}/${orderId}`);
    // API phản hồi trực tiếp đối tượng chi tiết, có thể có 'success' hoặc không tùy backend
    return response.data;
  } catch (error) {
    console.error(
      `❌ Failed to fetch lab test order detail for ID ${orderId}:`,
      error
    );
    throw error;
  }
};
