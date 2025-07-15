import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; // Sử dụng hook mới
import axios from "../config/axios";
import Swal from "sweetalert2";

// Import UI components
import Button from "./ui/Button";
import GlobalLoading from "./ui/GlobalLoading";

// Import các component con
import Step2ServiceType from "./booking/Step2ServiceType";
import Step3ServiceDefinition from "./booking/Step3ServiceDefinition";
import Step1AppointmentType from "./booking/Step1AppointmentType";
import Step4DateTime from "./booking/Step4DateTime"; // Đã đổi tên
import Step5Doctor from "./booking/Step5Doctor"; // Đã đổi tên
import Step6Confirmation from "./booking/Step6Confirmation";

const TOTAL_STEPS = 6;

const BookingModal = ({ isOpen, onClose }) => {
  const { user, loading } = useAuth(); // Sử dụng hook mới
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({});
    }
  }, [isOpen]);
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  if (loading) {
    return <GlobalLoading isLoading={true} />;
  }

  // Hàm xử lý click overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSelect = (field, value) => {
    console.log(`Selecting ${field}:`, value); // Debug log
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      console.log("Updated formData:", updated); // Debug log
      return updated;
    });
  };
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Kiểm tra xem thời gian được chọn có hợp lệ không (trong tương lai)
  const isSelectedTimeValid = () => {
    if (!formData.date || !formData.shift) return true;

    const selectedDate = new Date(formData.date);
    const today = new Date();

    // Nếu ngày được chọn là trong tương lai, hợp lệ
    if (selectedDate.toDateString() !== today.toDateString()) {
      return selectedDate > today;
    }

    // Nếu là ngày hôm nay, kiểm tra thời gian
    const currentTime = today.getHours() * 60 + today.getMinutes();

    // Parse startTime từ string "HH:MM"
    const [hours, minutes] = formData.shift.startTime.split(":").map(Number);
    const shiftStartTime = hours * 60 + minutes;

    return shiftStartTime > currentTime;
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !formData.appointmentType;
      case 2:
        return !formData.serviceType || !formData.serviceType.typeName;
      case 3:
        return !formData.serviceDefinition;
      case 4:
        return !formData.date || !formData.shift || !isSelectedTimeValid();
      case 5:
        return !formData.doctor;
      case 6:
        return (
          !formData.reasonForVisit || formData.reasonForVisit.trim() === ""
        );
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1AppointmentType onSelect={handleSelect} formData={formData} />
        );
      case 2:
        return <Step2ServiceType onSelect={handleSelect} formData={formData} />;
      case 3:
        return (
          <Step3ServiceDefinition onSelect={handleSelect} formData={formData} />
        );
      case 4:
        return <Step4DateTime onSelect={handleSelect} formData={formData} />;
      case 5:
        return <Step5Doctor onSelect={handleSelect} formData={formData} />;
      case 6:
        return (
          <Step6Confirmation onSelect={handleSelect} formData={formData} />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    console.log("User object:", user); // Debug log

    if (!user) {
      Swal.fire("Lỗi", "Vui lòng đăng nhập để đặt lịch hẹn.", "error");
      return;
    }

    // Kiểm tra patientProfileId - thử nhiều trường có thể
    const patientProfileId =
      user.patientId ||
      user.id ||
      user.userId ||
      user.patientProfileId ||
      user.profileId;
    console.log("Patient Profile ID:", patientProfileId); // Debug log

    if (!patientProfileId) {
      Swal.fire(
        "Lỗi",
        "Không tìm thấy thông tin bệnh nhân. Vui lòng đăng nhập lại.",
        "error"
      );
      return;
    }

    // Kiểm tra thời gian được chọn có hợp lệ không
    if (!isSelectedTimeValid()) {
      Swal.fire(
        "Lỗi",
        "Thời gian đã chọn đã qua. Vui lòng chọn thời gian khác.",
        "error"
      );
      return;
    }

    // Tạo chuỗi thời gian ISO từ date và startTime
    const { date, shift } = formData;

    // appointmentDateTime sẽ là startTime của shift đã chọn
    // Format: YYYY-MM-DDTHH:MM:SS (LocalDateTime format with seconds)
    const appointmentDateTime = `${date}T${shift.startTime}:00`;

    const payload = {
      patientProfileId: patientProfileId,
      doctorUserId: formData.doctor,
      serviceDefinitionId: formData.serviceDefinition.serviceDefinitionId,
      appointmentDateTime: appointmentDateTime,
      estimatedDurationMinutes:
        formData.serviceDefinition.estimatedDurationMinutes,
      appointmentType: {
        typeName: formData.appointmentType.typeName, // Sử dụng appointment type đã chọn
        description: formData.appointmentType.description,
      },
      reasonForVisit: formData.reasonForVisit,
      notes: formData.notes || "",
    };

    console.log("Payload being sent:", payload); // Debug log

    setIsSubmitting(true);
    try {
      await axios.post("/api/customer/appointments", payload);
      Swal.fire(
        "Thành công!",
        "Lịch hẹn của bạn đã được tạo thành công.",
        "success"
      );
      onClose();
    } catch (error) {
      Swal.fire(
        "Lỗi!",
        error.response?.data?.message || "Không thể tạo lịch hẹn.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-2xl relative max-h-[90vh] scrollable-hidden modal-container transition-all duration-300 transform scale-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10"
        >
          <i className="fas fa-times text-xl"></i>
        </Button>

        <div className="mb-6">
          <span className="text-sm font-medium text-accent">
            Bước {currentStep} trên {TOTAL_STEPS}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="min-h-[300px]">{renderStepContent()}</div>

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            className={currentStep === 1 ? "invisible" : ""}
            disabled={currentStep === 1}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Quay Lại
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button
              variant="modal"
              onClick={nextStep}
              disabled={isNextDisabled()}
              className="ml-auto"
            >
              Tiếp Tục
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={isNextDisabled()}
              loading={isSubmitting}
              className="ml-auto"
            >
              <i className="fas fa-check mr-2"></i>
              {isSubmitting ? "Đang xử lý..." : "Xác Nhận Lịch Hẹn"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
