import authAxios from "../config/authAxios";

export const getCustomerNotifications = async () => {
  return await authAxios.get("/api/customer/notifications");
};
