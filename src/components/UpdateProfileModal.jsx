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
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    profilePicture: null,
    profilePictureURL: "", // for preview only
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
          const formData = response.data || response;
          const data = {
            fullName: formData.fullName || user.fullName || "",
            email: formData.email || user.email || "",
            phoneNumber: formData.phoneNumber || user.phoneNumber || "",
            dateOfBirth: formData.dateOfBirth
              ? formData.dateOfBirth.split("T")[0]
              : "",
            gender: formData.gender || "",
            address: formData.address || "",
            profilePicture: null,
            profilePictureURL: formData.profilePictureURL || "",
          };
          setFormData(data);
          setOriginalData(data);
        })
        .catch((error) => {
          console.error("Error loading profile:", error);
          // Fallback to user data
          const data = {
            fullName: user.fullName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
            gender: user.gender || "",
            address: user.address || "",
            profilePicture: null,
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
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files && files[0];
      setFormData((prev) => ({
        ...prev,
        profilePicture: file || null,
        profilePictureURL: file
          ? URL.createObjectURL(file)
          : prev.profilePictureURL,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const [alert, setAlert] = useState(null);
  // Basic client-side validation
  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Họ và tên không được để trống";
    } else if (!/^([\p{L}\s]{2,100})$/u.test(formData.fullName)) {
      errors.fullName =
        "Họ và tên chỉ được chứa chữ cái và khoảng trắng, từ 2-100 ký tự";
    }
    if (!formData.email.trim()) {
      errors.email = "Email không được để trống";
    }
    if (formData.phoneNumber && !/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại phải có 10-11 chữ số";
    }
    if (formData.dateOfBirth && new Date(formData.dateOfBirth) >= new Date()) {
      errors.dateOfBirth = "Ngày sinh phải là ngày trong quá khứ";
    }
    if (formData.gender && !["Nam", "Nữ", "Khác"].includes(formData.gender)) {
      errors.gender = "Giới tính phải là Nam, Nữ hoặc Khác";
    }
    if (formData.address && formData.address.length > 500) {
      errors.address = "Địa chỉ tối đa 500 ký tự";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setAlert({
        type: "error",
        title: "Lỗi nhập liệu!",
        message: Object.values(errors).join("\n"),
      });
      setSubmitting(false);
      setTimeout(() => setAlert(null), 2500);
      return;
    }
    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("dateOfBirth", formData.dateOfBirth); // dạng yyyy-MM-dd
      form.append("gender", formData.gender);
      form.append("address", formData.address);
      if (formData.profilePicture && formData.profilePicture instanceof File) {
        form.append("profilePicture", formData.profilePicture);
      }
      const response = await updateProfile(form); // updateProfile cần hỗ trợ FormData
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
                  <label
                    htmlFor="profilePicture"
                    className="absolute bottom-4 right-0 bg-primary text-white p-2 rounded-full hover:bg-accent transition-colors cursor-pointer"
                    title="Thay đổi ảnh đại diện"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      className="hidden"
                      onChange={handleInputChange}
                      disabled={submitting}
                    />
                  </label>
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

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Nhập email"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
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
