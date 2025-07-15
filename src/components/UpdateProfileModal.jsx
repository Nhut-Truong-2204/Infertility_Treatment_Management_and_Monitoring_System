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
import Swal from "sweetalert2";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await updateProfile(formData);

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Cập nhật thành công!",
        text: "Thông tin hồ sơ của bạn đã được cập nhật.",
        confirmButtonColor: "#3B82F6",
      });

      // Refresh user data in context
      if (refreshUser) {
        await refreshUser();
      }

      // Call success callback
      if (onSuccess) {
        onSuccess(response.data);
      }

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra!",
        text: error.message || "Không thể cập nhật thông tin hồ sơ.",
        confirmButtonColor: "#EF4444",
      });
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
    <AnimatePresence>
      <div
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 hide-scrollbar"
        style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
        onClick={handleOverlayClick}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] scrollable-hidden modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-primary px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Cập nhật hồ sơ</h2>
                  <p className="text-white text-opacity-80">
                    Chỉnh sửa thông tin cá nhân của bạn
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={submitting}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto hide-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">
                  Đang tải thông tin...
                </span>
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
          </div>

          {/* Modal Footer */}
          {!loading && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
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
        </div>
      </div>
    </AnimatePresence>
  );
};

export default UpdateProfileModal;
