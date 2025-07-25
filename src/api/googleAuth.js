import instance from "../config/axios";

export const loginWithGoogle = async (googleToken) => {
  // googleToken là mã code từ Google
  try {
    const response = await instance.post("/api/oauth2/callback", { code: googleToken });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Đăng nhập Google thất bại" };
  }
};
