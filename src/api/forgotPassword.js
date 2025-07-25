import instance from "../config/axios";

const API_TIMEOUT = 15000; // 15 seconds

const ERROR_MESSAGES = {
  INVALID_CODE: "Mã xác thực không hợp lệ",
  EXPIRED_TOKEN: "Mã xác thực đã hết hạn",
  NETWORK_ERROR: "Lỗi kết nối, vui lòng thử lại",
};

export const requestPasswordReset = async (email) => {
  if (!email || typeof email !== "string") {
    throw new Error("Email không hợp lệ");
  }
  try {
    const response = await Promise.race([
      instance.post("/api/auth/forgot-password", { email }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), API_TIMEOUT)
      ),
    ]);
    return response.data;
  } catch (error) {
    if (error.message === "Timeout") {
      throw new Error("Yêu cầu hết thời gian, vui lòng thử lại");
    }
    throw error.response?.data || { message: "Có lỗi xảy ra" };
  }
};

// 2. Validate reset token
export const validateResetToken = async (token, email) => {
  if (!token || !email) {
    throw new Error("Thiếu thông tin xác thực");
  }
  try {
    const response = await instance.get("/api/auth/validate-reset-token", {
      params: { token, email },
    });
    return response.data;
  } catch (error) {
    throw {
      message:
        ERROR_MESSAGES[error.code] ||
        error.message ||
        ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
};

// 3. Reset password with token
export const resetPassword = async (token, password, confirmPassword) => {
  if (!token || !password || !confirmPassword) {
    throw new Error("Thiếu thông tin cần thiết");
  }
  if (password !== confirmPassword) {
    throw new Error("Mật khẩu xác nhận không khớp");
  }
  try {
    // Thêm email vào tham số
    const response = await instance.post(`/api/auth/reset-password`, {
      password,
      confirmPassword,
      token,
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Không thể đổi mật khẩu" };
  }
};
