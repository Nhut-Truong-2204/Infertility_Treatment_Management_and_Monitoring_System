import React from "react";
import {
  User,
  Calendar,
  Mail,
  FileText,
  Clock,
  Phone,
  CheckCircle,
  Timer,
  DollarSign,
} from "lucide-react";
import { DotsLoading } from "../layout/Loading";
import {useState} from "react"
const StepConfirmation = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  formData,
  userProfile,
  selectedShift,
  submitAppointment,
}) => {
  if (!selectedDoctor || !selectedDate || !selectedTime || !userProfile)
    return <p>Không tìm thấy đủ thông tin đặt lịch.</p>;

  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  // Hàm format ngày (nếu bạn đang dùng)
  const getFormattedDateWithWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Xác nhận đặt lịch
        </h2>
        <p className="text-xl text-gray-600">
          Kiểm tra lại thông tin và xác nhận cuộc hẹn của bạn
        </p>
      </div>

      <div className="space-y-8">
        {/* Appointment Summary */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span>Tóm tắt cuộc hẹn</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Doctor Info */}
            {selectedDoctor && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                  <User className="w-6 h-6 text-blue-600" />
                  <span>Thông tin bác sĩ</span>
                </h4>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden">
                    {selectedDoctor.profilePictureUrl ? (
                      <img
                        src={selectedDoctor.profilePictureUrl}
                        alt={selectedDoctor.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-xl text-gray-800">
                      {selectedDoctor.fullName}
                    </p>
                    <p className="text-blue-600 font-medium">
                      {selectedDoctor.specializationName}
                    </p>
                    <p className="text-green-600 font-bold text-lg">
                      {formatCurrency(selectedDoctor.consultationFee || 500000)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Time Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-purple-600" />
                <span>Thời gian khám</span>
              </h4>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    {getFormattedDateWithWeekday(selectedDate)}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    {selectedShift?.startTime} - {selectedShift?.endTime}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Timer className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">
                    Thời gian dự kiến: 30 phút
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
              <FileText className="w-6 h-6 text-green-600" />
              <span>Chi tiết cuộc hẹn</span>
            </h4>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800 mb-2">Lý do khám:</p>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-xl">
                  {formData.reasonForVisit || "Chưa có thông tin"}
                </p>
              </div>

              {formData.notes && (
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Ghi chú:</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl">
                    {formData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Patient Information */}
          {userProfile && (
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                <User className="w-6 h-6 text-orange-600" />
                <span>Thông tin bệnh nhân</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    {userProfile.fullName}
                  </span>
                </div>

                {userProfile.phoneNumber && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      {userProfile.phoneNumber}
                    </span>
                  </div>
                )}

                {userProfile.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{userProfile.email}</span>
                  </div>
                )}

                {userProfile.dateOfBirth && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      {new Date(userProfile.dateOfBirth).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Total Cost */}
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-lg">Tổng chi phí dự tính</p>
                <p className="text-3xl font-bold">
                  {formatCurrency(selectedDoctor?.consultationFee || 500000)}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Confirmation Button */}
          <div className="mt-8 text-center">
            <button
              onClick={submitAppointment}
              disabled={isLoading}
              className="inline-flex items-center space-x-3 px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                 <DotsLoading/>
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>Xác nhận đặt lịch</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepConfirmation;
