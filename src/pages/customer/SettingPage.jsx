import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  Globe,
  Palette,
  Moon,
  Sun,
} from "lucide-react";
import instance from "../../config/axios";
import ProfileUser from "../customer/ProfileUser";
import Swal from "sweetalert2";
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phoneNumber: "",
    roleId: 0,
    accountStatus: "ACTIVE",
    dateOfBirth: "",
    gender: "",
    address: "",
    profilePictureURL: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "profile", name: "Hồ Sơ", icon: User },
    { id: "security", name: "Bảo Mật", icon: Shield },
    { id: "notifications", name: "Thông Báo", icon: Bell },
    { id: "appearance", name: "Giao Diện", icon: Palette },
  ];

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return Swal.fire("Lỗi", "Vui lòng điền đầy đủ thông tin.", "warning");
    }

    if (newPassword.length < 6) {
      return Swal.fire(
        "Lỗi",
        "Mật khẩu mới phải có ít nhất 6 ký tự.",
        "warning"
      );
    }

    if (newPassword !== confirmNewPassword) {
      return Swal.fire("Lỗi", "Xác nhận mật khẩu không khớp.", "warning");
    }

    setIsLoading(true);
    Swal.fire({
      title: "Đang đổi mật khẩu...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    try {
      const response = await instance.post("/api/auth/change-password");

      if (response.success) {
        Swal.fire("Thành công", "Mật khẩu đã được thay đổi.", "success");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        Swal.fire(
          "Lỗi",
          response.message || "Không thể đổi mật khẩu.",
          "error"
        );
      }
    } catch (err) {
      console.error("Lỗi đổi mật khẩu:", err);
      Swal.fire("Lỗi", "Không thể kết nối đến máy chủ.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthProgress = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const percent = (score / 5) * 100;
    let color = "bg-red-500";
    if (score === 3) color = "bg-yellow-500";
    if (score === 4) color = "bg-yellow-400";
    if (score === 5) color = "bg-green-500";

    return { percent, color };
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="">
            <ProfileUser />
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  Để đảm bảo an toàn, hãy sử dụng mật khẩu mạnh và không chia sẻ
                  với ai khác.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {passwordForm.newPassword && (
                    <div className="mt-2">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getPasswordStrengthProgress(
                            passwordForm.newPassword
                          ).color
                            }`}
                          style={{
                            width: `${getPasswordStrengthProgress(
                              passwordForm.newPassword
                            ).percent
                              }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1 text-gray-600">
                        Mức độ bảo mật:{" "}
                        {
                          getPasswordStrengthProgress(passwordForm.newPassword)
                            .percent
                        }
                        % an toàn
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmNewPassword: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={isLoading}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Bảo mật tài khoản</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Xác thực hai yếu tố (2FA)</span>
                  <button className="text-blue-600 text-sm hover:underline">
                    Bật
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Phiên đăng nhập</span>
                  <button className="text-blue-600 text-sm hover:underline">
                    Quản lý
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Cài đặt thông báo</h3>

            <div className="space-y-4">
              {Object.entries({
                email: { label: "Email", desc: "Nhận thông báo qua email" },
                push: {
                  label: "Push notification",
                  desc: "Thông báo đẩy trên trình duyệt",
                },
                sms: { label: "SMS", desc: "Thông báo qua tin nhắn" },
                marketing: {
                  label: "Marketing",
                  desc: "Nhận thông tin khuyến mãi",
                },
              }).map(([key, { label, desc }]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Giao diện</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                  <div>
                    <p className="font-medium">Chế độ tối</p>
                    <p className="text-sm text-gray-600">
                      Chuyển sang giao diện tối
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Globe className="w-5 h-5" />
                  <p className="font-medium">Ngôn ngữ</p>
                </div>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-3">Màu chủ đề</p>
                <div className="flex space-x-3">
                  {["blue", "green", "purple", "red", "orange"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full bg-${color}-500 hover:scale-110 transition-transform`}
                      onClick={() => console.log(`Selected ${color} theme`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Cài đặt tài khoản
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý thông tin cá nhân và tùy chọn bảo mật
            </p>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "hover:bg-gray-100 text-gray-700"
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{tab.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
