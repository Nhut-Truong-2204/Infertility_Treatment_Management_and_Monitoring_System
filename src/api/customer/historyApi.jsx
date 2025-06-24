// src/api/customer/historyApi.jsx (đổi tên thư mục nếu cần, ví dụ từ components sang api)
import instance from '../../config/axios'; // Import the axios instance

export const getTreatmentHistory = async () => {
  try {
    const response = await instance.get('/api/customer/treatment-history');
    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, error: 'Không thể tải lịch sử điều trị' };
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
        return { success: false, error: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.' };
    } else {
        return { success: false, error: 'Lỗi khi lấy dữ liệu: ' + (err.message || 'Unknown Error') };
    }
  }
};