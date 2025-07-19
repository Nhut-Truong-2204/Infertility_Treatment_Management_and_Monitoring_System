import axios from "../config/axios";

// Lấy PayOS link cho appointment hoặc contract
export const getPayosLink = async ({ appointmentId, contractId }) => {
  try {
    const params = {};
    if (appointmentId) params.appointmentId = appointmentId;
    if (contractId) params.contractId = contractId;
    const res = await axios.get("/api/payment/payos-link", { params });
    return res.data.payosUrl;
  } catch (err) {
    throw new Error(
      err?.response?.data?.message || "Không thể lấy link thanh toán PayOS"
    );
  }
};
