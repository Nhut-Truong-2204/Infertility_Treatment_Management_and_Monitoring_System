// services/authService.js
import axios from "axios";

export const registerUser = async (data) => {
  try {
    const response = await axios.post("/api/auth/register", data);
    return response.data; // { success, message, data }
  } catch (error) {
    throw error; // Để FE xử lý lỗi chi tiết
  }
};
