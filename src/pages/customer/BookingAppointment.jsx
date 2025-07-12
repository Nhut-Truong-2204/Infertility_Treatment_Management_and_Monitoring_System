import React from "react";
import { ChevronLeft, Stethoscope, Check, ChevronRight } from "lucide-react";
import { useBookingStep } from "@/components/hooks/AppointmentHooks/useBookingStep";
import { useFetchShifts } from "@/components/hooks/AppointmentHooks/useFetchShifts";
import { useGenerateCalendarDays } from "@/components/hooks/AppointmentHooks/useGenerateCalendarDays";

import StepSelectService from "@/components/bookingComponent/StepSelectService";
import StepSelectTime from "@/components/bookingComponent/StepSelectTime";
import StepSelectDoctor from "@/components/bookingComponent/StepSelectDoctor";
import StepInfoForm from "@/components/bookingComponent/StepInfoForm";
import StepConfirmation from "@/components/bookingComponent/StepConfirmation";
import Swal from "sweetalert2";
import instance from "../../config/axios";
import { createAppointment } from "@/api/customer/appointmentAPI";
import { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Mail,
  FileText,
  Clock,
  Phone,
  CheckCircle,
  Hash,
  DollarSign,
} from "lucide-react";
const BookingAppointment = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedService,
    setSelectedService,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedShift,
    setSelectedShift,
    selectedDoctor,
    setSelectedDoctor,
    doctorDetails,
    setDoctorDetails,
    formData,
    setFormData,
    handleBack,
  } = useBookingStep({
    defaultStep: 2, // ✅ Bắt đầu từ bước chọn ngày/giờ
  });

  const [shifts, setShifts] = useState([]);
  const [loadingShifts, setLoadingShifts] = useState(false);
  const { generateCalendarDays } = useGenerateCalendarDays();
  const [userProfile, setUserProfile] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  const isSaturday = new Date(selectedDate).getDay() === 6;
  const [appointmentData, setAppointmentData] = React.useState(null);

  const submitAppointment = async () => {
    if (!userProfile) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để đặt lịch khám.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        window.location.href = "/login";
      });
      return;
    }

    try {
      const selectedShiftObj = shifts.find(
        (slot) => slot.startTime === selectedTime
      );

      const appointmentDateTime = `${selectedDate}T${selectedTime}:00`;

      const appointmentDataPayload = {
        doctorUserId: selectedDoctor?.userId,
        patientProfileId: userProfile?.id,
        serviceDefinitionId: 1,
        appointmentDateTime,
        estimatedDurationMinutes: selectedShiftObj?.duration || 30,
        appointmentType: {
          typeName: "MEDICAL_EXAM",
          description: "Khám bệnh cơ bản",
        },
        reasonForVisit: formData.reasonForVisit,
        notes: formData.notes || "",
      };

      console.log("Dữ liệu gửi lên API (appointment):", appointmentDataPayload);

      const response = await createAppointment(appointmentDataPayload);

      if (!response.success) {
        const message = response?.message || "Đặt lịch thất bại";

        // ✅ Kiểm tra lỗi khung giờ đã có cuộc hẹn
        if (message.includes("Khung giờ đã có cuộc hẹn khác")) {
          Swal.fire({
            icon: "warning",
            title: "Khung giờ đã được đặt!",
            text: "Vui lòng chọn khung giờ khác.",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: message,
          });
        }

        return;
      }

      // Nếu thành công
      const result = {
        bookingId: response.data?.bookingId || "Không rõ",
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        duration: selectedShiftObj?.duration || 30,
        fee: selectedDoctor?.consultationFee || 500000,
      };

      setAppointmentData(result);
      setCurrentStep(6); // ✅ sang màn thành công
    } catch (err) {
      console.error("Lỗi tạo lịch hẹn:", err);
      Swal.fire({
        icon: "error",
        title: "Lỗi không xác định",
        text: err?.message || "Lỗi tạo lịch hẹn",
      });
    }
  };

  const fetchUserProfile = () => {
    try {
      const userCookie = getCookie("user");
      if (!userCookie) {
        console.warn("Không tìm thấy cookie user");
        return;
      }

      // Decode chuỗi từ cookie (đang bị URI encode)
      const decoded = decodeURIComponent(userCookie);

      // Parse lại thành object
      const userData = JSON.parse(decoded);

      // Gán dữ liệu user vào state
      setUserProfile({
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        ...userData, // Trường hợp bạn muốn giữ tất cả thuộc tính khác
      });
    } catch (err) {
      console.error("Lỗi khi xử lý cookie user:", err);
    }
  };

  const fetchShifts = async (date) => {
    setLoadingShifts(true);
    try {
      const res = await instance.get("/api/work-schedules/working-shifts", {
        params: { date },
      });

      const data = res?.data?.data;
      setShifts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi lấy ca làm việc:", error);
      setShifts([]);
    } finally {
      setLoadingShifts(false);
    }
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }
  useEffect(() => {
    fetchUserProfile(); // nên đặt trong lần đầu render
  }, []);

  useEffect(() => {
    if (currentStep === 5) {
      fetchUserProfile();
    }
  }, [currentStep]);

  useEffect(() => {
    if (selectedDate) {
      fetchShifts(selectedDate);
    }
  }, [selectedDate]);
  useEffect(() => {
    if (currentStep === 1) {
      setSelectedService({
        id: 1,
        name: "CONSULTATION",
        description: "Khám bệnh cơ bản",
      });

      // Gán dịch vụ vào formData
      setFormData((prev) => ({
        ...prev,
        serviceDefinitionId: 1,
        appointmentType: {
          typeName: "MEDICAL_EXAM",
          description: "Khám bệnh cơ bản",
        },
      }));

      setCurrentStep(2);
    }
  }, [currentStep]);
  const handleCancel = () => {
    Swal.fire({
      title: "Bạn có chắc muốn huỷ?",
      text: "Mọi thay đổi chưa lưu sẽ bị mất!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có, huỷ ngay",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        // Ví dụ: chuyển hướng về trang chủ
        navigate("/");
      }
    });
  };
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== "" && selectedTime !== "";
      case 3:
        return selectedDoctor !== null;
      case 4:
        return formData?.reasonForVisit?.trim?.() !== "";

      default:
        return true;
    }
  };
  const handleNext = () => {
    switch (currentStep) {
      case 1:
        // Bỏ điều kiện vì service đã set mặc định từ trước
        setCurrentStep(2);
        break;

      case 2:
        if (!selectedDate || !selectedShift || !selectedTime) {
          Swal.fire({
            icon: "warning",
            title: "Thiếu thời gian khám",
            text: "Vui lòng chọn ngày và giờ khám",
          });
          return;
        }
        setCurrentStep(3);
        break;

      case 3:
        if (!selectedDoctor) {
          Swal.fire({
            icon: "warning",
            title: "Thiếu thông tin",
            text: "Vui lòng chọn bác sĩ",
          });
          return;
        }
        setCurrentStep(4);
        break;

      case 4:
        if (!formData.reasonForVisit?.trim()) {
          Swal.fire({
            icon: "warning",
            title: "Thiếu lý do khám",
            text: "Vui lòng nhập lý do khám",
          });
          return;
        }
        setCurrentStep(5);
        break;

      case 5:
        Swal.fire({
          title: "Xác nhận đặt lịch?",
          text: "Bạn có chắc chắn muốn gửi thông tin đặt lịch?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Gửi",
          cancelButtonText: "Huỷ",
        }).then((result) => {
          if (result.isConfirmed) {
            submitAppointment();
          }
        });
        break;

      default:
        break;
    }
  };

  const getFormattedDateWithWeekday = (date, time) => {
    const d = new Date(`${date}T${time}`);
    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    return `${days[d.getDay()]}, ${d.toLocaleDateString(
      "vi-VN"
    )} lúc ${d.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-25">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  HealthCare Booking
                </h1>
                <p className="text-gray-600 text-sm">
                  Đặt lịch khám bệnh dễ dàng
                </p>
              </div>
            </div>

            {/* Step Progress */}
            <div className="hidden md:flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((stepId, index) => (
                <div key={stepId} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep === stepId
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                        : currentStep > stepId
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > stepId ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stepId
                    )}
                  </div>
                  {index < 4 && (
                    <div
                      className={`w-8 h-1 mx-2 rounded-full transition-colors duration-300 ${
                        currentStep > stepId ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        {!userProfile ? (
          // Nếu chưa đăng nhập
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl shadow-md border border-blue-100">
            <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M12 12c4.418 0 8 1.79 8 4v2H4v-2c0-2.21 3.582-4 8-4z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Bạn chưa đăng nhập
            </h2>
            <p className="text-gray-600 mb-6 text-sm text-center max-w-md">
              Vui lòng đăng nhập để tiếp tục đặt lịch khám với bác sĩ. Đăng nhập
              giúp bạn theo dõi lịch sử đặt lịch và nhận thông báo chính xác
              hơn.
            </p>
            <a
              href="/login"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition duration-200 font-medium"
            >
              Đăng nhập ngay
            </a>
          </div>
        ) : (
          <>
            {currentStep === 2 && (
              <StepSelectTime
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedShift={selectedShift}
                setSelectedShift={setSelectedShift}
                shifts={shifts}
                generateCalendarDays={generateCalendarDays}
                loadingShifts={loadingShifts}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 3 && (
              <StepSelectDoctor
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                setDoctorDetails={setDoctorDetails}
                setFormData={setFormData}
                setCurrentStep={setCurrentStep}
                selectedDate={selectedDate}
                selectedShift={selectedShift}
              />
            )}
            {currentStep === 4 && (
              <StepInfoForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={submitAppointment} // ✅ Dùng đúng hàm
                userProfile={userProfile}
              />
            )}
            {currentStep === 5 && (
              <StepConfirmation
                selectedDoctor={selectedDoctor}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedService={selectedService}
                formData={formData}
                userProfile={userProfile}
                selectedShift={selectedShift}
                submitAppointment={submitAppointment} // Nếu cần giờ bắt đầu/kết thúc
              />
            )}
            {currentStep === 6 && (
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-2xl border border-green-200">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <CheckCircle className="w-16 h-16 text-white" />
                  </div>

                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Đặt lịch thành công!
                  </h2>

                  <p className="text-xl text-gray-600 mb-8">
                    Cuộc hẹn của bạn đã được xác nhận. Chúng tôi sẽ gửi thông
                    tin chi tiết qua email và SMS.
                  </p>

                  {bookingResult && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Thông tin cuộc hẹn
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <Hash className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Mã đặt lịch
                              </p>
                              <p className="font-bold text-lg text-gray-800">
                                {bookingResult.bookingId}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Bác sĩ</p>
                              <p className="font-bold text-lg text-gray-800">
                                {bookingResult.doctor?.fullName}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Thời gian</p>
                              <p className="font-bold text-lg text-gray-800">
                                {getFormattedDateWithWeekday(
                                  bookingResult.date,
                                  bookingResult.time
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                              <DollarSign className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Chi phí</p>
                              <p className="font-bold text-lg text-gray-800">
                                {formatCurrency(bookingResult.fee)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium"
                    >
                      Đặt lịch mới
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
                    >
                      In thông tin
                    </button>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
                    <p className="text-blue-800 font-medium mb-2">
                      Lưu ý quan trọng:
                    </p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Vui lòng có mặt trước 15 phút so với giờ hẹn</li>
                      <li>
                        • Mang theo giấy tờ tùy thân và thẻ bảo hiểm (nếu có)
                      </li>
                      <li>• Liên hệ hotline nếu cần thay đổi lịch hẹn</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Buttons */}
        {userProfile && currentStep !== 6 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              {/* Quay lại */}
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </button>

              {/* Huỷ */}
              <button
                onClick={handleCancel}
                className="text-red-700 flex items-center space-x-2 px-8 py-4 bg-red-100 rounded-2xl hover:bg-red-400 transition-all duration-300 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Huỷ</span>
              </button>

              {/* Tiếp theo / Xác nhận */}
              <div className="flex items-center space-x-4">
                <div className="text-gray-600">Bước {currentStep} / 5</div>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium"
                >
                  <span>
                    {currentStep === 5 ? "Xác nhận đặt lịch" : "Tiếp theo"}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingAppointment;
