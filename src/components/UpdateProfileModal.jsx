import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Calendar,
  MapPin,
  Upload,
  Loader2,
} from "lucide-react";
import { updateProfile, getCurrentProfile } from "../api/profileAPI";
import { useAuth } from "../hooks/useAuth";
import MedicalCard from "./ui/MedicalCard";
import MedicalAlert from "./ui/MedicalAlert";

const UpdateProfileModal = ({ isOpen, onClose, onSuccess }) => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    profilePictureURL: "",
  });
  const [originalData, setOriginalData] = useState({});

  // Gender options
  const genderOptions = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
    { value: "Khác", label: "Khác" },
  ];

  // Load current profile data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setLoading(true);
      getCurrentProfile()
        .then((response) => {
          const profileData = response.data || response;
          const data = {
            fullName: profileData.fullName || user.fullName || "",
            phoneNumber: profileData.phoneNumber || user.phoneNumber || "",
            dateOfBirth: profileData.dateOfBirth
              ? profileData.dateOfBirth.split("T")[0]
              : "",
            gender: profileData.gender || "",
            address: profileData.address || "",
            profilePictureURL: profileData.profilePictureURL || "",
          };
          setFormData(data);
          setOriginalData(data);
        })
        .catch((error) => {
          console.error("Error loading profile:", error);
          // Fallback to user data
          const data = {
            fullName: user.fullName || "",
            phoneNumber: user.phoneNumber || "",
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
            gender: user.gender || "",
            address: user.address || "",
            profilePictureURL: user.profilePictureURL || "",
          };
          setFormData(data);
          setOriginalData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const [alert, setAlert] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await updateProfile(formData);
      setAlert({
        type: "success",
        title: "Cập nhật thành công!",
        message: "Thông tin hồ sơ của bạn đã được cập nhật.",
      });
      if (refreshUser) {
        await refreshUser();
      }
      if (onSuccess) {
        onSuccess(response.data);
      }
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({
        type: "error",
        title: "Có lỗi xảy ra!",
        message: error.message || "Không thể cập nhật thông tin hồ sơ.",
      });
      setTimeout(() => setAlert(null), 2500);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = useCallback(() => {
    if (submitting) return;
    setFormData(originalData);
    onClose();
  }, [submitting, originalData, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !submitting) {
      handleClose();
    }
  };

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && !submitting) {
        handleClose();
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
  }, [isOpen, submitting, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <MedicalCard className="w-full max-w-2xl max-h-[90vh] scrollable-hidden modal-container relative">
        <button
          onClick={handleClose}
          disabled={submitting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <MedicalCard.Content>
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">
                  Cập nhật hồ sơ
                </h2>
                <p className="text-gray-600">
                  Chỉnh sửa thông tin cá nhân của bạn
                </p>
              </div>
            </div>
          </div>

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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600">Đang tải thông tin...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Section */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {formData.profilePictureURL ? (
                      <img
                        src={formData.profilePictureURL}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-4 right-0 bg-primary text-white p-2 rounded-full hover:bg-accent transition-colors"
                    title="Thay đổi ảnh đại diện"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Nhập họ và tên đầy đủ"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Chọn giới tính</option>
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Địa chỉ
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Nhập địa chỉ đầy đủ"
                  />
                </div>
              </div>
            </form>
          )}
        </MedicalCard.Content>
        {!loading && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-xl">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-primary hover:bg-accent text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Cập nhật
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </MedicalCard>
    </div>
  );
};

export default UpdateProfileModal;
