import { useState, useEffect } from "react";
import { getCustomerNotifications } from "../api/notificationAPI";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCustomerNotifications();
      setNotifications(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Không thể tải thông báo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, loading, error, refresh: fetchNotifications };
}
