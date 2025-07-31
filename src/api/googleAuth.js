import instance from "../config/axios";

export const loginWithGoogle = async (googleToken) => {
  try {
    const response = await instance.get(
      "/api/oauth2/callback?code=" + googleToken
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Đăng nhập Google thất bại" };
  }
};
