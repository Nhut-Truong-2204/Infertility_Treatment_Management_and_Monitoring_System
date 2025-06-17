import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, ArrowLeft, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { getPublicDoctors } from "./doctorList";

// Mock API functions (thay thế bằng các hàm API thực tế của bạn)
const mockApiCalls = {
  getProtocolById: (patientId) => Promise.resolve({ data: [] }),
  createProtocol: (data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
  updateProtocol: (id, data) => Promise.resolve({ data: { id, ...data } }),
  getProtocol: (id) => Promise.resolve({ data: { id, name: 'Protocol ' + id } }),
  addStepToProtocol: (protocolId, data) => Promise.resolve({ data: { id: Date.now(), ...data } }),
  updateStep: (protocolId, stepId, data) => Promise.resolve({ data: { id: stepId, ...data } }),
  deleteStep: (protocolId, stepId) => Promise.resolve({ data: { success: true } }),
  activateProtocol: (id) => Promise.resolve({ data: { id, status: 'active' } })
};

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
                  ? 'bg-blue-600 text-white'
                  : index === currentStep
                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                    : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded transition-all duration-200 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Doctor Selection Component
const DoctorSelection = ({ selectedDoctor, onSelectDoctor, onNext, onCancel }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPublicDoctors()
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách bác sĩ:", err);
        setError("Không thể tải danh sách bác sĩ.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn bác sĩ</h2>

      {loading && <p>Đang tải danh sách bác sĩ...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedDoctor?.id === doctor.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
              onClick={() => onSelectDoctor(doctor)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">👨‍⚕️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {doctor.fullName}
                  </h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty || "Chưa rõ chuyên khoa"}</p>
                  <p className="text-gray-600 text-sm">{doctor.experience || "Kinh nghiệm chưa rõ"}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="flex items-center text-yellow-500">⭐ {doctor.rating || 5.0}</span>
                    <span className="text-green-600 font-semibold">{doctor.price || "Liên hệ"}</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 ${selectedDoctor?.id === doctor.id
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-300"
                  }`}>
                  {selectedDoctor?.id === doctor.id && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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
const DateTimeSelection = ({ selectedDate, selectedTime, onSelectDate, onSelectTime, onNext, onBack, onCancel }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
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

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const isCurrentMonth = currentDate.getMonth() === month;
      const isPast = currentDate < today;
      const isSelected = selectedDate &&
        currentDate.toDateString() === selectedDate.toDateString();

      days.push({
        date: currentDate,
        isCurrentMonth,
        isPast,
        isSelected,
        day: currentDate.getDate()
      });
    }

    return days;
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

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
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                onClick={() => !day.isPast && day.isCurrentMonth && onSelectDate(day.date)}
                disabled={day.isPast || !day.isCurrentMonth}
                className={`p-2 text-sm rounded-lg transition-colors ${day.isSelected
                  ? 'bg-blue-600 text-white'
                  : day.isCurrentMonth && !day.isPast
                    ? 'hover:bg-blue-100 text-gray-900'
                    : 'text-gray-400 cursor-not-allowed'
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
                onClick={() => onSelectTime(time)}
                disabled={!selectedDate}
                className={`p-3 text-sm rounded-lg border transition-colors ${selectedTime === time
                  ? 'bg-blue-600 text-white border-blue-600'
                  : selectedDate
                    ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
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
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
const PatientInformation = ({ patientInfo, onUpdatePatientInfo, onNext, onBack, onCancel }) => {
  const handleInputChange = (field, value) => {
    onUpdatePatientInfo({ ...patientInfo, [field]: value });
  };

  const isFormValid = patientInfo.name && patientInfo.phone && patientInfo.reason;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Thông tin bệnh nhân</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên *
            </label>
            <input
              type="text"
              value={patientInfo.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại *
            </label>
            <input
              type="tel"
              value={patientInfo.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={patientInfo.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập địa chỉ email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              value={patientInfo.birthDate || ''}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lý do khám *
            </label>
            <textarea
              value={patientInfo.reason || ''}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Mô tả triệu chứng hoặc lý do khám bệnh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <textarea
              value={patientInfo.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
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
              value={patientInfo.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
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
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
const Confirmation = ({ selectedDoctor, selectedDate, selectedTime, patientInfo, onConfirm, onBack, onCancel, isLoading }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Xác nhận thông tin đặt lịch</h2>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Bác sĩ</h3>
                <p className="text-gray-700">{selectedDoctor?.name}</p>
                <p className="text-sm text-blue-600">{selectedDoctor?.specialty}</p>
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

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Thông tin bệnh nhân</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Tên:</span> {patientInfo.name}</p>
                <p><span className="font-medium">Điện thoại:</span> {patientInfo.phone}</p>
                {patientInfo.email && <p><span className="font-medium">Email:</span> {patientInfo.email}</p>}
                {patientInfo.birthDate && <p><span className="font-medium">Ngày sinh:</span> {new Date(patientInfo.birthDate).toLocaleDateString('vi-VN')}</p>}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Lý do khám</h3>
              <p className="text-sm text-gray-700 bg-white p-3 rounded-lg">{patientInfo.reason}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Tổng chi phí:</span>
            <span className="text-2xl font-bold text-green-600">{selectedDoctor?.price}</span>
          </div>
        </div>
      </div>

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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h2>
        <p className="text-gray-600">
          Lịch khám của bạn đã được đặt thành công. Chúng tôi sẽ liên hệ với bạn để xác nhận trong thời gian sớm nhất.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-green-800 mb-3">Mã đặt lịch</h3>
        <p className="text-2xl font-bold text-green-600 mb-4">#{appointmentData?.id || 'APT001'}</p>
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
          onClick={() => window.location.href = '/'}
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
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    birthDate: '',
    address: '',
    reason: '',
    notes: ''
  });
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = ['Chọn bác sĩ', 'Chọn ngày giờ', 'Thông tin', 'Xác nhận', 'Hoàn thành'];

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

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt lịch?')) {
      // Reset form
      setCurrentStep(0);
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setPatientInfo({
        name: '',
        phone: '',
        email: '',
        birthDate: '',
        address: '',
        reason: '',
        notes: ''
      });
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      const appointmentData = {
        id: 'APT' + Date.now(),
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        patient: patientInfo,
        status: 'confirmed'
      };

      // Mock API call using the provided functions
      await mockApiCalls.createProtocol(appointmentData);

      setAppointmentData(appointmentData);
      setCurrentStep(4);
    } catch (error) {
      alert('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAppointment = () => {
    setCurrentStep(0);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setPatientInfo({
      name: '',
      phone: '',
      email: '',
      birthDate: '',
      address: '',
      reason: '',
      notes: ''
    });
    setAppointmentData(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DoctorSelection
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setSelectedDoctor}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case 1:
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
      case 2:
        return (
          <PatientInformation
            patientInfo={patientInfo}
            onUpdatePatientInfo={setPatientInfo}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <Confirmation
            selectedDoctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            patientInfo={patientInfo}
            onConfirm={handleConfirm}
            onBack={handleBack}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        );
      case 4:
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mt-20 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
          {currentStep < 4 && (
            <div className="mb-8">
              <StepProgress currentStep={currentStep} steps={steps.slice(0, 4)} />
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {renderCurrentStep()}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              Cần hỗ trợ? Liên hệ với tư vấn viên ngay:{' '}
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