import useTreatmentContracts from "../../hooks/useTreatmentContracts";
import {
  MedicalEmptyState,
  MedicalAlert,
  MedicalCard,
  Button,
  Loading,
  MedicalStatusBadge,
} from "../../components/ui";
import { getPayosLink } from "../../api/paymentAPI";
import {
  MEDICAL_COLORS,
  MEDICAL_SHADOWS,
  MEDICAL_SPACING,
} from "../../styles/medicalTheme";
import React, { useState } from "react";
import {
  FileText,
  Calendar,
  DollarSign,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import TreatmentContractDetailModal from "../../components/TreatmentContractDetailModal";
import OTPVerificationModal from "../../components/ui/OTPVerificationModal";
import {
  sendContractOtp,
  verifyContractOtp,
  cancelContract,
} from "../../api/treatmentContractsAPI";

const TreatmentContracts = () => {
  const {
    contracts,
    selectedContract,
    loading,
    detailLoading,
    error,
    fetchContracts,
    fetchContractDetail,
    clearSelectedContract,
    getStats,
  } = useTreatmentContracts();

  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpContract, setOtpContract] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelContractId, setCancelContractId] = useState(null);

  // Hiển thị modal xác nhận hủy hợp đồng
  const handleShowCancelModal = (contractId) => {
    setCancelContractId(contractId);
    setShowCancelModal(true);
    setCancelError("");
  };

  // Xác nhận hủy hợp đồng
  const handleConfirmCancelContract = async () => {
    if (!cancelContractId) return;
    setCancelLoading(true);
    setCancelError("");
    try {
      await cancelContract(cancelContractId);
      if (typeof fetchContracts === "function") fetchContracts();
      setShowCancelModal(false);
      setCancelContractId(null);
    } catch (err) {
      setCancelError(err?.response?.data?.message || "Hủy hợp đồng thất bại");
    } finally {
      setCancelLoading(false);
    }
  };

  // Đóng modal xác nhận hủy
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelContractId(null);
    setCancelError("");
  };
  // (imports already at the top)
  const handleOpenOtpModal = (contract) => {
    setOtpContract(contract);
    setOtpEmail(contract?.patientProfile?.email || "");
    setOtpError("");
    setShowOtpModal(true);
  };

  // Gửi OTP
  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      await sendContractOtp(otpContract.treatmentContractId, otpEmail);
    } catch (err) {
      setOtpError(err?.response?.data?.message || "Gửi OTP thất bại");
      throw err;
    } finally {
      setOtpLoading(false);
    }
  };

  // Xác thực OTP
  const handleVerifyOtp = async (otp) => {
    setOtpLoading(true);
    setOtpError("");
    try {
      await verifyContractOtp(otpContract.treatmentContractId, otpEmail, otp);
      fetchContracts(); // reload contracts after signing
    } catch (err) {
      setOtpError(err?.response?.data?.message || "Xác thực OTP thất bại");
      throw err;
    } finally {
      setOtpLoading(false);
    }
  };

  // Đóng modal OTP
  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    setOtpContract(null);
    setOtpEmail("");
    setOtpError("");
  };

  // Filter contracts locally
  const filteredContracts = React.useMemo(() => {
    if (!Array.isArray(contracts)) return [];

    return contracts.filter((contract) => {
      const matchesStatus =
        !filters.status || contract.status?.typeName === filters.status;
      const matchesSearch =
        !filters.search ||
        contract.contractName
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        contract.contractNumber
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [contracts, filters]);

  // Utility functions
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatCurrency = (amount) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusConfig = (status) => {
    const configs = {
      PENDING: {
        icon: (
          <Clock
            className="w-4 h-4"
            style={{ color: MEDICAL_COLORS.warning[500] }}
          />
        ),
        text: "Chờ xử lý",
        bgColor: MEDICAL_COLORS.warning[50],
        textColor: MEDICAL_COLORS.warning[700],
        borderColor: MEDICAL_COLORS.warning[200],
      },
      SIGNED: {
        icon: (
          <CheckCircle
            className="w-4 h-4"
            style={{ color: MEDICAL_COLORS.info[500] }}
          />
        ),
        text: "Đã ký",
        bgColor: MEDICAL_COLORS.info[50],
        textColor: MEDICAL_COLORS.info[700],
        borderColor: MEDICAL_COLORS.info[200],
      },
      ACTIVE: {
        icon: (
          <CheckCircle
            className="w-4 h-4"
            style={{ color: MEDICAL_COLORS.success[500] }}
          />
        ),
        text: "Đang có hiệu lực",
        bgColor: MEDICAL_COLORS.success[50],
        textColor: MEDICAL_COLORS.success[700],
        borderColor: MEDICAL_COLORS.success[200],
      },
      COMPLETED: {
        icon: (
          <CheckCircle
            className="w-4 h-4"
            style={{ color: MEDICAL_COLORS.primary[500] }}
          />
        ),
        text: "Đã hoàn thành",
        bgColor: MEDICAL_COLORS.primary[50],
        textColor: MEDICAL_COLORS.primary[700],
        borderColor: MEDICAL_COLORS.primary[200],
      },
      CANCELLED_BY_CLINIC: {
        icon: (
          <XCircle
            className="w-4 h-4"
            style={{ color: MEDICAL_COLORS.error[500] }}
          />
        ),
        text: "Bệnh viện hủy hợp đồng",
        bgColor: MEDICAL_COLORS.error[50],
        textColor: MEDICAL_COLORS.error[700],
        borderColor: MEDICAL_COLORS.error[200],
      },
      CANCELLED_BY_CUSTOMER: {
        icon: (
          <XCircle
            className="w-4 h-4"
            style={{ color: MEDICAL_COLORS.error[500] }}
          />
        ),
        text: "Khách hàng hủy hợp đồng",
        bgColor: MEDICAL_COLORS.error[50],
        textColor: MEDICAL_COLORS.error[700],
        borderColor: MEDICAL_COLORS.error[200],
      },
    };
    return configs[status] || configs.PENDING;
  };

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      search: "",
    });
  };

  const handleViewDetail = async (contractId) => {
    const detail = await fetchContractDetail(contractId);
    if (detail) {
      setShowDetailModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    clearSelectedContract();
  };

  // Payment handler
  const [payLoadingId, setPayLoadingId] = useState(null);
  const handlePayContract = async (contractId) => {
    setPayLoadingId(contractId);
    try {
      const url = await getPayosLink({ contractId });
      window.location.href = url;
    } catch (err) {
      alert(err.message || "Không thể lấy link thanh toán");
    } finally {
      setPayLoadingId(null);
    }
  };

  // Get stats for display
  const stats = getStats();

  if (loading && contracts.length === 0) {
    return (
      <div className="bg-gray-50 py-8 font-onest min-h-screen">
        <Loading
          size="large"
          variant="medical"
          text="Đang tải danh sách hợp đồng điều trị..."
          subText="Vui lòng đợi trong giây lát"
          fullScreen
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 font-onest min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: MEDICAL_COLORS.primary[500] }}
            >
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Hợp đồng điều trị
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và theo dõi các hợp đồng điều trị của bạn
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <MedicalAlert
              type="error"
              title="Có lỗi xảy ra"
              message={error}
              onRetry={() => fetchContracts()}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MedicalCard className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: MEDICAL_COLORS.primary[100] }}
              >
                <FileText
                  className="w-6 h-6"
                  style={{ color: MEDICAL_COLORS.primary[600] }}
                />
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600">Tổng hợp đồng</p>
              </div>
            </div>
          </MedicalCard>

          <MedicalCard className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: MEDICAL_COLORS.success[100] }}
              >
                <CheckCircle
                  className="w-6 h-6"
                  style={{ color: MEDICAL_COLORS.success[600] }}
                />
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: MEDICAL_COLORS.success[700] }}
                >
                  {stats.active}
                </p>
                <p className="text-sm text-gray-600">Đang hiệu lực</p>
              </div>
            </div>
          </MedicalCard>

          <MedicalCard className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: MEDICAL_COLORS.info[100] }}
              >
                <CheckCircle
                  className="w-6 h-6"
                  style={{ color: MEDICAL_COLORS.info[600] }}
                />
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: MEDICAL_COLORS.info[700] }}
                >
                  {stats.completed}
                </p>
                <p className="text-sm text-gray-600">Hoàn thành</p>
              </div>
            </div>
          </MedicalCard>

          <MedicalCard className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: MEDICAL_COLORS.error[100] }}
              >
                <XCircle
                  className="w-6 h-6"
                  style={{ color: MEDICAL_COLORS.error[600] }}
                />
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: MEDICAL_COLORS.error[700] }}
                >
                  {stats.cancelled}
                </p>
                <p className="text-sm text-gray-600">Đã hủy</p>
              </div>
            </div>
          </MedicalCard>
        </div>

        {/* Filters and Actions */}
        <MedicalCard className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-lg font-semibold"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Bộ lọc tìm kiếm
              </h2>
              <div className="flex items-center gap-3">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Xóa bộ lọc
                </Button>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Bộ lọc
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="overflow-hidden transition-all duration-300">
                {" "}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tìm kiếm
                      </label>
                      <input
                        type="text"
                        placeholder="Tìm theo tên hoặc mã hợp đồng..."
                        value={filters.search}
                        onChange={(e) =>
                          handleFilterChange("search", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trạng thái
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">Tất cả trạng thái</option>
                        <option value="ACTIVE">Đang hiệu lực</option>
                        <option value="COMPLETED">Hoàn thành</option>
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="CANCELLED">Đã hủy</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </MedicalCard>

        {/* Contracts List */}
        <div className="space-y-6">
          {loading && contracts.length > 0 && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-primary">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Đang tải...</span>
              </div>
            </div>
          )}

          {!loading && filteredContracts.length === 0 ? (
            <MedicalEmptyState
              icon={FileText}
              title="Chưa có hợp đồng điều trị"
              description="Bạn chưa có hợp đồng điều trị nào. Hãy liên hệ với phòng khám để được tư vấn."
              actionText="Tìm hiểu thêm"
              onAction={() => {
                window.location.href = "/services";
              }}
            />
          ) : (
            <>
              {filteredContracts.map((contract) => {
                const statusConfig = getStatusConfig(contract.status?.typeName);
                return (
                  <div
                    key={contract.treatmentContractId}
                    className="opacity-0 animate-[fadeInUp_0.3s_ease-in-out_forwards]"
                  >
                    <MedicalCard
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        handleViewDetail(contract.treatmentContractId)
                      }
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: MEDICAL_COLORS.primary[100],
                              }}
                            >
                              <FileText
                                className="w-6 h-6"
                                style={{ color: MEDICAL_COLORS.primary[600] }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3
                                className="text-lg font-semibold mb-1"
                                style={{ color: MEDICAL_COLORS.primary[700] }}
                              >
                                Mã hợp đồng: {contract.contractNumber}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Ký: {formatDate(contract.signDate)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  {formatCurrency(contract.totalValue)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border"
                              style={{
                                backgroundColor: statusConfig.bgColor,
                                color: statusConfig.textColor,
                                borderColor: statusConfig.borderColor,
                              }}
                            >
                              {statusConfig.icon}
                              {statusConfig.text}
                            </div>
                            {contract.status?.typeName === "PAID" && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenOtpModal(contract);
                                }}
                                variant="primary"
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                Ký hợp đồng
                              </Button>
                            )}
                            {contract.status?.typeName === "APPROVED" && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePayContract(
                                    contract.treatmentContractId
                                  );
                                }}
                                variant="success"
                                size="sm"
                                className="flex items-center gap-2"
                                disabled={
                                  payLoadingId === contract.treatmentContractId
                                }
                              >
                                <CreditCard className="w-4 h-4" />
                              </Button>
                            )}
                            {/* Nút hủy hợp đồng cho trạng thái PENDING, SIGNED, ACTIVE */}
                            {(contract.status?.typeName === "PENDING" ||
                              contract.status?.typeName === "APPROVED" ||
                              contract.status?.typeName === "PAID" ||
                              contract.status?.typeName === "SIGNED" ||
                              contract.status?.typeName === "ACTIVE") && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowCancelModal(
                                    contract.treatmentContractId
                                  );
                                }}
                                variant="danger"
                                size="sm"
                                className="flex items-center gap-2"
                              >
                                Hủy hợp đồng
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">
                                Hiệu lực từ
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {formatDate(contract.effectiveDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Hết hạn</p>
                              <p className="text-sm font-medium text-gray-900">
                                {formatDate(contract.expiryDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Người tạo</p>
                              <p className="text-sm font-medium text-gray-900">
                                {contract.createdByUser?.fullName ||
                                  "Chưa xác định"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">
                                Người phê duyệt
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                {contract.approvedByUser?.fullName ||
                                  "Chưa xác định"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </MedicalCard>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Contract Detail Modal */}
      <TreatmentContractDetailModal
        contract={selectedContract}
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        loading={detailLoading}
      />
      {/* OTP Verification Modal */}
      <OTPVerificationModal
        isOpen={showOtpModal}
        onClose={handleCloseOtpModal}
        onSendOtp={handleSendOtp}
        onVerifyOtp={handleVerifyOtp}
        contract={otpContract}
        email={otpEmail}
        loading={otpLoading}
        error={otpError}
      />
      {/* Modal xác nhận hủy hợp đồng - chỉ hiện 1 lần, đúng hợp đồng được chọn */}
      {showCancelModal && cancelContractId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center w-full">
            <MedicalCard className="max-w-md w-full p-6 shadow-lg">
              <MedicalAlert
                type="warning"
                title="Xác nhận hủy hợp đồng"
                message="Bạn có chắc chắn muốn hủy hợp đồng này? Hành động này không thể hoàn tác."
              />
              {cancelError && (
                <div className="text-red-600 text-sm text-center mt-2">
                  {cancelError}
                </div>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={handleCloseCancelModal}>
                  Đóng
                </Button>
                <Button
                  variant="danger"
                  onClick={handleConfirmCancelContract}
                  disabled={cancelLoading}
                >
                  {cancelLoading ? "Đang hủy..." : "Xác nhận hủy"}
                </Button>
              </div>
            </MedicalCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentContracts;
