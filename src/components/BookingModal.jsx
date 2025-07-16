import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; // Sử dụng hook mới
import axios from "../config/axios";
import MedicalAlert from "./ui/MedicalAlert";
import MedicalCard from "./ui/MedicalCard";

// Import UI components
import Button from "./ui/Button";
import { Loading } from "./ui";

// Import các component con
import Step1ServiceDefinition from "./booking/Step1ServiceDefinition";
import Step2DateTime from "./booking/Step2DateTime";
import Step3Doctor from "./booking/Step3Doctor";
import Step4Confirmation from "./booking/Step4Confirmation";

const TOTAL_STEPS = 4; // Giảm từ 6 xuống 4 bước

const BookingModal = ({ isOpen, onClose }) => {
  const { user, loading } = useAuth(); // Sử dụng hook mới
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      // Hard code các giá trị mặc định cho Step1 và Step2
      setFormData({
        appointmentType: {
          typeName: "MEDICAL_EXAM",
          description: "Khám bệnh tổng quát hoặc chuyên khoa",
        },
        serviceType: {
          typeName: "CONSULTATION",
          description: "Khám bệnh",
        },
      });
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
    return (
      <Loading
        fullScreen
        variant="appointment"
        type="appointment"
        text="Đang tải..."
      />
    );
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
      case 1: // Step3ServiceDefinition
        return !formData.serviceDefinition;
      case 2: // Step4DateTime
        return !formData.date || !formData.shift || !isSelectedTimeValid();
      case 3: // Step5Doctor
        return !formData.doctor;
      case 4: // Step6Confirmation
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
          <Step1ServiceDefinition onSelect={handleSelect} formData={formData} />
        );
      case 2:
        return <Step2DateTime onSelect={handleSelect} formData={formData} />;
      case 3:
        return <Step3Doctor onSelect={handleSelect} formData={formData} />;
      case 4:
        return (
          <Step4Confirmation onSelect={handleSelect} formData={formData} />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    console.log("User object:", user); // Debug log

    if (!user) {
      setAlert({
        type: "error",
        title: "Lỗi",
        message: "Vui lòng đăng nhập để đặt lịch hẹn.",
      });
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
      setAlert({
        type: "error",
        title: "Lỗi",
        message: "Không tìm thấy thông tin bệnh nhân. Vui lòng đăng nhập lại.",
      });
      return;
    }

    // Kiểm tra thời gian được chọn có hợp lệ không
    if (!isSelectedTimeValid()) {
      setAlert({
        type: "error",
        title: "Lỗi",
        message: "Thời gian đã chọn đã qua. Vui lòng chọn thời gian khác.",
      });
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
      setAlert({
        type: "success",
        title: "Thành công!",
        message: "Lịch hẹn của bạn đã được tạo thành công.",
      });
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 2000);
    } catch (error) {
      setAlert({
        type: "error",
        title: "Lỗi!",
        message: error.response?.data?.message || "Không thể tạo lịch hẹn.",
      });
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
      <MedicalCard
        variant="medical"
        size="large"
        shadow="xl"
        className="w-full max-w-2xl relative max-h-[90vh] scrollable-hidden modal-container transition-all duration-300 transform scale-100"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10"
        >
          <i className="fas fa-times text-xl"></i>
        </Button>

        <MedicalCard.Header>
          <span className="text-sm font-medium text-accent">
            Bước {currentStep} trên {TOTAL_STEPS}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </MedicalCard.Header>

        {alert && (
          <MedicalAlert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            dismissible
            onDismiss={() => setAlert(null)}
            className="mb-4"
          />
        )}

        <MedicalCard.Content>
          <div className="min-h-[300px]">{renderStepContent()}</div>
        </MedicalCard.Content>

        <MedicalCard.Footer>
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
        </MedicalCard.Footer>
      </MedicalCard>
    </div>
  );
};

export default BookingModal;
