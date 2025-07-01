import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  FileText,
  Check,
  X,
  Phone,
  Mail,
  Award,
  Languages,
  DollarSign,
  CheckCircle,
  Circle,
  Star,
  MapPin,
  UserCheck,
  UserX,
  CalendarDays,
  Timer,
  ChevronRight,
  Info,
  Heart,
  HandHeart,
  Stethoscope,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getDoctors, getDoctorDetail } from "../../api/customer/doctorList";
import { createAppointment } from "../../api/customer/appointmentAPI";
import ServiceSelection from "@/components/bookingComponent/ServiceSelection ";
import instance from "@/config/axios";

const BookingAppointment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShifts] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loadingShifts, setLoadingShifts] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  //date
  const formatTimeObj = (timeObj) => {
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(timeObj.hour)}:${pad(timeObj.minute)}`;
  };
  const fetchShifts = async (date) => {
    try {
      const res = await instance.get("/api/work-schedules/working-shifts", {
        params: { date },
      });

      const data = res?.data?.data;

      // Đảm bảo luôn là array
      if (Array.isArray(data)) {
        setShifts(data);
      } else {
        setShifts([]);
      }
    } catch (error) {
      console.error("Lỗi lấy ca làm việc:", error);
      setShifts([]);
    }
  };

  const handleShiftClick = (shifts) => {
    setSelectedShifts(shifts);
  };

  const formatTime = (timeObj) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(timeObj.hour)}:${pad(timeObj.minute)}`;
  };

  
  const [formData, setFormData] = useState({
    patientProfileId: 1,
    doctorUserId: 0,
    serviceDefinitionId: 1,
    appointmentDateTime: "",
    estimatedDurationMinutes: 30,
    appointmentType: {
      typeName: "MEDICAL_EXAM",
      description: "Khám sức khỏe tổng quát",
    },
    reasonForVisit: "",
    notes: "",
  });

  const steps = [
    { id: 1, title: "Chọn dịch vụ", icon: HandHeart },
    { id: 2, title: "Chọn bác sĩ", icon: User },
    { id: 3, title: "Chọn lịch", icon: Calendar },
    { id: 4, title: "Thông tin", icon: FileText },
    { id: 5, title: "Xác nhận", icon: Check },
  ];

  const handleNext = () => {
    switch (currentStep) {
      case 1:
        // Bỏ luôn điều kiện — vì đã set mặc định rồi
        setCurrentStep(2);
        break;
      case 2:
        if (!selectedDate || !selectedShift) {
          Swal.fire({
            icon: "warning",
            title: "Thiếu thời gian khám",
            text: "Vui lòng chọn ngày và giờ khám",
          });
          return;
        }
        setCurrentStep(3);
        break;

      case 3: // BƯỚC 2: Chọn bác sĩ
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

      case 4: // BƯỚC 3: Nhập lý do khám
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

      case 5: // BƯỚC 4: Xác nhận gửi
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
  // API calls

  function getDayOfWeekInfo(dateString) {
    const dayOfWeekList = [
      { code: "SUNDAY", displayName: "Chủ nhật" },
      { code: "MONDAY", displayName: "Thứ hai" },
      { code: "TUESDAY", displayName: "Thứ ba" },
      { code: "WEDNESDAY", displayName: "Thứ tư" },
      { code: "THURSDAY", displayName: "Thứ năm" },
      { code: "FRIDAY", displayName: "Thứ sáu" },
      { code: "SATURDAY", displayName: "Thứ bảy" },
    ];

    const index = new Date(dateString).getDay(); // 0 - 6
    return dayOfWeekList[index];
  }

  const fetchDoctors = async () => {
    if (!selectedDate || !selectedShift) return;

    setLoadingDoctors(true);
    setDoctors([]);
    setError(null);

    try {
      const dayInfo = getDayOfWeekInfo(selectedDate); // Lấy đúng thứ

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
      console.log("Payload gửi bác sĩ:", payload);

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
    if (selectedDate) {
      setLoadingShifts(true);
      instance.get("/api/work-schedules/working-shifts", {
          params: { date: selectedDate },
        })
        .then((res) => {
          setShift(res.data?.data?.shifts || []);
          setSelectedTime(null); // reset giờ cũ
          setDoctors([]); // reset bác sĩ cũ
        })
        .catch(() => { })
        .finally(() => {
          setLoadingShifts(false);
        });
    }
  }, [selectedDate]);

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

  const submitAppointment = async () => {
    // ✅ Kiểm tra đăng nhập trước
    if (!userProfile) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để đặt lịch khám.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        window.location.href = "/login"; // Chuyển tới trang đăng nhập
      });
      return;
    }

    setLoading(true);
    try {
      const selectedShift = shifts.find((slot) => slot.label === selectedTime);

      const appointmentDateTime = `${selectedDate}T${selectedTime}:00`;

      const appointmentData = {
        ...formData,
        appointmentDateTime,
        estimatedDurationMinutes:
          selectedShift && selectedShift.duration ? selectedShift.duration : 30,
        patientProfileId: userProfile.id, // ✅ Gán ID người dùng đã đăng nhập
      };

      console.log("Dữ liệu gửi lịch hẹn:", appointmentData);

      const response = await createAppointment(appointmentData);

      if (!response.success) {
        alert(response.message || "Tạo cuộc hẹn thất bại");
        return;
      }

      const result = {
        bookingId: response.data?.bookingId || "Không rõ",
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        duration: selectedShift?.duration || 30,
        fee: selectedDoctor?.consultationFee || 500000,
      };

      setBookingResult(result);

      Swal.fire({
        icon: "success",
        title: "Đặt lịch thành công!",
        text: "Thông tin cuộc hẹn đã được gửi đi.",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (err) {
      console.error("Lỗi tạo lịch hẹn:", err);
      alert("Lỗi tạo lịch hẹn: " + err.message);
    } finally {
      setLoading(false);
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
    if (currentStep === 3 && doctors.length === 0) {
      fetchDoctors();
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
        return formData.reasonForVisit.trim() !== "";
      default:
        return true;
    }
  };
  ///
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    console.log("Service selected:", service);
  };
  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({ ...formData, doctorUserId: doctor.userId });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDateTime = (date, time) => {
    if (!date || !time) return "";
    const [hour, minute] = time.split(":");
    const dateTime = new Date(date);
    dateTime.setHours(hour);
    dateTime.setMinutes(minute);
    return dateTime.toLocaleString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  function getFormattedDateWithWeekday(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const isSaturday = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return date.getDay() === 6;
  };
  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      if (date.getDay() !== 0) {
        days.push({
          date: date.toISOString().split("T")[0],
          day: date.getDate(),
          month: date.getMonth() + 1,
          weekday: date.toLocaleDateString("vi-VN", { weekday: "short" }),
          isToday: i === 0,
          disabled: date.getDay() === 0,
        });
      }
    }

    return days;
  };

  const renderStep = () => {
    if (!userProfile) return (
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
          Vui lòng đăng nhập để tiếp tục đặt lịch khám với bác sĩ. Đăng nhập giúp bạn
          theo dõi lịch sử đặt lịch và nhận thông báo chính xác hơn.
        </p>

        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition duration-200 font-medium"
        >
          Đăng nhập ngay
        </a>
      </div>);
    switch (currentStep) {
      case 1:
        return null;
      // <div>
      //   {currentStep === 1 && (
      //     <ServiceSelection
      //       onServiceSelect={handleServiceSelect}
      //       selectedService={selectedService}
      //       instanceConfig={instance}
      //     />
      //   )}
      // </div>


      case 2:
        return (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Calendar className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Chọn thời gian khám
              </h2>
              <p className="text-xl text-gray-600">
                Lựa chọn ngày và giờ phù hợp với lịch trình của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calendar - LEFT */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <CalendarDays className="w-8 h-8 text-purple-600" />
                  <span>Chọn ngày khám</span>
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {generateCalendarDays().map((day) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${selectedDate === day.date
                        ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                        : day.isToday
                          ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-purple-400"
                          : "border-gray-200 bg-white hover:border-purple-300"
                        } ${day.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={day.disabled}
                    >
                      <div className="text-center">
                        <p className="text-sm text-gray-600 font-medium mb-1">
                          {day.weekday}
                        </p>
                        <p
                          className={`text-2xl font-bold ${selectedDate === day.date
                            ? "text-purple-700"
                            : day.isToday
                              ? "text-blue-700"
                              : "text-gray-800"
                            }`}
                        >
                          {day.day}
                        </p>
                        <p className="text-xs text-gray-500">
                          Tháng {day.month}
                        </p>
                      </div>

                      {selectedDate === day.date && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {day.isToday && (
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots - RIGHT */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <Timer className="w-8 h-8 text-purple-600" />
                  <span>Chọn giờ khám</span>
                </h3>

                {!selectedDate ? (
                  <div className="text-center py-16">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      Vui lòng chọn ngày khám trước
                    </p>
                  </div>
                ) : loadingShifts ? (
                  <div className="flex justify-center items-center py-16">
                    <svg
                      className="animate-spin h-8 w-8 text-purple-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <p className="ml-3 text-gray-600 text-lg">
                      Đang tải ca làm việc...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Buổi sáng */}
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                        </div>
                        <span>Buổi sáng</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {(shifts || [])
                          .filter(
                            (shift) =>
                              parseInt(shift.startTime.split(":")[0], 10) < 12
                          )
                          .map((shift, i) => {
                            const start = shift.startTime.slice(0, 5);
                            const end = shift.endTime.slice(0, 5);
                            const label = `${start} - ${end}`;
                            const [sh, sm] = start.split(":").map(Number);
                            const [eh, em] = end.split(":").map(Number);
                            const duration =
                              (eh * 60 + em - (sh * 60 + sm)) / 60;

                            return (
                              <button
                                key={`${start}-${end}`}
                                onClick={() => {
                                  setSelectedTime(start);
                                  setSelectedShifts(shift);
                                }}
                                className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${selectedTime === start
                                  ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-105"
                                  : "border-gray-200 bg-white hover:border-purple-300"
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="text-left">
                                    <p
                                      className={`text-lg font-bold ${selectedTime === start
                                        ? "text-purple-700"
                                        : "text-gray-800"
                                        }`}
                                    >
                                      {label}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {duration} giờ
                                    </p>
                                  </div>
                                  {selectedTime === start && (
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                      <Check className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Buổi chiều */}
                    {!isSaturday(selectedDate) && (
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                          <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                          </div>
                          <span>Buổi chiều</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {(shifts || [])
                            .filter((shift) => {
                              const hour = parseInt(
                                shift.startTime.split(":")[0],
                                10
                              );
                              // Giữ ca chiều (hour >= 12) nhưng loại nếu là Thứ 7
                              return hour >= 12 && !isSaturday(selectedDate);
                            })
                            .map((shift, i) => {
                              const start = shift.startTime.slice(0, 5); // "HH:mm"
                              const end = shift.endTime.slice(0, 5); // "HH:mm"
                              const label = `${start} - ${end}`;

                              // Tính thời lượng (giờ)
                              const [sh, sm] = start.split(":").map(Number);
                              const [eh, em] = end.split(":").map(Number);
                              const duration =
                                (eh * 60 + em - (sh * 60 + sm)) / 60;

                              return (
                                <button
                                  key={`${start}-${end}`}
                                  onClick={() => setSelectedTime(start)}
                                  className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${selectedTime === start
                                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-105"
                                    : "border-gray-200 bg-white hover:border-purple-300"
                                    }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="text-left">
                                      <p
                                        className={`text-lg font-bold ${selectedTime === start
                                          ? "text-purple-700"
                                          : "text-gray-800"
                                          }`}
                                      >
                                        {label}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {duration} giờ
                                      </p>
                                    </div>
                                    {selectedTime === start && (
                                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
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
                Tìm bác sĩ có kinh nghiệm và chuyên môn phù hợp với nhu cầu của
                bạn
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
                <p className="text-gray-500 mt-2">
                  Vui lòng chờ trong giây lát
                </p>
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
                        className={`group relative bg-white rounded-3xl p-8 transition-all duration-500 cursor-pointer border-2 hover:shadow-2xl ${selectedDoctor?.userId === doctor.userId
                          ? "border-blue-500 shadow-2xl transform scale-[1.02] bg-gradient-to-r from-blue-50 to-indigo-50"
                          : "border-gray-200 hover:border-blue-300 hover:-translate-y-1"
                          }`}
                        onClick={() => selectDoctor(doctor)}
                      >
                        <div className="flex items-center space-x-8">
                          {/* Custom Checkbox */}
                          <div className="flex-shrink-0">
                            <div
                              className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedDoctor?.userId === doctor.userId
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
                                      {doctor.experienceYears || 5}+ năm kinh
                                      nghiệm
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
                                    {formatCurrency(
                                      doctor.consultationFee || 500000
                                    )}
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
                                    <p className="text-sm text-gray-600">
                                      Phí khám
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
                                <div className="flex items-center space-x-3">
                                  <Star className="w-8 h-8 text-yellow-500" />
                                  <div>
                                    <p className="font-bold text-gray-800">
                                      4.8/5
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Đánh giá
                                    </p>
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
                                    // Tiếp tục từ phần thông tin liên hệ trong
                                    modal chi tiết bác sĩ
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
      case 4:
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
                Hoàn thiện thông tin để bác sĩ có thể chuẩn bị tốt nhất cho buổi
                khám
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
                            <p className="text-sm text-gray-600">
                              Số điện thoại
                            </p>
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
                              {new Date(
                                userProfile.dateOfBirth
                              ).toLocaleDateString("vi-VN")}
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

      case 5:
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
                            {formatCurrency(
                              selectedDoctor.consultationFee || 500000
                            )}
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
                      <p className="font-semibold text-gray-800 mb-2">
                        Lý do khám:
                      </p>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-xl">
                        {formData.reasonForVisit || "Chưa có thông tin"}
                      </p>
                    </div>

                    {formData.notes && (
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          Ghi chú:
                        </p>
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
                          <span className="text-gray-700">
                            {userProfile.email}
                          </span>
                        </div>
                      )}

                      {userProfile.dateOfBirth && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">
                            {new Date(
                              userProfile.dateOfBirth
                            ).toLocaleDateString("vi-VN")}
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
                        {formatCurrency(
                          selectedDoctor?.consultationFee || 500000
                        )}
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
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Đang xử lý...</span>
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

      case 6:
        return (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-2xl border border-green-200">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Đặt lịch thành công!
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Cuộc hẹn của bạn đã được xác nhận. Chúng tôi sẽ gửi thông tin
                chi tiết qua email và SMS.
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
                          <p className="text-sm text-gray-600">Mã đặt lịch</p>
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
                            {selectedDoctor?.fullName}
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
                              selectedDate,
                              selectedTime
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
                            {formatCurrency(
                              selectedDoctor?.consultationFee || 500000
                            )}
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
                  <li>• Mang theo giấy tờ tùy thân và thẻ bảo hiểm (nếu có)</li>
                  <li>• Liên hệ hotline nếu cần thay đổi lịch hẹn</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Bước không hợp lệ</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50  pb-25">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 ">
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

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep === step.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                      : currentStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.icon && <step.icon className="w-5 h-5" />
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-1 mx-2 rounded-full transition-colors duration-300 ${currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative ">
        {renderStep()}

        {/* Navigation Buttons */}
        {currentStep !== 6 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              {/* Nút Quay lại */}
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </button>

              {/* Nút Huỷ */}
              <button
                onClick={handleCancel}
                className="text-red-700 flex items-center space-x-2 px-8 py-4 bg-red-100 rounded-2xl hover:bg-red-400 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

              {/* Nút Tiếp theo / Xác nhận */}
              <div className="flex items-center space-x-4">
                <div className="text-gray-600">Bước {currentStep} / 5</div>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
