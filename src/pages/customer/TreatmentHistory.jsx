import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  PlayCircle,
  Award,
  Phone,
  Mail,
  GraduationCap,
  Stethoscope,
  DollarSign,
  Timer,
  ChevronRight,
  Activity,
  Sparkles,
  Heart,
} from "lucide-react";
import instance from "@/config/axios";
import { MinimalLoading, PulseLoading } from "@/components/layout/Loading";
const TreatmentHistoryTimeline = () => {
  const [treatmentData, setTreatmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  // Enhanced mock data with more realistic medical information
  useEffect(() => {
    const fetchTreatmentTimeline = async () => {
      try {
        const response = await instance.get(
          "/api/treatment-protocols/my-timeline"
        );

        if (response.data?.success) {
          const data = response.data.data;

          if (Array.isArray(data) && data.length > 0) {
            setTreatmentData(data);
            setSelectedProtocol(data[0]);
            setTimeout(() => setAnimateIn(true), 100);
          } else {
            setError("Không có dữ liệu điều trị.");
          }
        } else {
          setError("Không thể tải dữ liệu điều trị.");
        }
      } catch (err) {
        console.error("Lỗi API:", err);
        setError("Không thể tải dữ liệu điều trị. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentTimeline();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "IN_PROGRESS":
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />;
      case "PLANNED":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100";
      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100";
      case "PLANNED":
        return "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200 shadow-red-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 shadow-slate-100";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa thực hiện";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading) {
    return <PulseLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Có lỗi xảy ra
          </h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 md:p-6 ">
      <div className="max-w-7xl mx-auto space-y-8 mt-30 mb-100">
        {/* Header */}

        {/* Stats Cards */}

        <div className="relative z-10 p-6 ">
          <div className="max-w-7xl mx-auto mt-20">
            {/* Header with animations */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-200 ${
                animateIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                  Lịch sử Điều trị
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  Theo dõi chi tiết tiến trình điều trị và lịch sử khám bệnh của
                  bạn với giao diện trực quan và thông tin chuyên nghiệp
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Treatment Protocols List */}
              <div
                className={`xl:col-span-4 transform transition-all duration-1000 delay-300 ${
                  animateIn
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          Liệu trình Điều trị
                        </h2>
                        <p className="text-blue-100 text-sm">
                          Chọn để xem chi tiết
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {treatmentData.map((protocol, index) => (
                        <div
                          key={protocol.treatmentProtocolId}
                          className={`group relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform ${
                            selectedProtocol?.treatmentProtocolId ===
                            protocol.treatmentProtocolId
                              ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-100"
                              : "border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50"
                          }`}
                          onClick={() => setSelectedProtocol(protocol)}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-slate-800 text-sm leading-tight pr-2">
                              {protocol.protocolName}
                            </h3>
                            <div className="flex-shrink-0">
                              {getStatusIcon(protocol.status.status)}
                            </div>
                          </div>

                          <div className="space-y-2 text-xs text-slate-600 mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-2 text-slate-400" />
                              <span>
                                {formatDate(protocol.startDate)} →{" "}
                                {formatDate(protocol.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-2 text-slate-400" />
                              <span className="truncate">
                                {protocol.doctorUser.userAccount.fullName}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Stethoscope className="w-3 h-3 mr-2 text-slate-400" />
                              <span className="truncate">
                                {
                                  protocol.doctorUser.specialization
                                    .specializationName
                                }
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${getStatusColor(
                                protocol.status.status
                              )}`}
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              {protocol.status.description}
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                selectedProtocol?.treatmentProtocolId ===
                                protocol.treatmentProtocolId
                                  ? "rotate-90"
                                  : "group-hover:translate-x-1"
                              }`}
                            />
                          </div>

                          {/* Animated border */}
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 ${
                              selectedProtocol?.treatmentProtocolId ===
                              protocol.treatmentProtocolId
                                ? "opacity-20"
                                : ""
                            }`}
                            style={{ zIndex: -1 }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Protocol Details */}
              <div
                className={`xl:col-span-8 transform transition-all duration-1000 delay-500 ${
                  animateIn
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                {selectedProtocol && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                            {selectedProtocol.protocolName}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-indigo-100">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                {formatDate(selectedProtocol.startDate)} →{" "}
                                {formatDate(selectedProtocol.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Activity className="w-4 h-4 mr-2" />
                              <span>
                                {selectedProtocol.protocolSteps.length} bước
                                điều trị
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                            {getStatusIcon(selectedProtocol.status.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      {/* Doctor Information */}
                      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 mb-8 border border-slate-200">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          Bác sĩ điều trị
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="flex items-start">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                              <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-slate-800 text-lg">
                                {
                                  selectedProtocol.doctorUser.userAccount
                                    .fullName
                                }
                              </h4>
                              <p className="text-blue-600 font-semibold">
                                {
                                  selectedProtocol.doctorUser.specialization
                                    .specializationName
                                }
                              </p>
                              <p className="text-slate-600 text-sm mt-1">
                                {selectedProtocol.doctorUser.shortBio}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center text-sm">
                              <GraduationCap className="w-4 h-4 text-slate-500 mr-3" />
                              <span className="text-slate-700">
                                {selectedProtocol.doctorUser.qualifications}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Award className="w-4 h-4 text-slate-500 mr-3" />
                              <span className="text-slate-700">
                                {selectedProtocol.doctorUser.experienceYears}{" "}
                                năm kinh nghiệm
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="w-4 h-4 text-slate-500 mr-3" />
                              <span className="text-slate-700">
                                {
                                  selectedProtocol.doctorUser.userAccount
                                    .phoneNumber
                                }
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Mail className="w-4 h-4 text-slate-500 mr-3" />
                              <span className="text-slate-700 truncate">
                                {selectedProtocol.doctorUser.userAccount.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Treatment Method */}
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-200">
                        <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                            <Stethoscope className="w-4 h-4 text-white" />
                          </div>
                          Phương pháp điều trị
                        </h3>
                        <div className="bg-white rounded-xl p-4 border border-emerald-100">
                          <h4 className="font-bold text-emerald-800 text-lg mb-2">
                            {selectedProtocol.treatmentMethod.methodName}
                          </h4>
                          <p className="text-slate-700">
                            {selectedProtocol.treatmentMethod.description}
                          </p>
                        </div>
                      </div>

                      {/* Treatment Notes */}
                      {selectedProtocol.notes && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-200">
                          <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            Ghi chú điều trị
                          </h3>
                          <div className="bg-white rounded-xl p-4 border border-amber-100">
                            <p className="text-slate-700 leading-relaxed">
                              {selectedProtocol.notes}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Treatment Steps Timeline */}
                      <div className="mb-8">
                        <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <PlayCircle className="w-4 h-4 text-white" />
                          </div>
                          Tiến trình điều trị chi tiết
                        </h3>

                        <div className="relative">
                          {/* Timeline Line */}
                          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-indigo-300"></div>

                          <div className="space-y-8">
                            {selectedProtocol.protocolSteps
                              .sort((a, b) => a.stepOrder - b.stepOrder)
                              .map((step, index) => (
                                <div
                                  key={step.protocolStepId}
                                  className="relative flex items-start group"
                                >
                                  {/* Timeline Node */}
                                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-blue-200 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <div
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                        getStatusColor(step.status.value).split(
                                          " "
                                        )[0]
                                      } ${
                                        step.status.value === "IN_PROGRESS"
                                          ? "animate-pulse"
                                          : ""
                                      }`}
                                    >
                                      {getStatusIcon(step.status.value)}
                                    </div>
                                  </div>

                                  {/* Step Content */}
                                  <div className="ml-8 flex-1">
                                    <div
                                      className={`bg-white rounded-2xl shadow-lg border-2 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${
                                        step.status.value === "IN_PROGRESS"
                                          ? "border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50"
                                          : "border-slate-200 hover:border-blue-300"
                                      }`}
                                    >
                                      {/* Step Header */}
                                      <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                          <div className="flex items-center mb-2">
                                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full mr-3">
                                              Bước {step.stepOrder}
                                            </span>
                                            <span
                                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                step.status.value
                                              )}`}
                                            >
                                              {step.status.description}
                                            </span>
                                          </div>
                                          <h4 className="text-xl font-bold text-slate-800 mb-2">
                                            {step.stepName}
                                          </h4>
                                          <p className="text-slate-600 leading-relaxed">
                                            {step.description}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Step Details Grid */}
                                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                                        <div className="space-y-3">
                                          <div className="flex items-center text-sm">
                                            <Calendar className="w-4 h-4 text-slate-500 mr-3" />
                                            <div>
                                              <span className="text-slate-500">
                                                Lên lịch:
                                              </span>
                                              <span className="ml-2 font-semibold text-slate-700">
                                                {formatDate(step.scheduledDate)}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex items-center text-sm">
                                            <CheckCircle className="w-4 h-4 text-slate-500 mr-3" />
                                            <div>
                                              <span className="text-slate-500">
                                                Thực hiện:
                                              </span>
                                              <span className="ml-2 font-semibold text-slate-700">
                                                {formatDate(step.actualDate)}
                                              </span>
                                            </div>
                                          </div>
                                          {step.relatedService && (
                                            <div className="flex items-center text-sm">
                                              <Timer className="w-4 h-4 text-slate-500 mr-3" />
                                              <div>
                                                <span className="text-slate-500">
                                                  Thời gian:
                                                </span>
                                                <span className="ml-2 font-semibold text-slate-700">
                                                  {
                                                    step.relatedService
                                                      .durationMinutes
                                                  }{" "}
                                                  phút
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                        {step.relatedService && (
                                          <div className="space-y-3">
                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                              <h5 className="font-semibold text-slate-800 mb-2 flex items-center">
                                                <Stethoscope className="w-4 h-4 mr-2 text-blue-500" />
                                                Dịch vụ liên quan
                                              </h5>
                                              <p className="text-slate-700 text-sm mb-2">
                                                {
                                                  step.relatedService
                                                    .serviceName
                                                }
                                              </p>
                                              <div className="flex items-center justify-between">
                                                <span className="text-slate-500 text-xs">
                                                  Chi phí:
                                                </span>
                                                <span className="font-bold text-green-600 flex items-center">
                                                  <DollarSign className="w-4 h-4 mr-1" />
                                                  {formatCurrency(
                                                    step.relatedService.price
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Step Notes */}
                                      {step.notes && (
                                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
                                          <h5 className="font-semibold text-slate-800 mb-2 flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-purple-500" />
                                            Ghi chú bác sĩ
                                          </h5>
                                          <p className="text-slate-700 text-sm leading-relaxed italic">
                                            "{step.notes}"
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      {/* Treatment Summary */}
                      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-200">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                            <Activity className="w-4 h-4 text-white" />
                          </div>
                          Tổng quan liệu trình
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="bg-white rounded-xl p-4 border border-indigo-100 text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <CheckCircle className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="text-2xl font-bold text-emerald-600 mb-1">
                              {
                                selectedProtocol.protocolSteps.filter(
                                  (step) => step.status.value === "COMPLETED"
                                ).length
                              }
                            </div>
                            <div className="text-slate-600 text-sm">
                              Bước hoàn thành
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 border border-indigo-100 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <Activity className="w-6 h-6 text-blue-600 animate-pulse" />
                            </div>
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              {
                                selectedProtocol.protocolSteps.filter(
                                  (step) => step.status.value === "IN_PROGRESS"
                                ).length
                              }
                            </div>
                            <div className="text-slate-600 text-sm">
                              Đang thực hiện
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 border border-indigo-100 text-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="text-2xl font-bold text-amber-600 mb-1">
                              {
                                selectedProtocol.protocolSteps.filter(
                                  (step) => step.status.value === "PLANNED"
                                ).length
                              }
                            </div>
                            <div className="text-slate-600 text-sm">
                              Dự kiến
                            </div>
                          </div>
                        </div>

                        {/* Total Cost */}
                        <div className="mt-6 bg-white rounded-xl p-4 border border-indigo-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <DollarSign className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-800">
                                  Tổng chi phí điều trị
                                </h4>
                                <p className="text-slate-600 text-sm">
                                  Tất cả các bước và dịch vụ
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(
                                  selectedProtocol.protocolSteps.reduce(
                                    (total, step) =>
                                      total + (step.relatedService?.price || 0),
                                    0
                                  )
                                )}
                              </div>
                              <div className="text-slate-500 text-sm">VND</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentHistoryTimeline;
