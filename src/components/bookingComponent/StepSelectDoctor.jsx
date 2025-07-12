import React, { useEffect, useState } from "react";
import instance from "../../config/axios";
import { getDayOfWeekInfo } from "@/utils/AppointmentUtils/dateUtils";
import {
  User,
  Award,
  Star,
  Info,
  X,
  Phone,
  DollarSign,
  Check,
} from "lucide-react";
const StepSelectDoctor = ({
  setCurrentStep,
  selectedDoctor,
  setSelectedDoctor,
  setDoctorDetails,
  setFormData,
  selectedDate,
  selectedShift,
}) => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchDoctors = async () => {
    if (!selectedDate || !selectedShift) return;

    setLoadingDoctors(true);
    setDoctors([]);
    setError(null);

    try {
      const dayInfo = getDayOfWeekInfo(selectedDate);

      const payload = {
        date: selectedDate,
        shift: {
          startTime: selectedShift.startTime,
          endTime: selectedShift.endTime,
        },
        dayOfWeek: {
          code: dayInfo.code,
          displayName: dayInfo.displayName,
        },
      };

      console.log("Payload gửi bác sĩ:", JSON.stringify(payload, null, 2));

      const response = await instance.post("/api/work-schedules/date", payload);

      if (response.data?.success) {
        const doctors = response.data.data.doctors || [];
        setDoctors(doctors);
        if (doctors.length === 0) {
          setError("Không có bác sĩ nào trong ca trực vừa chọn.");
        }
      } else {
        setDoctors([]);
        setError("Không có bác sĩ nào trong ca trực vừa chọn.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bác sĩ:", err);
      setError("Không thể tải danh sách bác sĩ.");
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    fetchDoctors(); // ✅ gọi trong useEffect
  }, [selectedDate, selectedShift]);

  const fetchDoctorDetails = async (userId) => {
    setLoadingDetail(true);
    setError(null);
    try {
      const response = await getDoctorDetail(userId);

      if (response.success) {
        setDoctorDetails(response.data);
        setIsDetailOpen(true);
      } else {
        setError("Không thể tải chi tiết bác sĩ");
      }
    } catch (err) {
      setError("Lỗi khi tải chi tiết bác sĩ: " + err.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorDetails(doctor);
    setFormData((prev) => ({
      ...prev,
      doctorUserId: doctor.userId,
    }));
    console.log("Doctor selected:", doctor);
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Chọn bác sĩ phù hợp
        </h2>
        <p className="text-xl text-gray-600">
          Tìm bác sĩ có kinh nghiệm và chuyên môn phù hợp với nhu cầu của bạn
        </p>
      </div>

      {loadingDoctors ? (
        <div className="text-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full opacity-20"></div>
            </div>
          </div>
          <p className="text-gray-600 text-xl font-medium">
            Đang tải danh sách bác sĩ...
          </p>
          <p className="text-gray-500 mt-2">Vui lòng chờ trong giây lát</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <p className="text-red-600 text-xl font-medium mb-4">{error}</p>
          <button
            onClick={fetchDoctors}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium"
          >
            Thử lại
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {doctors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-yellow-600" />
              </div>
              <p className="text-yellow-700 text-xl font-medium mb-4">
                Không có bác sĩ nào phù hợp trong ca đã chọn
              </p>
              <p className="text-gray-500">
                Vui lòng chọn thời gian khác hoặc thử lại sau
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.userId}
                  className={`group relative bg-white rounded-3xl p-8 transition-all duration-500 cursor-pointer border-2 hover:shadow-2xl ${
                    selectedDoctor?.userId === doctor.userId
                      ? "border-blue-500 shadow-2xl transform scale-[1.02] bg-gradient-to-r from-blue-50 to-indigo-50"
                      : "border-gray-200 hover:border-blue-300 hover:-translate-y-1"
                  }`}
                  onClick={() => selectDoctor(doctor)}
                >
                  <div className="flex items-center space-x-8">
                    {/* Custom Checkbox */}
                    <div className="flex-shrink-0">
                      <div
                        className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                          selectedDoctor?.userId === doctor.userId
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 group-hover:border-blue-400"
                        }`}
                      >
                        {selectedDoctor?.userId === doctor.userId && (
                          <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        {doctor.profilePictureUrl ? (
                          <img
                            src={doctor.profilePictureUrl}
                            alt={doctor.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <User className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      {selectedDoctor?.userId === doctor.userId && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {doctor.fullName}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {doctor.specializationName}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                            {doctor.shortBio ||
                              "Bác sĩ có nhiều năm kinh nghiệm trong chuyên khoa"}
                          </p>

                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2 text-amber-600">
                              <Award className="w-5 h-5" />
                              <span className="font-medium">
                                {doctor.experienceYears || 5}+ năm kinh nghiệm
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-yellow-500">
                              <Star className="w-5 h-5 fill-current" />
                              <span className="font-medium text-gray-700">
                                4.8 (120+ đánh giá)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="text-right pl-6">
                          <div className="mb-6">
                            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {formatCurrency(doctor.consultationFee || 500000)}
                            </p>
                            <p className="text-sm text-gray-500 font-medium">
                              Phí khám
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fetchDoctorDetails(doctor.userId);
                            }}
                            className="group/btn px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl hover:from-blue-500 hover:to-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-medium"
                          >
                            <div className="flex items-center space-x-2">
                              <Info className="w-4 h-4" />
                              <span>Chi tiết</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Doctor Detail Modal với overlay mờ */}
      {isDetailOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
            {/* Header với gradient */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Thông tin chi tiết bác sĩ
                  </h2>
                  <p className="text-blue-100">
                    Tìm hiểu thêm về chuyên môn và kinh nghiệm
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {loadingDetail ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                  <p className="text-gray-600 text-lg">
                    Đang tải thông tin chi tiết...
                  </p>
                </div>
              ) : doctorDetails ? (
                <div className="space-y-10">
                  {/* Doctor Header Info */}
                  <div className="flex items-start space-x-8">
                    <div className="w-40 h-40 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl border-4 border-white flex-shrink-0">
                      {doctorDetails.userAccountProfilePictureUrl ? (
                        <img
                          src={doctorDetails.userAccountProfilePictureUrl}
                          alt={doctorDetails.userFullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <User className="w-20 h-20" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-4xl font-bold text-gray-800 mb-3">
                        {doctorDetails.userFullName}
                      </h3>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                          {doctorDetails.specializationName}
                        </span>
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                          {doctorDetails.departmentName}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                          <div className="flex items-center space-x-3">
                            <Award className="w-8 h-8 text-amber-600" />
                            <div>
                              <p className="font-bold text-gray-800">
                                {doctorDetails.experienceYears} năm
                              </p>
                              <p className="text-sm text-gray-600">
                                Kinh nghiệm
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                          <div className="flex items-center space-x-3">
                            <DollarSign className="w-8 h-8 text-green-600" />
                            <div>
                              <p className="font-bold text-gray-800">
                                {formatCurrency(
                                  doctorDetails.consultationFee || 500000
                                )}
                              </p>
                              <p className="text-sm text-gray-600">Phí khám</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <Star className="w-8 h-8 text-yellow-500" />
                            <div>
                              <p className="font-bold text-gray-800">4.8/5</p>
                              <p className="text-sm text-gray-600">Đánh giá</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <span>Thông tin liên hệ</span>
                      </h4>

                      <div className="space-y-4">
                        {doctorDetails.userEmail && (
                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                              <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              // Tiếp tục từ phần thông tin liên hệ trong modal
                              chi tiết bác sĩ
                              <p className="font-semibold text-gray-800">
                                {doctorDetails.userEmail}
                              </p>
                              <p className="text-sm text-gray-600">
                                Email liên hệ
                              </p>
                            </div>
                          </div>
                        )}

                        {doctorDetails.userPhoneNumber && (
                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                              <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {doctorDetails.userPhoneNumber}
                              </p>
                              <p className="text-sm text-gray-600">
                                Số điện thoại
                              </p>
                            </div>
                          </div>
                        )}

                        {doctorDetails.workingLocation && (
                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {doctorDetails.workingLocation}
                              </p>
                              <p className="text-sm text-gray-600">
                                Địa điểm làm việc
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <span>Thông tin chuyên môn</span>
                      </h4>

                      <div className="space-y-4">
                        {doctorDetails.qualifications && (
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                            <p className="font-semibold text-blue-800 mb-2">
                              Bằng cấp & Chứng chỉ
                            </p>
                            <p className="text-gray-700">
                              {doctorDetails.qualifications}
                            </p>
                          </div>
                        )}

                        {doctorDetails.languagesSpoken && (
                          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <Languages className="w-5 h-5 text-green-600" />
                              <p className="font-semibold text-green-800">
                                Ngôn ngữ
                              </p>
                            </div>
                            <p className="text-gray-700">
                              {doctorDetails.languagesSpoken}
                            </p>
                          </div>
                        )}

                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                          <p className="font-semibold text-amber-800 mb-2">
                            Chuyên khoa
                          </p>
                          <p className="text-gray-700">
                            {doctorDetails.specializationName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Biography/Description */}
                  {doctorDetails.shortBio && (
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 border border-gray-200">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span>Giới thiệu</span>
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {doctorDetails.shortBio}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
                    >
                      Đóng
                    </button>
                    <button
                      onClick={() => {
                        selectDoctor(doctorDetails);
                        setIsDetailOpen(false);
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium"
                    >
                      Chọn bác sĩ này
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 text-lg">
                    Không thể tải thông tin chi tiết
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepSelectDoctor;
