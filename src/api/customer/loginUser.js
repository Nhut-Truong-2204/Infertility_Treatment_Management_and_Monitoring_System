import axios from '../../config/axios';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    
    // Lưu token vào localStorage nếu đăng nhập thành công
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};