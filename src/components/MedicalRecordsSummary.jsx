import React from "react";
import {
  FileText,
  Calendar,
  User,
  Activity,
  TestTube,
  TrendingUp,
} from "lucide-react";

const MedicalRecordsSummary = ({ records }) => {
  if (!records || records.length === 0) {
    return null;
  }

  // Tính toán thống kê
  const totalRecords = records.length;
  const totalLabTests = records.reduce(
    (sum, record) => sum + (record.labTestOrders?.length || 0),
    0
  );

  const recentRecord = records.sort(
    (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
  )[0];

  const completedLabTests = records.reduce((sum, record) => {
    return (
      sum +
      (record.labTestOrders?.filter(
        (order) => order.status?.value === "RESULTS_AVAILABLE"
      ).length || 0)
    );
  }, 0);

  const stats = [
    {
      icon: FileText,
      label: "Tổng hồ sơ",
      value: totalRecords,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      textColor: "text-blue-800",
    },
    {
      icon: TestTube,
      label: "Xét nghiệm",
      value: totalLabTests,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      textColor: "text-green-800",
    },
    {
      icon: Activity,
      label: "Đã hoàn thành",
      value: completedLabTests,
      color: "purple",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      textColor: "text-purple-800",
    },
    {
      icon: TrendingUp,
      label: "Tỷ lệ hoàn thành",
      value:
        totalLabTests > 0
          ? `${Math.round((completedLabTests / totalLabTests) * 100)}%`
          : "0%",
      color: "orange",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      textColor: "text-orange-800",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary rounded-lg">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Tổng quan hồ sơ y tế
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} p-4 rounded-xl border border-${stat.color}-200`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Record Info */}
      {recentRecord && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">Lần khám gần nhất</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Ngày khám:</span>
              <p className="font-medium text-gray-800">
                {new Date(recentRecord.visitDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Chẩn đoán:</span>
              <p className="font-medium text-gray-800">
                {recentRecord.diagnosis || "Chưa có chẩn đoán"}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Bác sĩ:</span>
              <p className="font-medium text-gray-800">
                {recentRecord.createdByUser?.fullName || "Chưa xác định"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsSummary;
