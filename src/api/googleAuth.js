import instance from "../config/axios";

export const loginWithGoogle = async (tokenId) => {
  try {
    const response = await instance.post("/api/oauth2/login", null, {
      params: { tokenId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Đăng nhập Google thất bại" };
  }
};
