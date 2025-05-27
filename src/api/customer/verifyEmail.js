import axios from '../../config/axios';

export const verifyEmail = async ({ email, code }) => {
  console.log("Dữ liệu gửi đi:", { email, code });

  // Giả lập delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Giả lập validation
  if (!email || !code) {
    throw {
      response: {
        data: {
          message: 'Email và mã xác thực là bắt buộc'
        }
      }
    };
  }

  // Giả lập mã xác thực đúng là "123456"
  if (code !== "123456") {
    throw {
      response: {
        data: {
          message: 'Mã xác thực không chính xác'
        }
      }
    };
  }

  // Dữ liệu giả lập trả về khi thành công
  const mockResponse = {
    success: true,
    message: 'Xác thực email thành công',
    data: {
      email: email,
      verified: true,
      verifiedAt: new Date().toISOString()
    }
  };

  return mockResponse;
};

// API giả lập gửi lại mã xác thực
export const resendVerificationCode = async (email) => {
  console.log("Gửi lại mã xác thực cho email:", email);
  
  // Giả lập delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!email) {
    throw {
      response: {
        data: {
          message: 'Email là bắt buộc'
        }
      }
    };
  }

  // Giả lập response thành công
  return {
    success: true,
    message: 'Đã gửi lại mã xác thực. Vui lòng kiểm tra email của bạn',
  };
};