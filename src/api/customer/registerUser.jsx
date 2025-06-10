// services/authService.js
import axios from "axios";
import instance from "../../config/axios";

export const registerUser = async (data) => {
  try {
    const response = await instance.post("/api/auth/register", data);
    return response.data; // { success, message, data }
  } catch (error) {
    throw error; // Để FE xử lý lỗi chi tiết
  }
};
