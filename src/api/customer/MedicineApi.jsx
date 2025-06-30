// MedicineApi.jsx
import api from '../../config/axios'; // Import instance axios đã cấu hình

// SỬA ĐỔI ĐƯỜNG DẪN BASE API CHÍNH XÁC HƠN
const DRUG_API_BASE_PATH = '/api/drugs'; // Base path cho các API về thuốc

export const searchDrugs = async (query, searchBy, page = 1) => {
  // Đường dẫn tìm kiếm đầy đủ sẽ là /api/drugs/search
  let url = `${DRUG_API_BASE_PATH}/search?page=${page}`;
  if (searchBy === 'name' && query) {
    url += `&name=${encodeURIComponent(query)}`;
  } else if (searchBy === 'activeIngredient' && query) {
    url += `&activeIngredient=${encodeURIComponent(query)}`;
  }

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error searching drugs:", error);
    throw error; // Ném lỗi để component xử lý
  }
};

export const getDrugDetail = async (drugId) => {
  // Đường dẫn chi tiết đầy đủ sẽ là /api/drugs/{drugId}
  try {
    const response = await api.get(`${DRUG_API_BASE_PATH}/${drugId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching drug detail for ID ${drugId}:`, error);
    throw error; // Ném lỗi để component xử lý
  }
};