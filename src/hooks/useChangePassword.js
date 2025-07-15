import { useState } from "react";
import { changePassword } from "../api/profileAPI";
import Swal from "sweetalert2";

/**
 * Hook quản lý logic đổi mật khẩu
 * @returns {Object} Object chứa state và functions để đổi mật khẩu
 */
export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Validate form data
   * @param {Object} formData - Dữ liệu form
   * @returns {boolean} True nếu valid, false nếu có lỗi
   */
  const validateForm = (formData) => {
    const newErrors = {};

    // Validate current password
    if (!formData.currentPassword?.trim()) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    // Validate new password
    if (!formData.newPassword?.trim()) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    } else if (formData.newPassword.length > 100) {
      newErrors.newPassword = "Mật khẩu mới không được quá 100 ký tự";
    }

    // Validate confirm password
    if (!formData.confirmNewPassword?.trim()) {
      newErrors.confirmNewPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Mật khẩu xác nhận không khớp";
    }

    // Check if new password is different from current password
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Thực hiện đổi mật khẩu
   * @param {Object} formData - Dữ liệu form
   * @param {Function} onSuccess - Callback khi thành công
   * @returns {Promise<boolean>} True nếu thành công, false nếu thất bại
   */
  const handleChangePassword = async (formData, onSuccess) => {
    // Reset errors
    setErrors({});

    // Validate form
    if (!validateForm(formData)) {
      return false;
    }

    setIsLoading(true);

    try {
      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Đổi mật khẩu thành công!",
        text: response.message || "Mật khẩu của bạn đã được cập nhật.",
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "Đồng ý",
      });

      // Call onSuccess callback
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }

      return true;
    } catch (error) {
      console.error("Error changing password:", error);

      // Handle specific error messages
      let errorMessage = "Không thể thay đổi mật khẩu. Vui lòng thử lại.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }

      // Handle field-specific errors
      if (error.data?.errors) {
        const fieldErrors = {};
        Object.keys(error.data.errors).forEach((field) => {
          fieldErrors[field] = error.data.errors[field];
        });
        setErrors(fieldErrors);
      } else {
        // Show general error message
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra!",
          text: errorMessage,
          confirmButtonColor: "#EF4444",
          confirmButtonText: "Đồng ý",
        });
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear errors
   */
  const clearErrors = () => {
    setErrors({});
  };

  /**
   * Clear specific field error
   * @param {string} fieldName - Tên field cần clear error
   */
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  return {
    isLoading,
    errors,
    handleChangePassword,
    validateForm,
    clearErrors,
    clearFieldError,
  };
};

export default useChangePassword;
