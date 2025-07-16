import React from "react";
import {
  X,
  FileText,
  Calendar,
  User,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { MEDICAL_COLORS, MEDICAL_SHADOWS } from "../styles/medicalTheme";

const CONTRACT_STATUS_CONFIGS = {
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

const TreatmentContractDetailModal = ({
  contract,
  isOpen,
  onClose,
  loading,
}) => {
  if (!isOpen) return null;

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
    return CONTRACT_STATUS_CONFIGS[status] || CONTRACT_STATUS_CONFIGS.PENDING;
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "rgba(32,41,110,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="bg-white rounded-2xl max-w-md w-full p-6"
          style={{ boxShadow: MEDICAL_SHADOWS.medium }}
        >
          <div className="flex flex-col items-center justify-center py-8">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
              style={{ borderColor: MEDICAL_COLORS.primary[500] }}
            ></div>
            <span className="mt-4 text-gray-700">
              Đang tải chi tiết hợp đồng...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!contract) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "rgba(32,41,110,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="bg-white rounded-2xl max-w-md w-full p-6"
          style={{ boxShadow: MEDICAL_SHADOWS.medium }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-semibold"
              style={{ color: MEDICAL_COLORS.primary[700] }}
            >
              Chi tiết hợp đồng
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-700">Không thể tải thông tin hợp đồng</p>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(contract.status?.typeName);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(32,41,110,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: MEDICAL_SHADOWS.large }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: MEDICAL_COLORS.primary[500] }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  Hợp đồng điều trị #{contract.contractNumber}
                </h2>
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-2"
                  style={{
                    backgroundColor: statusConfig.bgColor,
                    color: statusConfig.textColor,
                    borderColor: statusConfig.borderColor,
                  }}
                >
                  {statusConfig.icon}
                  <span className="ml-2">{statusConfig.text}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Patient Info */}
          <div
            className="bg-white border border-gray-200 rounded-xl p-6 mb-6"
            style={{ boxShadow: MEDICAL_SHADOWS.soft }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: MEDICAL_COLORS.primary[700] }}
            >
              Thông tin bệnh nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-900">
                  {contract.patientProfile?.fullName || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Ngày sinh: {formatDate(contract.patientProfile?.dateOfBirth)}
                </p>
                <p className="text-sm text-gray-600">
                  Giới tính:{" "}
                  {contract.patientProfile?.gender || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  SĐT: {contract.patientProfile?.phoneNumber || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {contract.patientProfile?.email || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Địa chỉ: {contract.patientProfile?.address || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  CMND/CCCD:{" "}
                  {contract.patientProfile?.cccdCmnd || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Tình trạng hôn nhân:{" "}
                  {contract.patientProfile?.maritalStatus?.description ||
                    "Chưa xác định"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Tiền sử bệnh:{" "}
                  {contract.patientProfile?.medicalHistory || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Tiền sử gia đình:{" "}
                  {contract.patientProfile?.familyMedicalHistory ||
                    "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Dị ứng:{" "}
                  {contract.patientProfile?.allergies || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Nghề nghiệp:{" "}
                  {contract.patientProfile?.occupation || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Vợ/Chồng:{" "}
                  {contract.patientProfile?.partnerFullName || "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Ngày sinh vợ/chồng:{" "}
                  {formatDate(contract.patientProfile?.partnerDateOfBirth)}
                </p>
                <p className="text-sm text-gray-600">
                  SĐT vợ/chồng:{" "}
                  {contract.patientProfile?.partnerPhoneNumber ||
                    "Chưa xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Tiền sử bệnh vợ/chồng:{" "}
                  {contract.patientProfile?.partnerMedicalHistory ||
                    "Chưa xác định"}
                </p>
              </div>
            </div>
          </div>

          {/* Contract Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white border border-gray-200 rounded-xl p-6"
              style={{ boxShadow: MEDICAL_SHADOWS.soft }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Thông tin hợp đồng
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign
                    className="w-5 h-5"
                    style={{ color: MEDICAL_COLORS.primary[500] }}
                  />
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: MEDICAL_COLORS.primary[700] }}
                    >
                      {formatCurrency(contract.totalValue)}
                    </p>
                    <p className="text-sm text-gray-600">Tổng giá trị</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar
                    className="w-5 h-5"
                    style={{ color: MEDICAL_COLORS.primary[500] }}
                  />
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: MEDICAL_COLORS.primary[700] }}
                    >
                      {formatDate(contract.signDate)}
                    </p>
                    <p className="text-sm text-gray-600">Ngày ký</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white border border-gray-200 rounded-xl p-6"
              style={{ boxShadow: MEDICAL_SHADOWS.soft }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Thời gian hiệu lực
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar
                    className="w-5 h-5"
                    style={{ color: MEDICAL_COLORS.success[500] }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatDate(contract.effectiveDate)}
                    </p>
                    <p className="text-sm text-gray-600">Ngày có hiệu lực</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar
                    className="w-5 h-5"
                    style={{ color: MEDICAL_COLORS.warning[500] }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatDate(contract.expiryDate)}
                    </p>
                    <p className="text-sm text-gray-600">Ngày hết hạn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white border border-gray-200 rounded-xl p-6"
              style={{ boxShadow: MEDICAL_SHADOWS.soft }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Người tạo hợp đồng
              </h3>
              <div className="flex items-center gap-3">
                <User
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.info[500] }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {contract.createdByUser?.fullName || "Chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {contract.createdByUser?.email || "Chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    SĐT:{" "}
                    {contract.createdByUser?.phoneNumber || "Chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Vai trò:{" "}
                    {contract.createdByUser?.roleName || "Chưa xác định"}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="bg-white border border-gray-200 rounded-xl p-6"
              style={{ boxShadow: MEDICAL_SHADOWS.soft }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Người phê duyệt
              </h3>
              <div className="flex items-center gap-3">
                <User
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.accent[500] }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {contract.approvedByUser?.fullName || "Chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: {contract.approvedByUser?.email || "Chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    SĐT:{" "}
                    {contract.approvedByUser?.phoneNumber || "Chưa xác định"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Vai trò:{" "}
                    {contract.approvedByUser?.roleName || "Chưa xác định"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          {contract.termsAndConditions && (
            <div
              className="bg-white border border-gray-200 rounded-xl p-6"
              style={{ boxShadow: MEDICAL_SHADOWS.soft }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Điều khoản và điều kiện
              </h3>
              <div className="prose prose-sm max-w-none">
                <div
                  className="p-4 rounded-lg text-gray-700 leading-relaxed whitespace-pre-wrap"
                  style={{ backgroundColor: MEDICAL_COLORS.gray[50] }}
                >
                  {typeof contract.termsAndConditions === "string"
                    ? contract.termsAndConditions
                    : "Không có thông tin"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              style={{ minWidth: 100 }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentContractDetailModal;
