// services/authService.js
import instance from "../../config/axios";

export const registerUser = async (data) => {
  const response = await instance.post("/api/auth/register", data);
  return response.data; // { success, message, data }
};
