import { useState } from "react";

export const useBookingStep = () => {
  // ✅ Bắt đầu luôn từ bước 2 (chọn ngày/giờ)
  const [currentStep, setCurrentStep] = useState(2);

  // ❌ selectedService không dùng nữa nhưng có thể giữ nếu tái sử dụng
  const [selectedService, setSelectedService] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const [formData, setFormData] = useState({
    // ✅ Gán mặc định appointmentType = 1
    appointmentType: 1,
  });

  const handleBack = () => {
    switch (currentStep) {
      case 5:
        // clear appointmentData tại BookingAppointment nếu cần
        break;
      case 4:
        setFormData({ appointmentType: 1 }); // giữ lại giá trị mặc định
        break;
      case 3:
        setSelectedDoctor(null);
        setDoctorDetails(null);
        break;
      case 2:
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedShift(null);
        break;
      default:
        break;
    }

    // ✅ Không cho quay lại bước 1
    setCurrentStep((prev) => Math.max(2, prev - 1));
  };

  return {
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
  };
};
