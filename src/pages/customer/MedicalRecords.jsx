import React, { useState, useEffect } from "react";
import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import MedicalRecordDetailModal from "../../components/MedicalRecordDetailModal";
import MedicalRecordsSummary from "../../components/MedicalRecordsSummary";
import {
  MedicalLoading,
  MedicalStatusBadge,
  MedicalEmptyState,
  MedicalAlert,
  MedicalCard,
  Button,
} from "../../components/ui";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  FileText,
  Calendar,
  User,
  Stethoscope,
  TestTube,
  Eye,
  RefreshCw,
  AlertCircle,
  FileX,
  ChevronRight,
  ClipboardList,
  Activity,
  PlusCircle,
  CalendarDays,
  UserCheck,
} from "lucide-react";

const MedicalRecords = () => {
  const {
    medicalRecords,
    selectedRecord,
    loading,
    error,
    fetchMedicalRecords,
    selectRecord,
    clearSelectedRecord,
    refetch,
  } = useMedicalRecords();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [expandedRecords, setExpandedRecords] = useState(new Set());

  useEffect(() => {
    fetchMedicalRecords();
  }, [fetchMedicalRecords]);

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

  const handleViewDetail = (record) => {
    selectRecord(record);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    clearSelectedRecord();
  };

  const toggleExpandRecord = (recordId) => {
    const newExpanded = new Set(expandedRecords);
    if (newExpanded.has(recordId)) {
      newExpanded.delete(recordId);
    } else {
      newExpanded.add(recordId);
    }
    setExpandedRecords(newExpanded);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <MedicalLoading
          variant="professional"
          size="large"
          text="Đang tải hồ sơ y tế..."
          subText="Vui lòng đợi trong giây lát"
          fullScreen
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <MedicalAlert
            type="error"
            title="Có lỗi xảy ra khi tải hồ sơ y tế"
            message={error}
            size="large"
          >
            <div className="mt-4">
              <Button
                variant="medical"
                onClick={handleRefresh}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
            </div>
          </MedicalAlert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary rounded-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Hồ sơ y tế</h1>
                <p className="text-gray-600">
                  Xem và quản lý thông tin y tế của bạn
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Làm mới</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {medicalRecords.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileX className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Chưa có hồ sơ y tế nào
            </h3>
            <p className="text-gray-500">
              Bạn chưa có hồ sơ y tế nào được ghi nhận trong hệ thống.
            </p>
          </div>
        ) : (
          <>
            {/* Summary Section */}
            <MedicalRecordsSummary records={medicalRecords} />

            {/* Records List */}
            <div className="space-y-6">
              {medicalRecords.map((record) => (
                <div
                  key={record.medicalRecordId}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                >
                  {/* Record Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              Hồ sơ khám #{record.medicalRecordId}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDateTime(record.visitDate)}
                            </p>
                          </div>
                        </div>

                        {/* Patient Info */}
                        {record.patientProfile && (
                          <div className="bg-blue-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-blue-800">
                                Thông tin bệnh nhân
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-600">Họ tên:</span>
                                <p className="font-medium">
                                  {record.patientProfile.fullName}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  Ngày sinh:
                                </span>
                                <p className="font-medium">
                                  {formatDate(
                                    record.patientProfile.dateOfBirth
                                  )}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  Giới tính:
                                </span>
                                <p className="font-medium">
                                  {record.patientProfile.gender}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">
                                  Điện thoại:
                                </span>
                                <p className="font-medium">
                                  {record.patientProfile.phoneNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-gray-600 text-sm">
                              Triệu chứng:
                            </span>
                            <p className="font-medium text-gray-800">
                              {record.symptoms || "Không có thông tin"}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">
                              Chẩn đoán:
                            </span>
                            <p className="font-medium text-gray-800">
                              {record.diagnosis || "Chưa có chẩn đoán"}
                            </p>
                          </div>
                        </div>

                        {/* Doctor Info */}
                        {record.createdByUser && (
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <div className="p-2 bg-green-100 rounded-full">
                              <UserCheck className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-green-800">
                                {record.createdByUser.fullName}
                              </p>
                              <p className="text-sm text-green-600">
                                {record.createdByUser.roleName}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(record)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors gap-1"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                          Chi tiết
                        </button>
                        <button
                          onClick={() =>
                            toggleExpandRecord(record.medicalRecordId)
                          }
                          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <ChevronRight
                            className={`w-5 h-5 transform transition-transform ${
                              expandedRecords.has(record.medicalRecordId)
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedRecords.has(record.medicalRecordId) && (
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Clinical Examination */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-5 h-5 text-purple-600" />
                            <h4 className="font-semibold text-gray-800">
                              Khám lâm sàng
                            </h4>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-800">
                              {record.clinicalExamination ||
                                "Không có thông tin khám lâm sàng"}
                            </p>
                          </div>

                          {/* Treatment Plan */}
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                              <PlusCircle className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-gray-800">
                                Kế hoạch điều trị
                              </span>
                            </div>
                            <p className="text-gray-800">
                              {record.treatmentPlanNotes ||
                                "Chưa có kế hoạch điều trị"}
                            </p>
                          </div>

                          {/* Follow Up */}
                          {record.followUpDate && (
                            <div className="bg-white p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <CalendarDays className="w-4 h-4 text-orange-600" />
                                <span className="font-medium text-gray-800">
                                  Tái khám
                                </span>
                              </div>
                              <p className="text-gray-800">
                                {formatDate(record.followUpDate)}
                              </p>
                            </div>
                          )}

                          {/* Notes */}
                          {record.notes && (
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                              <h5 className="font-medium text-yellow-800 mb-2">
                                Ghi chú
                              </h5>
                              <p className="text-yellow-700">{record.notes}</p>
                            </div>
                          )}
                        </div>

                        {/* Lab Tests */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Flask className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-800">
                              Xét nghiệm ({record.labTestOrders?.length || 0})
                            </h4>
                          </div>

                          {record.labTestOrders &&
                          record.labTestOrders.length > 0 ? (
                            <div className="space-y-3">
                              {record.labTestOrders.map((labOrder, index) => (
                                <div
                                  key={index}
                                  className="bg-white p-4 rounded-lg border"
                                >
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <TestTube className="w-4 h-4 text-blue-600" />
                                      <span className="font-medium text-gray-800">
                                        Đơn xét nghiệm #{index + 1}
                                      </span>
                                    </div>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        labOrder.status?.value === "Hoàn thành"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {labOrder.status?.description ||
                                        "Chưa xác định"}
                                    </span>
                                  </div>

                                  <div className="text-sm space-y-2">
                                    <div>
                                      <span className="text-gray-600">
                                        Bác sĩ chỉ định:
                                      </span>
                                      <p className="font-medium">
                                        {labOrder.doctorUser?.fullName ||
                                          "Chưa xác định"}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="text-gray-600">
                                        Ngày chỉ định:
                                      </span>
                                      <p className="font-medium">
                                        {formatDateTime(labOrder.orderDate)}
                                      </p>
                                    </div>
                                    {labOrder.sampleCollectedDate && (
                                      <div>
                                        <span className="text-gray-600">
                                          Ngày lấy mẫu:
                                        </span>
                                        <p className="font-medium">
                                          {formatDateTime(
                                            labOrder.sampleCollectedDate
                                          )}
                                        </p>
                                      </div>
                                    )}
                                    {labOrder.notesForLab && (
                                      <div>
                                        <span className="text-gray-600">
                                          Ghi chú:
                                        </span>
                                        <p className="font-medium">
                                          {labOrder.notesForLab}
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Lab Test Items */}
                                  {labOrder.labTestOrderItems &&
                                    labOrder.labTestOrderItems.length > 0 && (
                                      <div className="mt-3 pt-3 border-t border-gray-200">
                                        <h6 className="font-medium text-gray-800 mb-2">
                                          Danh sách xét nghiệm:
                                        </h6>
                                        <div className="space-y-2">
                                          {labOrder.labTestOrderItems.map(
                                            (item, itemIndex) => (
                                              <div
                                                key={itemIndex}
                                                className="bg-gray-50 p-3 rounded text-sm"
                                              >
                                                <div className="flex justify-between items-start">
                                                  <div>
                                                    <p className="font-medium">
                                                      {item.serviceDefinition
                                                        ?.serviceName ||
                                                        "Chưa xác định"}
                                                    </p>
                                                    <p className="text-gray-600">
                                                      {item.serviceDefinition
                                                        ?.serviceCode || ""}
                                                    </p>
                                                    {item.notes && (
                                                      <p className="text-gray-600 mt-1">
                                                        Ghi chú: {item.notes}
                                                      </p>
                                                    )}
                                                  </div>
                                                  {item.labTestResult && (
                                                    <div className="text-right">
                                                      <p className="font-medium text-green-600">
                                                        Có kết quả
                                                      </p>
                                                      {item.labTestResult
                                                        .resultDate && (
                                                        <p className="text-xs text-gray-500">
                                                          {formatDate(
                                                            item.labTestResult
                                                              .resultDate
                                                          )}
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
                          ) : (
                            <div className="bg-white p-6 rounded-lg text-center">
                              <TestTube className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">
                                Chưa có xét nghiệm nào
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      <MedicalRecordDetailModal
        record={selectedRecord}
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        loading={false}
      />
    </div>
  );
};

export default MedicalRecords;
