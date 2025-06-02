import axios from '../../config/axios'; // sử dụng instance đã cấu hình

export const registerUser = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
};
