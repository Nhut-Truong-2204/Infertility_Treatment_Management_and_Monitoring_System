/**
 * Khách hàng huỷ hợp đồng điều trị
 * @param {number} contractId
 * @returns {Promise<Object>} Kết quả huỷ hợp đồng
 */
export const cancelContract = async (contractId) => {
  try {
    const response = await axios.patch(
      `/api/customer/treatment-contracts/${contractId}/cancel`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Failed to cancel contract:", error);
    throw error;
  }
};
import axios from "../config/axios";

const TREATMENT_CONTRACTS_API_BASE_PATH = "/api/customer/treatment-contracts";

/**
 * Lấy danh sách hợp đồng điều trị của khách hàng
 * @returns {Promise<Array>} Danh sách hợp đồng điều trị
 */
export const getTreatmentContracts = async () => {
  try {
    const response = await axios.get(TREATMENT_CONTRACTS_API_BASE_PATH);

    // API trả về mảng hợp đồng trực tiếp
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch treatment contracts:", error);
    throw error;
  }
};

/**
 * Gửi OTP ký số hợp đồng điều trị qua email
 * @param {number} contractId
 * @param {string} email
 * @returns {Promise<Object>} Kết quả gửi OTP
 */
export const sendContractOtp = async (contractId, email) => {
  try {
    const response = await axios.post(
      `/api/treatment-contracts/${contractId}/send-otp?email=${encodeURIComponent(
        email
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send contract OTP:", error);
    throw error;
  }
};

/**
 * Xác thực OTP ký số hợp đồng điều trị
 * @param {number} contractId
 * @param {string} email
 * @param {string} otp
 * @returns {Promise<Object>} Kết quả xác thực OTP
 */
export const verifyContractOtp = async (contractId, email, otp) => {
  try {
    const response = await axios.post(
      `/api/treatment-contracts/${contractId}/verify-otp?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Failed to verify contract OTP:", error);
    throw error;
  }
};
