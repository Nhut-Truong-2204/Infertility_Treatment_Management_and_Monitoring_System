import { useState, useEffect, useCallback } from "react";
import { getTreatmentContracts } from "../api/treatmentContractsAPI";

const useTreatmentContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch contracts list
  const fetchContracts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTreatmentContracts();
      setContracts(Array.isArray(response) ? response : []);
    } catch (err) {
      setError("Không thể tải danh sách hợp đồng điều trị");
      console.error("Error fetching treatment contracts:", err);
      setContracts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch contract detail
  // Lấy chi tiết hợp đồng từ danh sách đã tải
  const fetchContractDetail = useCallback(
    (contractId) => {
      setDetailLoading(true);
      try {
        const found = contracts.find(
          (contract) => contract.treatmentContractId === contractId
        );
        setSelectedContract(found || null);
        return found || null;
      } catch {
        setError("Không thể tải chi tiết hợp đồng");
        return null;
      } finally {
        setDetailLoading(false);
      }
    },
    [contracts]
  );

  // Clear selected contract
  const clearSelectedContract = useCallback(() => {
    setSelectedContract(null);
  }, []);

  // Get contract statistics
  const getStats = useCallback(() => {
    if (!Array.isArray(contracts))
      return { total: 0, active: 0, completed: 0, cancelled: 0 };

    const total = contracts.length;
    const active = contracts.filter(
      (contract) => contract.status?.typeName === "ACTIVE"
    ).length;
    const completed = contracts.filter(
      (contract) => contract.status?.typeName === "COMPLETED"
    ).length;
    const cancelled = contracts.filter(
      (contract) => contract.status?.typeName === "CANCELLED"
    ).length;

    return { total, active, completed, cancelled };
  }, [contracts]);

  // Initial load
  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return {
    // Data
    contracts,
    selectedContract,
    loading,
    detailLoading,
    error,

    // Functions
    fetchContracts,
    fetchContractDetail,
    clearSelectedContract,
    getStats,

    // Setters (if needed for external control)
    setContracts,
    setSelectedContract,
    setError,
  };
};

export default useTreatmentContracts;
