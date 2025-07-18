import React, { useState } from "react";
import { useTreatmentTimeline } from "../../hooks/useTreatmentTimeline";
import {
  Loading,
  MedicalStatusBadge,
  MedicalEmptyState,
  MedicalAlert,
  MedicalCard,
  Button,
} from "../../components/ui";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const TreatmentTimeline = () => {
  const { treatmentProtocols, loading, error, refetch } =
    useTreatmentTimeline();
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch {
      return "Ngày không hợp lệ";
    }
  };

  const getStepStatusIcon = (status) => {
    const statusValue = status?.value?.toLowerCase() || "";
    if (
      statusValue.includes("hoàn thành") ||
      statusValue.includes("completed")
    ) {
      return "fas fa-check-circle text-green-600";
    }
    if (
      statusValue.includes("đang tiến hành") ||
      statusValue.includes("in_progress")
    ) {
      return "fas fa-clock text-blue-600";
    }
    if (statusValue.includes("chờ") || statusValue.includes("pending")) {
      return "far fa-clock text-yellow-600";
    }
    return "far fa-circle text-gray-400";
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 font-onest">
        <Loading
          variant="accent"
          size="large"
          text="Đang tải phác đồ điều trị..."
          subText="Vui lòng đợi trong giây lát"
          fullScreen
          type="treatment"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 font-onest flex items-center justify-center">
        <MedicalCard className="max-w-lg w-full mx-auto">
          <MedicalCard.Content>
            <MedicalAlert
              type="error"
              title="Có lỗi xảy ra"
              message={error}
              className="mb-6"
            />
            <div className="flex justify-center">
              <Button onClick={refetch} variant="default">
                Thử lại
              </Button>
            </div>
          </MedicalCard.Content>
        </MedicalCard>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-onest">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <i className="fas fa-procedures text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Phác đồ điều trị
              </h1>
              <p className="text-text-color">
                Theo dõi tiến trình và lịch sử điều trị của bạn
              </p>
            </div>
          </div>
        </div>
        {/* Treatment Protocols List */}
        {treatmentProtocols.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-medical text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Chưa có phác đồ điều trị
            </h3>
            <p className="text-text-color">
              Bạn chưa có phác đồ điều trị nào. Vui lòng liên hệ với bác sĩ để
              được tư vấn.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Protocols List */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">
                Danh sách phác đồ điều trị
              </h2>

              {treatmentProtocols.map((protocol) => (
                <div
                  key={protocol.treatmentProtocolId}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                    selectedProtocol?.treatmentProtocolId ===
                    protocol.treatmentProtocolId
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedProtocol(protocol)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {protocol.protocolName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-text-color mb-3">
                        <span className="flex items-center gap-1">
                          <i className="fas fa-calendar-alt"></i>
                          {formatDate(protocol.startDate)} -{" "}
                          {formatDate(protocol.endDate)}
                        </span>
                      </div>
                    </div>
                    <MedicalStatusBadge
                      status={protocol.status?.description}
                      variant="default"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <i className="fas fa-user-md text-white"></i>
                    </div>
                    <div>
                      <p className="font-medium text-primary">
                        {protocol.doctorUser?.userAccount?.fullName ||
                          "Chưa xác định"}
                      </p>
                      <p className="text-sm text-text-color">
                        {protocol.doctorUser?.specialization
                          ?.specializationName || "Bác sĩ"}
                      </p>
                    </div>
                  </div>

                  {/* Treatment Method */}
                  <div className="mb-4">
                    <p className="text-sm text-text-color mb-1">
                      Phương pháp điều trị:
                    </p>
                    <p className="font-medium text-primary">
                      {protocol.treatmentMethod?.methodName || "Chưa xác định"}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-color">Tiến độ</span>
                      <span className="text-sm font-medium text-primary">
                        {protocol.protocolSteps?.filter(
                          (step) =>
                            step.status?.value
                              ?.toLowerCase()
                              .includes("hoàn thành") ||
                            step.status?.value
                              ?.toLowerCase()
                              .includes("completed")
                        ).length || 0}{" "}
                        / {protocol.protocolSteps?.length || 0} bước
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            protocol.protocolSteps?.length > 0
                              ? (protocol.protocolSteps.filter(
                                  (step) =>
                                    step.status?.value
                                      ?.toLowerCase()
                                      .includes("hoàn thành") ||
                                    step.status?.value
                                      ?.toLowerCase()
                                      .includes("completed")
                                ).length /
                                  protocol.protocolSteps.length) *
                                100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {protocol.notes && (
                    <div className="text-sm text-text-color">
                      <strong>Ghi chú:</strong> {protocol.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Timeline Detail */}
            <div className="lg:sticky lg:top-8">
              {selectedProtocol ? (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-6">
                    Timeline điều trị: {selectedProtocol.protocolName}
                  </h3>

                  {selectedProtocol.protocolSteps?.length > 0 ? (
                    <div className="space-y-4">
                      {selectedProtocol.protocolSteps
                        .sort((a, b) => a.stepOrder - b.stepOrder)
                        .map((step, index) => (
                          <div key={step.protocolStepId} className="relative">
                            {/* Timeline connector */}
                            {index <
                              selectedProtocol.protocolSteps.length - 1 && (
                              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                            )}

                            <div className="flex gap-4">
                              {/* Step icon */}
                              <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                                <i
                                  className={getStepStatusIcon(step.status)}
                                ></i>
                              </div>

                              {/* Step content */}
                              <div className="flex-1 pb-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-primary">
                                      Bước {step.stepOrder}: {step.stepName}
                                    </h4>
                                    <MedicalStatusBadge
                                      status={step.status?.description}
                                      variant="step"
                                    />
                                  </div>

                                  {step.description && (
                                    <p className="text-sm text-text-color mb-3">
                                      {step.description}
                                    </p>
                                  )}

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="text-text-color">
                                        Ngày dự kiến:
                                      </span>
                                      <p className="font-medium">
                                        {formatDate(step.scheduledDate)}
                                      </p>
                                    </div>
                                    {step.actualDate && (
                                      <div>
                                        <span className="text-text-color">
                                          Ngày thực hiện:
                                        </span>
                                        <p className="font-medium">
                                          {formatDate(step.actualDate)}
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {step.relatedService && (
                                    <div className="mt-3 p-3 bg-white rounded-lg border">
                                      <p className="text-sm font-medium text-primary">
                                        Dịch vụ liên quan:{" "}
                                        {step.relatedService.serviceName}
                                      </p>
                                      {step.relatedService.description && (
                                        <p className="text-xs text-text-color mt-1">
                                          {step.relatedService.description}
                                        </p>
                                      )}
                                    </div>
                                  )}

                                  {step.notes && (
                                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                      <p className="text-sm text-yellow-800">
                                        <strong>Ghi chú:</strong> {step.notes}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-list text-gray-400"></i>
                      </div>
                      <p className="text-text-color">
                        Phác đồ này chưa có các bước điều trị chi tiết
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-hand-pointer text-gray-400 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Chọn phác đồ điều trị
                  </h3>
                  <p className="text-text-color">
                    Nhấp vào một phác đồ điều trị bên trái để xem timeline chi
                    tiết
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentTimeline;
