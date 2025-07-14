import instance from "../config/axios";

export const verifyEmail = async ({ email, code }) => {
  try {
    const response = await instance.post("/api/auth/verify-email", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await instance.post("/api/auth/resend-verification", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
