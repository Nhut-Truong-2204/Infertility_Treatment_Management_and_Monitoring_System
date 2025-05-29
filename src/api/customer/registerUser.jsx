import axios from '../../config/axios';

export const registerUser = async (data) => {

//   const response = await axios.post('/auth/register', data);
// return response.data;
  console.log("Dữ liệu gửi đi:", data);

  // Giả lập delay như đang gọi API thật
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Dữ liệu giả lập trả về (response giả)
  const mockResponse = {
    status: 201,
    message: 'Đăng ký thành công!',
    user: {
      id: '123456789',
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber || null,
    },
    accessToken: 'fake-jwt-token-abc123'
  };

  return mockResponse;
};