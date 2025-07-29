import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  LogOut,
  Edit3,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import UpdateProfileModal from "../../components/UpdateProfileModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import { MedicalCard, MedicalAlert, Button } from "../../components/ui";
import Swal from "sweetalert2";

const Settings = () => {
  const { user, logout } = useAuth();
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    darkMode: false,
    language: "vi",
  });

  // Handle preference changes
  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Here you could also call an API to save preferences
  };

  // Handle logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Đăng xuất?",
      text: "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      logout();
    }
  };

  const settingsSections = [
    {
      title: "Tài khoản",
      icon: User,
      items: [
        {
          label: "Thông tin cá nhân",
          description: "Cập nhật họ tên, số điện thoại, địa chỉ",
          icon: User,
          action: () => setShowUpdateProfileModal(true),
          showChevron: true,
        },
        {
          label: "Đổi mật khẩu",
          description: "Thay đổi mật khẩu đăng nhập",
          icon: Lock,
          action: () => setShowChangePasswordModal(true),
          showChevron: true,
        },
      ],
    },
    {
      title: "Thông báo",
      icon: Bell,
      items: [
        {
          label: "Email thông báo",
          description: "Nhận thông báo qua email",
          icon: Mail,
          toggle: true,
          value: preferences.emailNotifications,
          onChange: (value) =>
            handlePreferenceChange("emailNotifications", value),
        },
        {
          label: "SMS thông báo",
          description: "Nhận thông báo qua tin nhắn",
          icon: Smartphone,
          toggle: true,
          value: preferences.smsNotifications,
          onChange: (value) =>
            handlePreferenceChange("smsNotifications", value),
        },
        {
          label: "Nhắc nhở lịch hẹn",
          description: "Nhận nhắc nhở trước khi có lịch hẹn",
          icon: Bell,
          toggle: true,
          value: preferences.appointmentReminders,
          onChange: (value) =>
            handlePreferenceChange("appointmentReminders", value),
        },
        {
          label: "Email marketing",
          description: "Nhận thông tin khuyến mãi và tin tức",
          icon: Mail,
          toggle: true,
          value: preferences.marketingEmails,
          onChange: (value) => handlePreferenceChange("marketingEmails", value),
        },
      ],
    },
    {
      title: "Giao diện",
      icon: Globe,
      items: [
        {
          label: "Chế độ tối",
          description: "Chuyển đổi giao diện tối/sáng",
          icon: preferences.darkMode ? Moon : Sun,
          toggle: true,
          value: preferences.darkMode,
          onChange: (value) => handlePreferenceChange("darkMode", value),
        },
        {
          label: "Ngôn ngữ",
          description: "Thay đổi ngôn ngữ hiển thị",
          icon: Globe,
          select: true,
          value: preferences.language,
          options: [
            { value: "vi", label: "Tiếng Việt" },
            { value: "en", label: "English" },
          ],
          onChange: (value) => handlePreferenceChange("language", value),
        },
      ],
    },
    {
      title: "Bảo mật",
      icon: Shield,
      items: [
        {
          label: "Xác thực hai bước",
          description: "Tăng cường bảo mật tài khoản",
          icon: Shield,
          action: () => {
            Swal.fire({
              title: "Tính năng đang phát triển",
              text: "Tính năng xác thực hai bước sẽ được cập nhật trong phiên bản tiếp theo.",
              icon: "info",
              confirmButtonColor: "#3B82F6",
            });
          },
          showChevron: true,
          badge: "Sắp có",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-2xl">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Cài đặt</h1>
              <p className="text-gray-600">
                Quản lý tài khoản và tùy chỉnh trải nghiệm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Info Card */}
        <MedicalCard variant="medical" size="large" className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {user?.profilePictureURL ? (
                <img
                  src={user.profilePictureURL}
                  alt={user.fullName || "User"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : user?.fullName ? (
                user.fullName.charAt(0).toUpperCase()
              ) : (
                "U"
              )}
            </div>
            <div className="flex-1">
              <MedicalCard.Title className="text-xl">
                {user?.fullName || "Người dùng"}
              </MedicalCard.Title>
              <MedicalCard.Description className="text-gray-600">
                {user?.email}
              </MedicalCard.Description>
              <p className="text-sm text-gray-500">
                Thành viên từ {new Date().getFullYear()}
              </p>
            </div>
            <Button
              variant="medical"
              onClick={() => setShowUpdateProfileModal(true)}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          </div>
        </MedicalCard>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <MedicalCard
              key={sectionIndex}
              variant="professional"
              size="large"
              className="overflow-hidden"
            >
              <MedicalCard.Header className="border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <section.icon className="w-6 h-6 text-primary" />
                  <MedicalCard.Title className="text-xl">
                    {section.title}
                  </MedicalCard.Title>
                </div>
              </MedicalCard.Header>

              <div className="divide-y divide-gray-200">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      item.action ? "cursor-pointer" : ""
                    }`}
                    onClick={item.action}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <item.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">
                              {item.label}
                            </h3>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Toggle Switch */}
                        {item.toggle && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              item.onChange(!item.value);
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value ? "bg-primary" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.value ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        )}

                        {/* Select Dropdown */}
                        {item.select && (
                          <select
                            value={item.value}
                            onChange={(e) => {
                              e.stopPropagation();
                              item.onChange(e.target.value);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {item.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Chevron for clickable items */}
                        {item.showChevron && (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCard>
          ))}
        </div>

        {/* Logout Section */}
        <MedicalCard
          variant="professional"
          size="large"
          className="mt-6 border-red-200 hover:border-red-300 transition-colors"
        >
          <div
            className="p-6 hover:bg-red-50 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-red-900">Đăng xuất</h3>
                  <p className="text-sm text-red-600">
                    Thoát khỏi tài khoản hiện tại
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </MedicalCard>
      </div>

      {/* Modals */}
      <UpdateProfileModal
        isOpen={showUpdateProfileModal}
        onClose={() => setShowUpdateProfileModal(false)}
        onSuccess={() => {
          // Optionally refresh user data or show success message
        }}
      />

      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </div>
  );
};

export default Settings;
