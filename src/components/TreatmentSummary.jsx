import React from "react";
import { Link } from "react-router-dom";

const TreatmentSummary = ({ treatmentData }) => {
  // treatmentData now contains the full treatment protocols list
  const treatmentProtocols = Array.isArray(treatmentData) ? treatmentData : [];

  if (!treatmentProtocols || treatmentProtocols.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-6">
          Phác Đồ Điều Trị
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">
            <i className="fas fa-procedures"></i>
          </div>
          <p className="text-text-color mb-4">Chưa có phác đồ điều trị</p>
          <Link
            to="/customer/treatment-timeline"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Tìm hiểu thêm →
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusColor = (status) => {
    const statusValue =
      status?.status?.toLowerCase() || status?.toLowerCase() || "";
    switch (statusValue) {
      case "active":
      case "đang điều trị":
        return "bg-green-100 text-green-800";
      case "completed":
      case "hoàn thành":
        return "bg-blue-100 text-blue-800";
      case "paused":
      case "tạm dừng":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    const statusValue =
      status?.status?.toLowerCase() || status?.toLowerCase() || "";
    switch (statusValue) {
      case "active":
        return "Đang điều trị";
      case "completed":
        return "Hoàn thành";
      case "paused":
        return "Tạm dừng";
      default:
        return status?.status || status || "Không rõ";
    }
  };

  const calculateProgress = (protocolSteps) => {
    if (!protocolSteps || protocolSteps.length === 0) return 0;

    const completedSteps = protocolSteps.filter(
      (step) =>
        step.status?.value?.toLowerCase().includes("hoàn thành") ||
        step.status?.value?.toLowerCase().includes("completed")
    ).length;

    return Math.round((completedSteps / protocolSteps.length) * 100);
  };

  // Show up to 3 most recent/active protocols
  const displayProtocols = treatmentProtocols.slice(0, 3);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">
          Phác Đồ Điều Trị ({treatmentProtocols.length})
        </h2>
        <Link
          to="/customer/treatment-timeline"
          className="text-primary hover:text-primary/80 transition-colors text-sm"
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="space-y-4">
        {displayProtocols.map((protocol) => (
          <div
            key={protocol.treatmentProtocolId}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-procedures text-white text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-primary">
                    {protocol.protocolName || "Phác đồ điều trị"}
                  </h3>
                  <p className="text-sm text-text-color">
                    Bác sĩ:{" "}
                    {protocol.doctorUser?.userAccount?.fullName ||
                      "Chưa xác định"}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  protocol.status
                )}`}
              >
                {getStatusText(protocol.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-text-color">Ngày bắt đầu</p>
                <p className="font-medium">{formatDate(protocol.startDate)}</p>
              </div>
              <div>
                <p className="text-xs text-text-color">Phương pháp</p>
                <p className="font-medium">
                  {protocol.treatmentMethod?.methodName || "Chưa xác định"}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            {protocol.protocolSteps && protocol.protocolSteps.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-color">Tiến độ</span>
                  <span className="text-sm font-medium text-primary">
                    {calculateProgress(protocol.protocolSteps)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${calculateProgress(protocol.protocolSteps)}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {treatmentProtocols.length > 3 && (
        <div className="mt-4 text-center">
          <Link
            to="/customer/treatment-timeline"
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            Xem thêm {treatmentProtocols.length - 3} phác đồ khác
          </Link>
        </div>
      )}
    </div>
  );
};

export default TreatmentSummary;
