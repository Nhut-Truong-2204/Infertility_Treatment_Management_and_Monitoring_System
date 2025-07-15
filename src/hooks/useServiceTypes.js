import { useState, useEffect } from "react";
import { getServiceTypes } from "../api/servicesAPI";

const useServiceTypes = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        setLoading(true);
        const response = await getServiceTypes();
        setServiceTypes(response);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi tải loại dịch vụ:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceTypes();
  }, []);

  return { serviceTypes, loading, error };
};

export default useServiceTypes;
