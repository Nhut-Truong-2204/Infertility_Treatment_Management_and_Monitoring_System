import React from "react";
import { User, Calendar, Mail, Info, FileText , Phone, } from "lucide-react";

const StepInfoForm = ({ formData, setFormData, handleSubmit,userProfile  }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <FileText className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Thông tin chi tiết
        </h2>
        <p className="text-xl text-gray-600">
          Hoàn thiện thông tin để bác sĩ có thể chuẩn bị tốt nhất cho buổi khám
        </p>
      </div>

      <div className="space-y-8">
        {/* User Profile Display */}
        {userProfile && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span>Thông tin bệnh nhân</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {userProfile.fullName}
                    </p>
                    <p className="text-sm text-gray-600">Họ và tên</p>
                  </div>
                </div>

                {userProfile.email && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {userProfile.email}
                      </p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {userProfile.phoneNumber && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {userProfile.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                    </div>
                  </div>
                )}

                {userProfile.dateOfBirth && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {new Date(userProfile.dateOfBirth).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                      <p className="text-sm text-gray-600">Ngày sinh</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>Chi tiết cuộc hẹn</span>
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Lý do khám bệnh <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reasonForVisit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reasonForVisit: e.target.value,
                  })
                }
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-0 transition-colors resize-none text-gray-800 placeholder-gray-500"
                rows="4"
                placeholder="Vui lòng mô tả triệu chứng hoặc lý do bạn muốn khám..."
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Ghi chú thêm (không bắt buộc)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-0 transition-colors resize-none text-gray-800 placeholder-gray-500"
                rows="3"
                placeholder="Các thông tin bổ sung, tiền sử bệnh, thuốc đang sử dụng..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepInfoForm;
