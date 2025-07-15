import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Camera,
  Shield,
  Activity,
  Clock,
  Award,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getCurrentProfile } from "../../api/profileAPI";
import UpdateProfileModal from "../../components/UpdateProfileModal";
import { Loading, MedicalCard, Button } from "../../components/ui";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getCurrentProfile();
        setProfile(response.data || response);
      } catch (error) {
        console.error("Error loading profile:", error);
        // Fallback to user data
        setProfile(user);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  // Handle profile update success
  const handleProfileUpdateSuccess = (updatedData) => {
    setProfile(updatedData);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calculate age
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Loading
          variant="primary"
          size="large"
          text="Đang tải thông tin hồ sơ..."
          subText="Vui lòng đợi trong giây lát"
          fullScreen
        />
      </div>
    );
  }

  const profileData = profile || user || {};
  const age = calculateAge(profileData.dateOfBirth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary rounded-2xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Hồ sơ cá nhân
                </h1>
                <p className="text-gray-600">
                  Xem và quản lý thông tin cá nhân của bạn
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowUpdateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Chỉnh sửa</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                  {profileData.profilePictureURL ? (
                    <img
                      src={profileData.profilePictureURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <button
                  className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors shadow-lg"
                  title="Thay đổi ảnh đại diện"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Basic Info */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {profileData.fullName || "Chưa cập nhật"}
              </h2>
              <p className="text-gray-600 mb-4">{profileData.email}</p>

              {/* Status Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Tài khoản đã xác minh
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                  <p className="text-sm text-gray-600">Lịch hẹn</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">3</p>
                  <p className="text-sm text-gray-600">Năm thành viên</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <User className="w-6 h-6 mr-3 text-primary" />
                  Thông tin cá nhân
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Họ và tên
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profileData.fullName || "Chưa cập nhật"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">{profileData.email}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Số điện thoại
                    </label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">
                        {profileData.phoneNumber || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Ngày sinh
                    </label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800">
                        {formatDate(profileData.dateOfBirth)}
                        {age && (
                          <span className="text-gray-500 ml-2">
                            ({age} tuổi)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Giới tính
                    </label>
                    <p className="text-gray-800">
                      {profileData.gender || "Chưa cập nhật"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Trạng thái tài khoản
                    </label>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hoạt động
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Địa chỉ
                    </label>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <p className="text-gray-800">
                        {profileData.address || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-primary" />
                  Bảo mật tài khoản
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">
                          Email đã xác minh
                        </p>
                        <p className="text-sm text-green-600">
                          Tài khoản đã được xác minh qua email
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">
                          Mật khẩu mạnh
                        </p>
                        <p className="text-sm text-blue-600">
                          Mật khẩu đáp ứng tiêu chuẩn bảo mật
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Lần đăng nhập cuối
                        </p>
                        <p className="text-sm text-gray-600">
                          Hôm nay lúc 14:30
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSuccess={handleProfileUpdateSuccess}
      />
    </div>
  );
};

export default Profile;
