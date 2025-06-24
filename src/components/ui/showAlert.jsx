import Swal from "sweetalert2";

/**
 * Hiện cảnh báo thành công
 * @param {string} message 
 */
export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Thành công",
    text: message,
    timer: 2500,
    showConfirmButton: false,
  });
};

/**
 * Hiện cảnh báo lỗi
 * @param {string} message 
 */
export const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Lỗi",
    text: message,
    timer: 3000,
    showConfirmButton: false,
  });
};

/**
 * Hiện thông báo cảnh báo
 * @param {string} message 
 */
export const showWarning = (message) => {
  Swal.fire({
    icon: "warning",
    title: "Cảnh báo",
    text: message,
    confirmButtonText: "Đã hiểu",
  });
};

/**
 * Xác nhận trước hành động
 * @param {string} message 
 * @returns {Promise<boolean>}
 */
export const showConfirm = async (message) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Xác nhận",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy",
  });

  return result.isConfirmed;
};
