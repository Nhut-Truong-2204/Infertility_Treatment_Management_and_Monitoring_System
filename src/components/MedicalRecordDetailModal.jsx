import React, { useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  X,
  User,
  Calendar,
  FileText,
  Activity,
  TestTube,
  UserCheck,
  ClipboardList,
  Stethoscope,
  PlusCircle,
  CalendarDays,
  Beaker,
} from "lucide-react";

const MedicalRecordDetailModal = ({ record, isOpen, onClose, loading }) => {
  // Thêm useEffect để xử lý ESC key và prevent body scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Ngăn scroll của body khi modal mở
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Hàm xử lý click overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch {
      return "Ngày không hợp lệ";
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Chưa xác định";
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
    } catch {
      return "Ngày không hợp lệ";
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] scrollable-hidden modal-container transition-all duration-300 transform scale-100 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-accent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-semibold">Chi tiết hồ sơ y tế</h3>
                {record && (
                  <p className="text-white/80">
                    #{record.medicalRecordId} -{" "}
                    {formatDateTime(record.visitDate)}
                  </p>
                )}
              </div>
            </div>
            <div className="z-10">
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto hide-scrollbar"
          style={{ paddingBottom: "80px" }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải chi tiết hồ sơ y tế...</p>
            </div>
          ) : record ? (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Patient Info */}
                  {record.patientProfile && (
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-800">
                          Thông tin bệnh nhân
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-blue-600 font-medium">
                            Họ và tên
                          </label>
                          <p className="font-semibold text-blue-900">
                            {record.patientProfile.fullName}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-blue-600 font-medium">
                            Ngày sinh
                          </label>
                          <p className="font-semibold text-blue-900">
                            {formatDate(record.patientProfile.dateOfBirth)}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-blue-600 font-medium">
                            Giới tính
                          </label>
                          <p className="font-semibold text-blue-900">
                            {record.patientProfile.gender}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-blue-600 font-medium">
                            Số điện thoại
                          </label>
                          <p className="font-semibold text-blue-900">
                            {record.patientProfile.phoneNumber}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm text-blue-600 font-medium">
                            Email
                          </label>
                          <p className="font-semibold text-blue-900">
                            {record.patientProfile.email}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm text-blue-600 font-medium">
                            Địa chỉ
                          </label>
                          <p className="font-semibold text-blue-900">
                            {record.patientProfile.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visit Information */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Thông tin khám bệnh
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 font-medium">
                          Ngày khám
                        </label>
                        <p className="font-semibold text-gray-800">
                          {formatDateTime(record.visitDate)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 font-medium">
                          Triệu chứng
                        </label>
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                          {record.symptoms || "Không có thông tin"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 font-medium">
                          Chẩn đoán
                        </label>
                        <p className="text-gray-800 bg-gray-50 p-3 rounded-lg font-medium">
                          {record.diagnosis || "Chưa có chẩn đoán"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Information */}
                  {record.createdByUser && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <UserCheck className="w-5 h-5 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Bác sĩ khám bệnh
                        </h4>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-purple-800">
                            {record.createdByUser.fullName}
                          </p>
                          <p className="text-purple-600">
                            {record.createdByUser.roleName}
                          </p>
                          {record.createdByUser.email && (
                            <p className="text-sm text-purple-600">
                              {record.createdByUser.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Clinical Examination */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Activity className="w-5 h-5 text-orange-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Khám lâm sàng
                      </h4>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-gray-800">
                        {record.clinicalExamination ||
                          "Không có thông tin khám lâm sàng"}
                      </p>
                    </div>
                  </div>

                  {/* Treatment Plan */}
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <PlusCircle className="w-5 h-5 text-teal-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Kế hoạch điều trị
                      </h4>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <p className="text-gray-800">
                        {record.treatmentPlanNotes ||
                          "Chưa có kế hoạch điều trị"}
                      </p>
                    </div>
                  </div>

                  {/* Follow Up Date */}
                  {record.followUpDate && (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <CalendarDays className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          Lịch tái khám
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        <p className="font-semibold text-indigo-800">
                          {formatDate(record.followUpDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {record.notes && (
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <ClipboardList className="w-5 h-5 text-yellow-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-yellow-800">
                          Ghi chú quan trọng
                        </h4>
                      </div>
                      <p className="text-yellow-800 bg-yellow-100 p-4 rounded-lg">
                        {record.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Lab Tests Section */}
              {record.labTestOrders && record.labTestOrders.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Beaker className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      Xét nghiệm ({record.labTestOrders.length})
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {record.labTestOrders.map((labOrder, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <TestTube className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-800">
                                Đơn xét nghiệm #{index + 1}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {formatDateTime(labOrder.orderDate)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              labOrder.status?.value === "Hoàn thành"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {labOrder.status?.description || "Chưa xác định"}
                          </span>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <label className="text-sm text-gray-600 font-medium">
                              Bác sĩ chỉ định
                            </label>
                            <p className="font-medium text-gray-800">
                              {labOrder.doctorUser?.fullName || "Chưa xác định"}
                            </p>
                          </div>
                          {labOrder.sampleCollectedDate && (
                            <div>
                              <label className="text-sm text-gray-600 font-medium">
                                Ngày lấy mẫu
                              </label>
                              <p className="font-medium text-gray-800">
                                {formatDateTime(labOrder.sampleCollectedDate)}
                              </p>
                            </div>
                          )}
                          {labOrder.notesForLab && (
                            <div>
                              <label className="text-sm text-gray-600 font-medium">
                                Ghi chú
                              </label>
                              <p className="text-gray-800 bg-gray-50 p-2 rounded">
                                {labOrder.notesForLab}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Lab Test Items */}
                        {labOrder.labTestOrderItems &&
                          labOrder.labTestOrderItems.length > 0 && (
                            <div className="border-t border-gray-200 pt-4">
                              <h6 className="font-medium text-gray-800 mb-3">
                                Danh sách xét nghiệm (
                                {labOrder.labTestOrderItems.length}):
                              </h6>
                              <div className="space-y-3">
                                {labOrder.labTestOrderItems.map(
                                  (item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                                    >
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                          <p className="font-medium text-gray-800">
                                            {item.serviceDefinition
                                              ?.serviceName || "Chưa xác định"}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                            Mã:{" "}
                                            {item.serviceDefinition
                                              ?.serviceCode || "N/A"}
                                          </p>
                                          {item.serviceDefinition
                                            ?.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                              {
                                                item.serviceDefinition
                                                  .description
                                              }
                                            </p>
                                          )}
                                          {item.notes && (
                                            <p className="text-sm text-gray-600 mt-1">
                                              <strong>Ghi chú:</strong>{" "}
                                              {item.notes}
                                            </p>
                                          )}
                                        </div>
                                        {item.labTestResult && (
                                          <div className="ml-4 text-right">
                                            <div className="flex items-center gap-1">
                                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                              <span className="text-sm font-medium text-green-600">
                                                Có kết quả
                                              </span>
                                            </div>
                                            {item.labTestResult.resultDate && (
                                              <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(
                                                  item.labTestResult.resultDate
                                                )}
                                              </p>
                                            )}
                                            {item.labTestResult.resultValue && (
                                              <p className="text-sm font-medium text-gray-800 mt-1">
                                                {item.labTestResult.resultValue}{" "}
                                                {item.labTestResult.unit || ""}
                                              </p>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Không có dữ liệu hồ sơ y tế</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetailModal;
