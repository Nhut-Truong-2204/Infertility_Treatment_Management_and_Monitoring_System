import { useState, useCallback } from "react";
import axios from "../config/axios";

export default function useInvoices() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInvoices = useCallback(async (filters) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/invoices/my-invoices", {
        params: {
          page: filters.page,
          size: filters.size,
        },
      });
      setData(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Lỗi không xác định"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchInvoices };
}
