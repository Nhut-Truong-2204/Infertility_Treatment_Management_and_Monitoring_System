import { useState, useEffect, useCallback } from "react";
import { getServicesDefinitions } from "../api/servicesAPI";

/**
 * Custom hook để lấy danh sách các dịch vụ cụ thể (service definitions)
 * dựa trên loại dịch vụ (serviceType).
 * @param {string|object} serviceType - Tên của loại dịch vụ hoặc object chứa typeName và description để lọc.
 * @returns {{services: Array, loading: boolean, error: object|null, refetch: function}}
 */
const useServiceDefinitions = (serviceType, search) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sử dụng useCallback để đóng gói hàm fetch, tránh việc tạo lại không cần thiết
  const fetchServices = useCallback(async () => {
    // Chỉ gọi API nếu có serviceType được cung cấp
    if (
      !serviceType ||
      (typeof serviceType === "object" && !serviceType.typeName)
    ) {
      setServices([]); // Xóa danh sách dịch vụ nếu không có loại dịch vụ
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Gọi API với serviceType làm query parameter
      const response = await getServicesDefinitions(serviceType, search);
      setServices(response || []);
      console.log("Dịch vụ đã được tải:", response);
    } catch (err) {
      setError(err);
      console.error("Lỗi khi tải danh sách dịch vụ:", err);
      setServices([]); // Đảm bảo services là một mảng rỗng khi có lỗi
    } finally {
      setLoading(false);
    }
  }, [serviceType, search]); // Dependency là serviceType, hàm sẽ được tạo lại khi serviceType thay đổi

  // Sử dụng useEffect để gọi hàm fetchServices khi component được gắn vào hoặc khi fetchServices thay đổi
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Trả về state và hàm để gọi lại API thủ công nếu cần
  return { services, loading, error, refetch: fetchServices };
};

export default useServiceDefinitions;
