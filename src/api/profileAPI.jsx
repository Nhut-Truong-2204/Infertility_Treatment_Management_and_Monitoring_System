import authAxios from "../config/authAxios";
import { formAxios } from "../config/axios";
// API để lấy thông tin profile hiện tại
export const getCurrentProfile = async () => {
  try {
    const response = await authAxios.get("/api/auth/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// API để cập nhật profile
export const updateProfile = async (profileData) => {
  try {
    const response = await formAxios.put("/api/auth/profile", profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// API để thay đổi mật khẩu
export const changePassword = async (passwordData) => {
  try {
    const response = await authAxios.post("/api/auth/change-password", {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmNewPassword: passwordData.confirmNewPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// API để upload avatar
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await authAxios.post("/api/auth/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
