import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Activity,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  Pill,
  Heart,
  TrendingUp,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  BarChart3,
} from "lucide-react";
import instance from "../../config/axios";
const TreatmentHistory = () => {
  const [treatmentData, setTreatmentData] = useState({
    protocols: [],
    visits: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState(new Set());

  //api
  useEffect(() => {
    const fetchTreatmentHistory = async () => {
      try {
        setLoading(true);

        const response = await instance.get("/api/customer/treatment-history");

        if (response.data?.success) {
          const { protocols, visits } = response.data.data;
          setTreatmentData({ protocols, visits });
        } else {
          setError(
            response.data?.message || "Không thể lấy dữ liệu từ máy chủ"
          );
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu lịch sử điều trị");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentHistory();
  }, []);

  const toggleExpanded = (type, id) => {
    const key = `${type}-${id}`;
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200";
      case "completed":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200";
      case "paused":
        return "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PlayCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "paused":
        return <PauseCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredData = () => {
    let protocols = treatmentData.protocols;
    let visits = treatmentData.visits;

    if (searchTerm) {
      protocols = protocols.filter(
        (p) =>
          p.protocolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.status.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      visits = visits.filter(
        (v) =>
          v.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return { protocols, visits };
  };

  const getStats = () => {
    const { protocols, visits } = treatmentData;
    return {
      totalProtocols: protocols.length,
      activeProtocols: protocols.filter((p) => p.status.status === "active")
        .length,
      completedProtocols: protocols.filter(
        (p) => p.status.status === "completed"
      ).length,
      totalVisits: visits.length,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="animate-pulse space-y-8">
              <div className="space-y-4">
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl w-1/2"></div>
                <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl w-3/4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 h-32"
                  ></div>
                ))}
              </div>

              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl h-24"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center py-16">
              <div className="relative">
                <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-6 animate-pulse" />
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Có lỗi xảy ra
              </h3>
              <p className="text-gray-600 text-lg">{error}</p>
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const data = filteredData();
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 md:p-6 ">
      <div className="max-w-7xl mx-auto space-y-8 mt-20">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Lịch Sử Điều Trị
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-20"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Theo dõi toàn bộ quá trình điều trị và lịch sử khám bệnh của bạn
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng phác đồ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProtocols}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Đang điều trị</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeProtocols}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedProtocols}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lượt khám</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalVisits}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {["all", "protocols", "visits"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "bg-white/50 text-gray-600 hover:bg-white/80"
                  }`}
                >
                  {tab === "all"
                    ? "Tất cả"
                    : tab === "protocols"
                    ? "Phác đồ"
                    : "Lịch khám"}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full md:w-80 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/80 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Treatment Protocols */}
        {(activeTab === "all" || activeTab === "protocols") && (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-3">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                Phác Đồ Điều Trị
              </h2>
            </div>

            <div className="p-8 space-y-6">
              {data.protocols.map((protocol, index) => (
                <div
                  key={protocol.treatmentProtocolId}
                  className="group bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() =>
                          toggleExpanded(
                            "protocol",
                            protocol.treatmentProtocolId
                          )
                        }
                      >
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(protocol.status.status)}
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {protocol.protocolName}
                            </h3>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                              protocol.status.status
                            )} backdrop-blur-sm`}
                          >
                            {protocol.status.description}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 space-x-6">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Bắt đầu: {formatDate(protocol.startDate)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          toggleExpanded(
                            "protocol",
                            protocol.treatmentProtocolId
                          )
                        }
                        className="p-2 rounded-xl hover:bg-white/50 transition-colors"
                      >
                        {expandedItems.has(
                          `protocol-${protocol.treatmentProtocolId}`
                        ) ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedItems.has(
                    `protocol-${protocol.treatmentProtocolId}`
                  ) && (
                    <div className="px-6 pb-6 border-t border-white/20 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                      <div className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="p-4 bg-white/60 rounded-xl">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                Thông tin chi tiết
                              </h4>
                              <p className="text-gray-600">
                                Phác đồ điều trị được thiết kế riêng cho tình
                                trạng sức khỏe của bạn
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 bg-white/60 rounded-xl">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                                Tiến độ điều trị
                              </h4>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{
                                    width:
                                      protocol.status.status === "completed"
                                        ? "100%"
                                        : protocol.status.status === "PLANNED"
                                        ? "30%"
                                        : "65%",
                                  }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-600 mt-2">
                                {protocol.status.status === "completed"
                                  ? "100%"
                                  : protocol.status.status === "active"
                                  ? "65%"
                                  : "30%"}{" "}
                                hoàn thành
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visit History */}
        {(activeTab === "all" || activeTab === "visits") && (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-green-500/10 to-cyan-500/10">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="p-2 bg-gradient-to-br from-green-500 to-cyan-600 rounded-xl mr-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                Lịch Sử Khám Bệnh
              </h2>
            </div>

            <div className="p-8 space-y-6">
              {data.visits.map((visit, index) => (
                <div
                  key={visit.medicalRecordId}
                  className="group bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() =>
                          toggleExpanded("visit", visit.medicalRecordId)
                        }
                      >
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="p-2 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg">
                            <Stethoscope className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                              {visit.diagnosis}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              {visit.symptoms}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {visit.doctorName}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDateTime(visit.visitDate)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          toggleExpanded("visit", visit.medicalRecordId)
                        }
                        className="p-2 rounded-xl hover:bg-white/50 transition-colors"
                      >
                        {expandedItems.has(`visit-${visit.medicalRecordId}`) ? (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedItems.has(`visit-${visit.medicalRecordId}`) && (
                    <div className="px-6 pb-6 border-t border-white/20 bg-gradient-to-r from-green-50/50 to-cyan-50/50">
                      <div className="pt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-white/60 rounded-xl">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                              Triệu chứng
                            </h4>
                            <p className="text-gray-600">{visit.symptoms}</p>
                          </div>

                          <div className="p-4 bg-white/60 rounded-xl">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Stethoscope className="h-4 w-4 mr-2 text-green-500" />
                              Chẩn đoán
                            </h4>
                            <p className="text-gray-600">{visit.diagnosis}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-white/60 rounded-xl">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <User className="h-4 w-4 mr-2 text-purple-500" />
                            Bác sĩ điều trị
                          </h4>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {visit.doctorName}
                              </p>
                              <p className="text-sm text-gray-600">
                                Bác sĩ điều trị
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TreatmentHistory;
