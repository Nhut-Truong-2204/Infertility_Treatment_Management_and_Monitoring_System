import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Clock, User, FileText, Check, X, Phone, Mail, Award, BookOpen, Languages, DollarSign } from 'lucide-react';
import instance from '../../config/axios';
import { getDoctors, getDoctorDetail } from '../../api/customer/doctorList'; // Adjust the import path as needed
const BookingAppointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    patientProfileId: 1, // Default value
    doctorUserId: 0,
    serviceDefinitionId: 1, // Default for CONSULTATION
    appointmentDateTime: '',
    estimatedDurationMinutes: 30,
    appointmentType: {
      typeName: 'EXAMINATION',
      description: 'Regular medical examination'
    },
    reasonForVisit: '',
    notes: ''
  });

  const steps = [
    { id: 1, title: 'Xác nhận lần khám', icon: Check },
    { id: 2, title: 'Chọn bác sĩ', icon: User },
    { id: 3, title: 'Chọn ngày giờ', icon: Calendar },
    { id: 4, title: 'Thông tin', icon: FileText },
    { id: 5, title: 'Xác nhận', icon: Check }
  ];

  // Fetch doctors list là một trong những bước đầu tiên

  const fetchDoctors = async (page = 0, limit = 10) => {
    setLoading(true);
    try {
      const response = await getDoctors(page = 0, limit = 10);
      if (!response.ok) {
        
        console.error("Đã có lỗi xảy ra:", error);
         throw new Error('Failed to fetch doctors');
        const data = await response.json();}
       
      if (data.success) {
        setDoctors(data.data.content || []);
      } else {
        setError('Failed to load doctors');
      }
    } catch (err) {
      setError('Error loading doctors: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctor details
  const fetchDoctorDetails = async (userId) => {
    setLoading(true);
    try {
      const response = await getDoctorDetail();
      if (!response.ok) throw new Error('Failed to fetch doctor details');
      const data = await response.json();
      if (data.success) {
        setDoctorDetails(data.data);
      } else {
        setError('Failed to load doctor details');
      }
    } catch (err) {
      setError('Error loading doctor details: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit appointment
  const submitAppointment = async () => {
    setLoading(true);
    try {
      const response = await instance.post('/api/appointments');

      if (!response.ok) throw new Error('Failed to create appointment');

      // Success - redirect to home
      window.location.href = '/';
    } catch (err) {
      setError('Error creating appointment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      if (currentStep === 1) {
        fetchDoctors();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({ ...formData, doctorUserId: doctor.userId });
    fetchDoctorDetails(doctor.userId);
    nextStep();
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Xác nhận đặt lịch khám bệnh</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Chúng tôi sẽ hướng dẫn bạn qua từng bước để đặt lịch khám bệnh một cách dễ dàng và nhanh chóng.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Quy trình đặt lịch chỉ mất vài phút và bạn sẽ nhận được xác nhận ngay lập tức.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Chọn bác sĩ</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Đang tải danh sách bác sĩ...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchDoctors}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.userId}
                    onClick={() => selectDoctor(doctor)}
                    className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        {doctor.profilePictureUrl ? (
                          <img
                            src={doctor.profilePictureUrl}
                            alt={doctor.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{doctor.fullName}</h3>
                        <p className="text-blue-600 text-sm">{doctor.specializationName}</p>
                        <p className="text-gray-600 text-sm mt-1">{doctor.shortBio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Chọn ngày và giờ khám</h2>

            {selectedDoctor && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {selectedDoctor.profilePictureUrl ? (
                      <img
                        src={selectedDoctor.profilePictureUrl}
                        alt={selectedDoctor.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{selectedDoctor.fullName}</p>
                    <p className="text-blue-600 text-sm">{selectedDoctor.specializationName}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày và giờ khám *
                </label>
                <input
                  type="datetime-local"
                  value={formData.appointmentDateTime}
                  onChange={(e) => setFormData({ ...formData, appointmentDateTime: e.target.value })}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian dự kiến (phút)
                </label>
                <select
                  value={formData.estimatedDurationMinutes}
                  onChange={(e) => setFormData({ ...formData, estimatedDurationMinutes: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={30}>30 phút</option>
                  <option value={45}>45 phút</option>
                  <option value={60}>60 phút</option>
                  <option value={90}>90 phút</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Thông tin khám bệnh</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do khám *
                </label>
                <textarea
                  value={formData.reasonForVisit}
                  onChange={(e) => setFormData({ ...formData, reasonForVisit: e.target.value })}
                  placeholder="Vui lòng mô tả triệu chứng hoặc lý do cần khám..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú thêm
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Thông tin bổ sung hoặc yêu cầu đặc biệt..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Xác nhận thông tin</h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Bác sĩ:</span>
                <span className="font-semibold">{selectedDoctor?.fullName}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Chuyên khoa:</span>
                <span className="font-semibold">{selectedDoctor?.specializationName}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Ngày giờ:</span>
                <span className="font-semibold">{formatDateTime(formData.appointmentDateTime)}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-semibold">{formData.estimatedDurationMinutes} phút</span>
              </div>

              {doctorDetails?.consultationFee && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Chi phí:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(doctorDetails.consultationFee)}</span>
                </div>
              )}

              <div className="py-2">
                <span className="text-gray-600">Lý do khám:</span>
                <p className="mt-1 text-gray-800">{formData.reasonForVisit}</p>
              </div>

              {formData.notes && (
                <div className="py-2">
                  <span className="text-gray-600">Ghi chú:</span>
                  <p className="mt-1 text-gray-600">{formData.notes}</p>
                </div>
              )}
            </div>

            {doctorDetails && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Thông tin bác sĩ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {doctorDetails.experienceYears && (
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>{doctorDetails.experienceYears} năm kinh nghiệm</span>
                    </div>
                  )}
                  {doctorDetails.userEmail && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{doctorDetails.userEmail}</span>
                    </div>
                  )}
                  {doctorDetails.userPhoneNumber && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{doctorDetails.userPhoneNumber}</span>
                    </div>
                  )}
                  {doctorDetails.languagesSpoken && (
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-blue-600" />
                      <span>{doctorDetails.languagesSpoken}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return selectedDoctor !== null;
      case 3:
        return formData.appointmentDateTime !== '';
      case 4:
        return formData.reasonForVisit.trim() !== '';
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt lịch khám bệnh</h1>
          <p className="text-gray-600">Chọn bác sĩ và thời gian phù hợp cho cuộc hẹn của bạn</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${isCompleted ? 'bg-green-500 text-white' :
                        isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}
                    `}>
                      {isCompleted ? <Check className="w-6 h-6" /> :
                        isActive ? <Icon className="w-6 h-6" /> :
                          <span className="text-sm font-semibold">{step.id}</span>}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex space-x-4">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại</span>
                </button>
              )}

              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Hủy</span>
              </button>
            </div>

            <div>
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed() || loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Đang xử lý...' : 'Tiếp tục'}
                </button>
              ) : (
                <button
                  onClick={submitAppointment}
                  disabled={!canProceed() || loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Đang đặt lịch...' : 'Xác nhận đặt lịch'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAppointment;