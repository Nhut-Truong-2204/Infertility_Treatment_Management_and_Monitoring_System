import instance from "../config/axios";

export const registerUser = async (data) => {
  try {
    const response = await instance.post("/api/auth/register", data);
    return response.data; // { success, message, data }
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyOTP = async (data) => {
  try {
    // Validate input
    if (!data.email || !data.otp) {
      throw new Error("Email và OTP không được để trống");
    }

    // data phải chứa: { email, otp }
    const response = await instance.post("/api/auth/verify-otp", {
      email: data.email,
      otp: data.otp,
    });
    return response.data; // { success, message, data }
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resendOTP = async (email) => {
  try {
    const response = await instance.post("/api/auth/resend-otp", {
      email,
    });
    return response.data; // { success, message, data }
  } catch (error) {
    throw error.response?.data || error;
  }
};
