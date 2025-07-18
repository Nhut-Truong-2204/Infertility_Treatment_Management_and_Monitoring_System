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
  ClipboardList,
  BookOpen,
  Info,
  Stethoscope,
  FileSignature,
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

function formatDate(dateString) {
  if (!dateString) return "Chưa xác định";
  return new Date(dateString).toLocaleDateString("vi-VN");
}
function formatCurrency(amount) {
  if (!amount) return "0 VNĐ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

const TreatmentContractDetailModal = ({
  contract,
  isOpen,
  onClose,
  loading,
}) => {
  if (!isOpen) return null;

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

  const statusConfig =
    CONTRACT_STATUS_CONFIGS[contract.status?.typeName] ||
    CONTRACT_STATUS_CONFIGS.PENDING;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6"
      style={{
        background: "rgba(32,41,110,0.18)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[97vh] overflow-y-auto border border-blue-100 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#f4f5ff] to-[#fdeee6] border-b border-gray-200 px-8 py-5 rounded-t-3xl flex items-center justify-between z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
              style={{ backgroundColor: MEDICAL_COLORS.primary[500] }}
            >
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2
                className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{
                  color: MEDICAL_COLORS.primary[700],
                  letterSpacing: "-0.5px",
                }}
              >
                Hợp đồng điều trị #{contract.contractNumber}
              </h2>
              <div
                className="inline-flex items-center px-4 py-1 rounded-full text-base font-semibold border mt-2 shadow-sm"
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
            <X className="w-7 h-7 text-gray-500" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-8 space-y-10 bg-gradient-to-b from-[#f4f5ff] to-white">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {/* Patient & Contract Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Patient Info */}
            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-4">
                <User
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.info[500] }}
                />
                <h3
                  className="text-lg font-bold uppercase tracking-wide"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  Thông tin bệnh nhân
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                <div>
                  <span className="font-semibold">Họ tên:</span>{" "}
                  {contract.patientProfile?.fullName || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Ngày sinh:</span>{" "}
                  {formatDate(contract.patientProfile?.dateOfBirth)}
                </div>
                <div>
                  <span className="font-semibold">Giới tính:</span>{" "}
                  {contract.patientProfile?.gender || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">SĐT:</span>{" "}
                  {contract.patientProfile?.phoneNumber || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {contract.patientProfile?.email || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Địa chỉ:</span>{" "}
                  {contract.patientProfile?.address || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">CMND/CCCD:</span>{" "}
                  {contract.patientProfile?.cccdCmnd || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Tình trạng hôn nhân:</span>{" "}
                  {contract.patientProfile?.maritalStatus?.description ||
                    "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Nghề nghiệp:</span>{" "}
                  {contract.patientProfile?.occupation || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Tiền sử bệnh:</span>{" "}
                  {contract.patientProfile?.medicalHistory || "Không"}
                </div>
                <div>
                  <span className="font-semibold">Tiền sử gia đình:</span>{" "}
                  {contract.patientProfile?.familyMedicalHistory || "Không"}
                </div>
                <div>
                  <span className="font-semibold">Dị ứng:</span>{" "}
                  {contract.patientProfile?.allergies || "Không"}
                </div>
                <div>
                  <span className="font-semibold">Vợ/Chồng:</span>{" "}
                  {contract.patientProfile?.partnerFullName || "Không"}
                </div>
                <div>
                  <span className="font-semibold">Ngày sinh vợ/chồng:</span>{" "}
                  {formatDate(contract.patientProfile?.partnerDateOfBirth)}
                </div>
                <div>
                  <span className="font-semibold">SĐT vợ/chồng:</span>{" "}
                  {contract.patientProfile?.partnerPhoneNumber || "Không"}
                </div>
                <div>
                  <span className="font-semibold">Tiền sử bệnh vợ/chồng:</span>{" "}
                  {contract.patientProfile?.partnerMedicalHistory || "Không"}
                </div>
              </div>
            </div>
            {/* Contract Info */}
            <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <FileSignature
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.primary[500] }}
                />
                <h3
                  className="text-lg font-bold uppercase tracking-wide"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  Thông tin hợp đồng
                </h3>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-semibold">Số hợp đồng:</span>{" "}
                  {contract.contractNumber}
                </div>
                <div>
                  <span className="font-semibold">Ngày ký:</span>{" "}
                  {formatDate(contract.signDate)}
                </div>
                <div>
                  <span className="font-semibold">Ngày hiệu lực:</span>{" "}
                  {formatDate(contract.effectiveDate)}
                </div>
                <div>
                  <span className="font-semibold">Ngày hết hạn:</span>{" "}
                  {formatDate(contract.expiryDate)}
                </div>
                <div>
                  <span className="font-semibold">Tổng giá trị:</span>{" "}
                  <span className="text-lg font-bold text-green-700">
                    {formatCurrency(contract.totalValue)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Trạng thái:</span>{" "}
                  <span className="inline-flex items-center gap-1">
                    {statusConfig.icon}
                    <span>{statusConfig.text}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Người tạo & Người phê duyệt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#e8ebff] to-[#f4f5ff] border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <User
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.info[500] }}
                />
                <h3
                  className="text-lg font-bold uppercase tracking-wide"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  Người tạo hợp đồng
                </h3>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-semibold">Họ tên:</span>{" "}
                  {contract.createdByUser?.fullName || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {contract.createdByUser?.email || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">SĐT:</span>{" "}
                  {contract.createdByUser?.phoneNumber || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Vai trò:</span>{" "}
                  {contract.createdByUser?.roleName || "Chưa xác định"}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#fdeee6] to-[#f4f5ff] border border-pink-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <User
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.accent[500] }}
                />
                <h3
                  className="text-lg font-bold uppercase tracking-wide"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  Người phê duyệt
                </h3>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-semibold">Họ tên:</span>{" "}
                  {contract.approvedByUser?.fullName || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {contract.approvedByUser?.email || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">SĐT:</span>{" "}
                  {contract.approvedByUser?.phoneNumber || "Chưa xác định"}
                </div>
                <div>
                  <span className="font-semibold">Vai trò:</span>{" "}
                  {contract.approvedByUser?.roleName || "Chưa xác định"}
                </div>
              </div>
            </div>
          </div>
          {/* Điều khoản và điều kiện */}
          {contract.termsAndConditions && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen
                  className="w-5 h-5"
                  style={{ color: MEDICAL_COLORS.primary[500] }}
                />
                <h3
                  className="text-lg font-bold uppercase tracking-wide"
                  style={{ color: MEDICAL_COLORS.primary[700] }}
                >
                  Điều khoản và điều kiện
                </h3>
              </div>
              <div className="prose prose-sm max-w-none">
                <div className="p-4 rounded-lg text-gray-700 leading-relaxed whitespace-pre-wrap bg-gradient-to-br from-[#f9fafb] to-[#f4f5ff] border border-gray-100">
                  {typeof contract.termsAndConditions === "string"
                    ? contract.termsAndConditions
                    : "Không có thông tin"}
                </div>
              </div>
            </div>
          )}
          {/* Phác đồ điều trị */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList
                className="w-5 h-5"
                style={{ color: MEDICAL_COLORS.medical.treatment }}
              />
              <h3
                className="text-lg font-bold uppercase tracking-wide"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Phác đồ điều trị
              </h3>
            </div>
            {contract.treatmentProtocols &&
            contract.treatmentProtocols.length > 0 ? (
              <div className="space-y-8">
                {contract.treatmentProtocols.map((protocol, idx) => (
                  <div
                    key={protocol.treatmentProtocolId || idx}
                    className="border border-blue-100 rounded-xl p-4 bg-gradient-to-br from-[#f4f5ff] to-[#e8ebff] shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Stethoscope
                          className="w-4 h-4"
                          style={{ color: MEDICAL_COLORS.medical.treatment }}
                        />
                        <span
                          className="font-semibold text-base"
                          style={{ color: MEDICAL_COLORS.primary[700] }}
                        >
                          {protocol.protocolName}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-100 text-blue-800 font-semibold">
                          <Calendar className="w-3 h-3" />
                          {formatDate(protocol.startDate)} -{" "}
                          {formatDate(protocol.endDate)}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">
                          <Info className="w-3 h-3" />
                          {protocol.status?.description || "Chưa xác định"}
                        </span>
                      </div>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-semibold">Bác sĩ phụ trách:</span>{" "}
                      {protocol.doctorUser?.userAccount?.fullName ||
                        "Chưa xác định"}{" "}
                      <span className="italic text-gray-500">
                        (
                        {protocol.doctorUser?.specialization
                          ?.specializationName || "Chuyên khoa không rõ"}
                        )
                      </span>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-semibold">
                        Phương pháp điều trị:
                      </span>{" "}
                      {protocol.treatmentMethod?.methodName || "Chưa xác định"}
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-semibold">Ghi chú:</span>{" "}
                      {protocol.notes || "Không"}
                    </div>
                    {/* Steps */}
                    {protocol.protocolSteps &&
                      protocol.protocolSteps.length > 0 && (
                        <div className="mt-2">
                          <div className="font-semibold mb-1 text-gray-700">
                            Các bước thực hiện:
                          </div>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-xs border rounded-lg bg-white">
                              <thead>
                                <tr className="bg-blue-50 text-blue-900">
                                  <th className="px-2 py-1 border">STT</th>
                                  <th className="px-2 py-1 border">Tên bước</th>
                                  <th className="px-2 py-1 border">
                                    Dịch vụ liên quan
                                  </th>
                                  <th className="px-2 py-1 border">
                                    Ngày dự kiến
                                  </th>
                                  <th className="px-2 py-1 border">
                                    Ngày thực tế
                                  </th>
                                  <th className="px-2 py-1 border">
                                    Trạng thái
                                  </th>
                                  <th className="px-2 py-1 border">Ghi chú</th>
                                </tr>
                              </thead>
                              <tbody>
                                {protocol.protocolSteps.map((step, sidx) => (
                                  <tr
                                    key={step.protocolStepId || sidx}
                                    className="even:bg-blue-50"
                                  >
                                    <td className="px-2 py-1 border text-center font-semibold">
                                      {step.stepOrder}
                                    </td>
                                    <td className="px-2 py-1 border font-medium">
                                      {step.stepName}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {step.relatedService?.serviceName || "-"}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {formatDate(step.scheduledDate)}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {formatDate(step.actualDate)}
                                    </td>
                                    <td className="px-2 py-1 border">
                                      <span
                                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                                          step.status?.value === "COMPLETED"
                                            ? "bg-green-100 text-green-800"
                                            : step.status?.value === "PENDING"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                      >
                                        {step.status?.description || "-"}
                                      </span>
                                    </td>
                                    <td className="px-2 py-1 border">
                                      {step.notes || "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic">
                Không có phác đồ điều trị nào.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gradient-to-r from-[#f4f5ff] to-[#fdeee6] border-t border-gray-200 px-8 py-5 rounded-b-3xl z-30 shadow-sm">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors font-bold text-base shadow-sm"
              style={{ minWidth: 120 }}
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
