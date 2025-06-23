import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  ArrowLeft,
  Stethoscope,
  ClipboardList,
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
} from "lucide-react";
import { getDoctors, getDoctorDetail } from "../../api/customer/doctorList";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { createAppointment } from "../../api/customer/appointmentAPI";
import { useAuth } from "../../context/AuthContext";
import instance from "@/config/axios";
import axios from "axios";
//data

// Step Progress Component
const StepProgress = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${index < currentStep
                  ? "bg-blue-600 text-white"
                  : index === currentStep
                    ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                    : "bg-gray-200 text-gray-500"
                  }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-500"
                  }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded transition-all duration-200 ${index < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

//Service selection Component


const ALLOWED_TYPES = ["MEDICAL_EXAM", "CONSULTATION"];

const ServiceSelection = ({ selectedService, onSelectService, onNext, onCancel }) => {
  const [services, setServices] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loadingDetailId, setLoadingDetailId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await instance.get("/api/appointment-types");
        console.log(res.data);

        // const filtered = res.data.data.filter(service =>
        //   ALLOWED_TYPES.includes(service.typeName)
        // );
        // setServices(filtered);
      } catch (error) {
        console.error("Lỗi khi tải loại dịch vụ:", error);
      }
    };

    fetchServices();
  }, []);

  const fetchServiceDetail = (serviceTypeName) => {
    setLoadingDetailId(serviceTypeName);
    setTimeout(() => {
      const detail = services.find(s => s.typeName === serviceTypeName);
      setSelectedDetail(detail);
      setLoadingDetailId(null);
    }, 300); // giả delay
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn loại dịch vụ</h2>

      {services.length === 0 ? (
        <p>Đang tải danh sách dịch vụ...</p>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => {
            const isSelected = selectedService?.typeName === service.typeName;
            return (
              <div
                key={service.typeName}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🩺</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.description}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Mã loại: <strong>{service.typeName}</strong>
                    </p>
                    <div className="mt-2 text-sm text-gray-500 space-x-6">
                      <button
                        onClick={() => fetchServiceDetail(service.typeName)}
                        className="text-blue-600 underline hover:text-blue-800 ml-2"
                      >
                        Xem chi tiết
                      </button>
                      {loadingDetailId === service.typeName && (
                        <span className="text-blue-500 animate-pulse ml-2">
                          Đang tải...
                        </span>
                      )}
                      {selectedDetail?.typeName === service.typeName && (
                        <span className="text-xs text-gray-600 animate-bounce ml-2 flex items-center gap-1">
                          Xem ở bên dưới <ArrowDownwardIcon className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                      }`}
                    onClick={() => onSelectService(service)}
                  >
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedDetail && (
        <div className="mt-6 p-6 border rounded-xl bg-gray-50 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Chi tiết dịch vụ</h3>
          <div className="grid gap-2 text-gray-700 text-sm">
            <p>
              <strong>Tên loại:</strong> {selectedDetail.typeName}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedDetail.description}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <X className="w-4 h-4 inline mr-2" />
          Hủy
        </button>
        <button
          onClick={onNext}
          disabled={!selectedService}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedService
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Tiếp tục
          <ChevronRight className="w-4 h-4 inline ml-2" />
        </button>
      </div>
    </div>
  );
};



// Doctor Selection Component
const DoctorSelection = ({
  selectedDoctor,
  onSelectDoctor,
  onNext,
  onCancel,
}) => {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);
  const [errorDetail, setErrorDetail] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedDetailUserId, setSelectedDetailUserId] = useState(null);

  useEffect(() => {
    getDoctors()
      .then(async (res) => {
        const doctorList = res.data?.content || [];

        // Gọi song song getDoctorDetail() cho từng doctor
        const detailedDoctors = await Promise.all(
          doctorList.map(async (doctor) => {
            try {
              const detail = await getDoctorDetail(doctor.userId);
              return {
                ...doctor,
                consultationFee: detail.data.consultationFee,
              };
            } catch {
              return {
                ...doctor,
                consultationFee: null,
              };
            }
          })
        );

        setDoctors(detailedDoctors);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách bác sĩ.");
        setLoading(false);
      });
  }, []);

  const fetchDoctorDetail = async (doctorId) => {
    setSelectedDetailUserId(doctorId);
    setErrorDetail(null);
    try {
      const doctorDetail = await getDoctorDetail(doctorId);
      console.log("Chi tiết bác sĩ:", doctorDetail);
      setSelectedDetail(doctorDetail.data);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết bác sĩ", err);
      setErrorDetail("Không thể tải chi tiết bác sĩ.");
      setSelectedDetail(null);
    } finally {
      setLoadingDoctorId(null);
      setLoadingDetail(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn bác sĩ</h2>

      {loading && <p>Đang tải danh sách bác sĩ...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4">
          {doctors.map((doctor) => {
            const isSelected =
              selectedDoctor?.id === doctor.id &&
              selectedDoctor?.fullName === doctor.fullName;
            const isLoadingThisDoctor = loadingDoctorId === doctor.id;

            return (
              <div
                key={doctor.id}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                {loadingDetail && (
                  <div className="text-center text-blue-500 font-medium py-4 animate-pulse">
                    Đang tải thông tin bác sĩ...
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <div className="text-4xl">👨‍⚕️</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {doctor.fullName}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {doctor.specializationName || "Chưa rõ chuyên khoa"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {doctor.shortBio || "Kinh nghiệm chưa rõ"}
                    </p>

                    <div className="flex items-center mt-2 space-x-10">
                      <span className="text-green-600 font-semibold">
                        Phí tư vấn:&nbsp;
                        <span className="text-sm text-green-600">
                          {doctor.consultationFee
                            ? `${doctor.consultationFee.toLocaleString()} VNĐ`
                            : "Chưa rõ"}
                        </span>
                      </span>

                      <button
                        onClick={() => fetchDoctorDetail(doctor.userId)}
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                      >
                        Xem chi tiết
                      </button>
                      {selectedDetailUserId === doctor.userId &&
                        !loadingDetail && (
                          <p className="text-xs text-gray-600 mt-1 flex items-center gap-1 animate-bounce">
                            Xem ở bên dưới
                            <span className="text-lg">
                              <ArrowDownwardIcon />
                            </span>
                          </p>
                        )}
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                      }`}
                    onClick={() => onSelectDoctor(doctor)}
                  >
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedDetail && (
        <div className="mt-6 p-6 border rounded-xl bg-gray-50 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Thông tin chi tiết bác sĩ
          </h3>

          <div className="grid gap-2 text-gray-700 text-sm">
            <p>
              <strong>Tiểu sử ngắn:</strong>{" "}
              {selectedDetail.shortBio || "Chưa có"}
            </p>
            <p>
              <strong>Bằng cấp:</strong>{" "}
              {selectedDetail.qualifications || "Chưa có"}
            </p>
            <p>
              <strong>Bằng cấp chi tiết:</strong>{" "}
              {selectedDetail.detailedQualifications || "Chưa có"}
            </p>
            <p>
              <strong>Số năm kinh nghiệm:</strong>{" "}
              {selectedDetail.experienceYears || "Không rõ"}
            </p>
            <p>
              <strong>Kinh nghiệm làm việc:</strong>{" "}
              {selectedDetail.workExperience || "Không rõ"}
            </p>
            <p>
              <strong>Học vấn:</strong> {selectedDetail.education || "Không rõ"}
            </p>
            <p>
              <strong>Chứng chỉ:</strong>{" "}
              {selectedDetail.certifications || "Không rõ"}
            </p>
            <p>
              <strong>Ấn phẩm:</strong>{" "}
              {selectedDetail.publications || "Không rõ"}
            </p>
            <p>
              <strong>Thành viên chuyên môn:</strong>{" "}
              {selectedDetail.professionalMemberships || "Không rõ"}
            </p>
            <p>
              <strong>Ngôn ngữ sử dụng:</strong>{" "}
              {selectedDetail.languagesSpoken || "Không rõ"}
            </p>
            <p>
              <strong>Phí tư vấn:</strong>{" "}
              {selectedDetail.consultationFee
                ? `${selectedDetail.consultationFee} VND`
                : "Không rõ"}
            </p>
            {selectedDetail.doctorProfilePictureUrl && (
              <img
                src={selectedDetail.doctorProfilePictureUrl}
                alt="Hình bác sĩ"
                className="w-32 h-32 rounded-full mt-4 object-cover border"
              />
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <X className="w-4 h-4 inline mr-2" />
          Hủy
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDoctor}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedDoctor
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Tiếp tục
          <ChevronRight className="w-4 h-4 inline ml-2" />
        </button>
      </div>
    </div>
  );
};

// Date and Time Selection Component

const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
  onBack,
  onCancel,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const availableTimes = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // So sánh chỉ theo ngày

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const isCurrentMonth = currentDate.getMonth() === month;
      const isPast = currentDate < today;
      const isSunday = currentDate.getDay() === 0;
      const isSelected =
        selectedDate &&
        currentDate.toDateString() === selectedDate.toDateString();

      days.push({
        date: currentDate,
        isCurrentMonth,
        isPast,
        isSelected,
        isSunday,
        day: currentDate.getDate(),
      });
    }

    return days;
  };

  const handleTimeSelect = (timeStr) => {
    if (!selectedDate) return;

    const [hour, minute] = timeStr.split(":");
    const dateWithTime = new Date(selectedDate);
    dateWithTime.setHours(parseInt(hour));
    dateWithTime.setMinutes(parseInt(minute));
    dateWithTime.setSeconds(0);
    dateWithTime.setMilliseconds(0);

    // Trả về đúng định dạng ISO 8601 như yêu cầu
    const isoTime = dateWithTime.toISOString();
    onSelectTime(isoTime);
  };

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Chọn ngày và giờ khám</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                onClick={() =>
                  !day.isPast && day.isCurrentMonth && !day.isSunday && onSelectDate(day.date)
                }
                disabled={day.isPast || !day.isCurrentMonth || day.isSunday}
                className={`p-2 text-sm rounded-lg transition-colors ${day.isSelected
                  ? "bg-blue-600 text-white"
                  : day.isCurrentMonth && !day.isPast && !day.isSunday
                    ? "hover:bg-blue-100 text-gray-900"
                    : "text-gray-400 cursor-not-allowed"
                  }`}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Chọn giờ khám</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={!selectedDate}
                className={`p-3 text-sm rounded-lg border transition-colors ${selectedTime?.includes(time)
                  ? "bg-blue-600 text-white border-blue-600"
                  : selectedDate
                    ? "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 inline mr-2" />
          Quay lại
        </button>
        <div className="space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 inline mr-2" />
            Hủy
          </button>
          <button
            onClick={onNext}
            disabled={!selectedDate || !selectedTime}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedDate && selectedTime
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Tiếp tục
            <ChevronRight className="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};


// Patient Information Component
const PatientInformation = ({
  patientInfo,
  onUpdatePatientInfo,
  onNext,
  onBack,
  onCancel,
}) => {
  const handleInputChange = (field, value) => {
    onUpdatePatientInfo({ ...patientInfo, [field]: value });
  };
  const [formErrors, setFormErrors] = useState({});
  const [isFormValidate, setIsFormValidate] = useState(false);
  const [errors, setErrors] = useState({});

  const appointmentTypeOptions = [
    { label: "Khám sức khỏe tổng quát", value: "MEDICAL_EXAMINATION" },
    { label: "Khám chuyên khoa", value: "EXAMINATION" },
    { label: "Xét nghiệm", value: "TESTS" },
    { label: "Tư vấn", value: "CONSULTATION" },
    { label: "Thủ thuật", value: "PROCEDURES" },
  ];
  const validateForm = () => {
    const errors = {};

    if (!patientInfo.name || patientInfo.name.trim().length < 2) {
      errors.name = "Họ và tên phải có ít nhất 2 ký tự.";
    } else if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(patientInfo.name)) {
      errors.name = "Tên không được chứa ký tự đặc biệt hoặc số.";
    }

    if (
      !patientInfo.appointmentType ||
      patientInfo.appointmentType.trim() === ""
    ) {
      errors.appointmentType = "Vui lòng chọn loại cuộc hẹn.";
    }

    if (!patientInfo.phone || !/^\d{9,11}$/.test(patientInfo.phone)) {
      errors.phone = "Số điện thoại không hợp lệ (9-11 chữ số).";
    }

    if (
      patientInfo.email &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(patientInfo.email)
    ) {
      errors.email = "Email không hợp lệ.";
    }

    if (!patientInfo.reason || patientInfo.reason.trim().length < 5) {
      errors.reason = "Lý do khám phải có ít nhất 5 ký tự.";
    }

    if (patientInfo.birthDate) {
      const birth = new Date(patientInfo.birthDate);
      const today = new Date();

      if (isNaN(birth.getTime())) {
        errors.birthDate = "Ngày sinh không hợp lệ.";
      } else if (birth > today) {
        errors.birthDate = "Ngày sinh không được ở tương lai.";
      }
    }

    return errors;
  };
  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);
    setIsFormValidate(Object.keys(errors).length === 0);
  }, [patientInfo]);
  const isFormValid =
    patientInfo.name &&
    patientInfo.phone &&
    patientInfo.reason &&
    patientInfo.appointmentType;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 min-h-20">
        Thông tin bệnh nhân
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên *
            </label>
            <input
              type="text"
              value={patientInfo.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập họ và tên"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <input
              type="tel"
              value={patientInfo.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập số điện thoại"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={patientInfo.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập địa chỉ email"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              value={patientInfo.birthDate || ""}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formErrors.birthDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.birthDate}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loại cuộc hẹn *
          </label>
          <select
            value={patientInfo.appointmentType || ""}
            onChange={(e) =>
              handleInputChange("appointmentType", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Chọn loại cuộc hẹn --</option>
            {appointmentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formErrors.appointmentType && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.appointmentType}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lý do khám *
            </label>
            <textarea
              value={patientInfo.reason || ""}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Mô tả triệu chứng hoặc lý do khám bệnh"
            />
            {formErrors.reason && (
              <p className="text-red-500 text-sm mt-1">{formErrors.reason}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <textarea
              value={patientInfo.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú
            </label>
            <textarea
              value={patientInfo.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Ghi chú thêm (nếu có)"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 inline mr-2" />
          Quay lại
        </button>
        <div className="space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 inline mr-2" />
            Hủy
          </button>
          <button
            onClick={onNext}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Xem lại thông tin
            <ChevronRight className="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Confirmation Component
const serviceNameMap = {
  1: "Không xác định",
  2: "Siêu âm đầu dò âm đạo theo dõi nang noãn",
  3: "Xét nghiệm tinh dịch đồ (Phân tích cơ bản)",
  4: "Xét nghiệm nội tiết tố nữ cơ bản (AMH, FSH, LH, E2)",
  5: "Thực hiện kỹ thuật IUI (Bơm tinh trùng vào buồng tử cung)",
  6: "Gói kích thích buồng trứng IVF (Thuốc + Theo dõi)",
  7: "Công thức máu",
  8: "Trữ đông tinh trùng",
  9: "Trữ đông noãn (trứng)",
  10: "Xét nghiệm Di truyền Tiền làm tổ (PGT-A)",
  11: "Tư vấn Di truyền Sinh sản",
  12: "Siêu âm thai 4D",
  13: "Khám thai định kỳ",
  14: "Xét nghiệm NIPT (Sàng lọc trước sinh không xâm lấn)",
  15: "Test",
};

const Confirmation = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  patientInfo,
  selectedService,
  onConfirm,
  onBack,
  onCancel,
  isLoading,
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAppointmentType = (type) => {
    switch (type) {
      case "MEDICAL_EXAMINATION":
        return "Khám sức khỏe tổng quát";
      case "TESTS":
        return "Xét nghiệm";
      case "CONSULTATION":
        return "Tư vấn";
      case "EXAMNINATION":
        return "Khám chuyên khoa";
      case "PROCEDURES":
        return "Thủ thuật";
      default:
        return "Khác";
    }
  };

  const getServiceName = (id) => {
    return serviceNameMap[id] || "Dịch vụ không xác định";
  };

  const getServiceTypeLabel = (type) => {
    switch (type) {
      case "Procedure":
        return "Thủ thuật";
      case "LabTest":
        return "Xét nghiệm";
      case "Package":
        return "Gói dịch vụ";
      case "Consultation":
        return "Tư vấn";
      default:
        return "Không rõ";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Xác nhận thông tin đặt lịch
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Thông tin bác sĩ & thời gian */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Bác sĩ</h3>
                <p className="text-gray-700">{selectedDoctor?.fullName}</p>
                <p className="text-sm text-blue-600">
                  {selectedDoctor?.specialty}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Ngày khám</h3>
                <p className="text-gray-700">{formatDate(selectedDate)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Giờ khám</h3>
                <p className="text-gray-700">{selectedTime}</p>
              </div>
            </div>
          </div>

          {/* Thông tin bệnh nhân */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Thông tin bệnh nhân
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Tên:</span> {patientInfo.name}
                </p>
                <p>
                  <span className="font-medium">Điện thoại:</span>{" "}
                  {patientInfo.phone}
                </p>
                {patientInfo.email && (
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {patientInfo.email}
                  </p>
                )}
                {patientInfo.birthDate && (
                  <p>
                    <span className="font-medium">Ngày sinh:</span>{" "}
                    {new Date(patientInfo.birthDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                )}
                {patientInfo.appointmentType && (
                  <p>
                    <span className="font-medium">Loại cuộc hẹn:</span>{" "}
                    <span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm font-medium">
                      <Stethoscope className="w-4 h-4 mr-1" />
                      {formatAppointmentType(patientInfo.appointmentType)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Lý do khám */}
            {patientInfo.reason && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lý do khám</h3>
                <p className="text-sm text-gray-700 bg-white p-3 rounded-lg">
                  {patientInfo.reason}
                </p>
              </div>
            )}

            {/* Dịch vụ khám */}
            {selectedService && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Dịch vụ khám
                </h3>
                <div className="bg-white p-4 rounded-lg shadow text-sm space-y-2 border border-gray-200">
                  <p>
                    <span className="font-medium text-gray-800">
                      <ClipboardList className="inline w-4 h-4 mr-1 text-indigo-500" />
                      Tên dịch vụ:
                    </span>{" "}
                    {getServiceName(selectedService.ServiceDefinitionID)}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      <FileText className="inline w-4 h-4 mr-1 text-teal-500" />
                      Loại dịch vụ:
                    </span>{" "}
                    {getServiceTypeLabel(selectedService.ServiceType)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tổng chi phí */}
        <div className="mt-6 p-4 bg-white rounded-lg border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              Tổng chi phí:
            </span>
            <span className="text-2xl font-bold text-green-600">
              {selectedDoctor?.consultationFee?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 inline mr-2" />
          Quay lại
        </button>
        <div className="space-x-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 inline mr-2" />
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Xác nhận đặt lịch
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Success Component
const Success = ({ appointmentData, onNewAppointment }) => {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Đặt lịch thành công!
        </h2>
        <p className="text-gray-600">
          Lịch khám của bạn đã được đặt thành công. Chúng tôi sẽ liên hệ với bạn
          để xác nhận trong thời gian sớm nhất.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-green-800 mb-3">Mã đặt lịch</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">
          #{appointmentData?.id || "APT001"}
        </p>
        <p className="text-sm text-green-700">
          Vui lòng lưu mã này để tra cứu thông tin lịch khám
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onNewAppointment}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Đặt lịch mới
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

// Main Component
const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    "Chọn dịch vụ",
    "Chọn bác sĩ",
    "Chọn ngày giờ",
    "Thông tin",
    "Xác nhận",
    "Hoàn thành",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [patientInfo, setPatientInfo] = useState({
    profileId: null,
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
    reason: "",
    notes: "",
  });
  useEffect(() => {
    if (user?.id) {
      setPatientInfo((prev) => ({
        ...prev,
        profileId: user.id, // BE sẽ tự hiểu đây là ID của patient
        name: user.fullName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, [user]);
  console.log("patientProfileId gửi lên:", patientInfo.profileId);
  console.log("User từ useAuth:", user);
  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Xác nhận hủy?",
      text: "Bạn có chắc chắn muốn hủy đặt lịch?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có, hủy ngay!",
      cancelButtonText: "Không",
    });

    if (result.isConfirmed) {
      // Reset form
      setCurrentStep(0);
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setPatientInfo({
        name: "",
        phone: "",
        email: "",
        birthDate: "",
        address: "",
        reason: "",
        notes: "",
      });

      // Thông báo hủy thành công
      await Swal.fire({
        title: "Đã hủy đặt lịch!",
        text: "Bạn sẽ được chuyển về trang chính.",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/homapage");
    }
  };

  //Submit
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      if (!selectedDate || !selectedTime) {
        alert("Vui lòng chọn ngày và giờ khám hợp lệ.");
        return;
      }

      if (!selectedService) {
        alert("Vui lòng chọn dịch vụ khám.");
        return;
      }

      const formatDate = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const appointmentDateTime = new Date(
        `${formatDate(selectedDate)}T${selectedTime}:00`
      );
      if (isNaN(appointmentDateTime)) {
        alert("Thời gian không hợp lệ.");
        return;
      }
      console.log("patientProfileId:", patientInfo.profileId);
      console.log("account:", localStorage.getItem("account"));

      //data gửi đi
      const appointmentData = {
        patientProfileId: patientInfo.profileId,
        doctorUserId: selectedDoctor.userId,
        serviceDefinitionId: selectedService.ServiceDefinitionID,
        appointmentDateTime: appointmentDateTime.toISOString(),
        estimatedDurationMinutes: 30,
        appointmentType: selectedService.type || "MEDICAL_EXAMINATION",
        reasonForVisit: patientInfo.symptom || "Khám tổng quát",
        notes: "Đặt lịch online",
      };
      console.log("Dữ liệu gửi đi:", appointmentData);

      await createAppointment(appointmentData);
      setAppointmentData(appointmentData);
      setCurrentStep(5);
    } catch (error) {
      console.error("Lỗi tạo lịch hẹn:", error);
      if (error.response?.data) {
        console.error("Chi tiết lỗi từ BE:", error.response.data);
        alert("Lỗi từ server: " + JSON.stringify(error.response.data));
      } else {
        alert("Lỗi không xác định, vui lòng thử lại.");
      }
    }
  };

  const handleNewAppointment = () => {
    setCurrentStep(0);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    setPatientInfo({
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      address: "",
      reason: "",
      notes: "",
    });
    setAppointmentData(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          //
          <DoctorSelection
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setSelectedDoctor}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case 1:
        return (
          <ServiceSelection
            selectedService={selectedService}
            onSelectService={(s) => setSelectedService(s)}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <PatientInformation
            patientInfo={patientInfo}
            onUpdatePatientInfo={setPatientInfo}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 4:
        return (
          <Confirmation
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedService={selectedService}
            patientInfo={patientInfo}
            onConfirm={handleConfirm}
            onBack={handleBack}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        );
      case 5:
        return (
          <Success
            appointmentData={appointmentData}
            onNewAppointment={handleNewAppointment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#6cb0ff]">
      <div className=" container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mt-20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt lịch khám bệnh
            </h1>
            <p className="text-gray-600">
              Chọn bác sĩ và thời gian phù hợp cho cuộc hên của bạn
            </p>
          </div>

          {/* Progress Steps */}
          {currentStep < 5 && (
            <div className="mb-8">
              <StepProgress
                currentStep={currentStep}
                steps={steps.slice(0, 5)}
              />
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {renderCurrentStep()}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              Cần hỗ trợ? Liên hệ với tư vấn viên ngay:{" "}
              <a href="tel:1900xxxx" className="text-blue-600 hover:underline">
                Chat tại đây!
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
