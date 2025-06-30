import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Image,
  Save,
  AlertCircle,
  CheckCircle,
  Camera,
} from "lucide-react";
import instance from "../../config/axios";



import Cookies from "js-cookie";

const UserProfileEditor = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    roleId: 0,
    accountStatus: "ACTIVE",
    dateOfBirth: "",
    gender: "",
    address: "",
    profilePictureURL: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // ✅ Gửi request GET tới API
        const response = await instance.get("/api/auth/information");

        console.log("📥 Kết quả response: ", response.data.data);

        if (response.data && response.data.success && response.data.data) {
          const userData = response.data.data;

          // Kiểm tra các trường bắt buộc theo response mới
          const requiredKeys = [
            "id",
            "fullName",
            "email",
            "phoneNumber",
            "roleId",
            "roleName",
            "address",
            "patientId"
          ];

          const hasAllKeys = requiredKeys.every((key) => key in userData);

          if (!hasAllKeys) {
            throw new Error("❌ Dữ liệu JSON thiếu một số trường cần thiết");
          }

          // ✅ Cập nhật dữ liệu vào formData
          setFormData((prev) => ({
            ...prev,
            fullName: userData.fullName || "",
            phoneNumber: userData.phoneNumber || "",
            roleId: userData.roleId || 0,
            address: userData.address || "",
            // Các trường không có trong API thì giữ nguyên giá trị mặc định
          }));
        } else {
          throw new Error("❌ Phản hồi không hợp lệ từ server");
        }
      } catch (error) {
        console.error("⚠️ Lỗi khi lấy thông tin người dùng:", error);
        setMessage({
          type: "error",
          text: "Không thể tải thông tin người dùng",
        });
      }
    };

    loadUserData();
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Ngày sinh không được để trống";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cập nhật thông tin
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await instance.put("/api/auth/profile", formData);
      console.log("Dữ liệu gửi lên:", formData);

      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        setFormData(response.data.data); // cập nhật lại form nếu có thay đổi
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Có lỗi xảy ra",
        });
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      setMessage({
        type: "error",
        text: "Không thể cập nhật thông tin. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePictureURL: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Chỉnh Sửa Thông Tin
          </h1>
          <p className="text-gray-600">Cập nhật thông tin cá nhân của bạn</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <User className="mr-3" size={24} />
              Thông Tin Cá Nhân
            </h2>
          </div>

          <div className="p-8">
            {/* Alert Messages */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center ${message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
                  }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                ) : (
                  <AlertCircle className="mr-3 flex-shrink-0" size={20} />
                )}
                {message.text}
              </div>
            )}

            {/* Profile Picture Section */}
            <div className="mb-8 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4 shadow-lg">
                  {formData.profilePictureURL ? (
                    <img
                      src={formData.profilePictureURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">
                Nhấp vào biểu tượng camera để thay đổi ảnh
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Họ và tên */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none ${errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Nhập họ và tên"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Ngày sinh */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày sinh *
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Giới tính */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giới tính *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none ${errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              {/* Trạng thái tài khoản */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trạng thái tài khoản
                </label>
                <select
                  name="accountStatus"
                  value={formData.accountStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                >
                  <option value="ACTIVE">Hoạt động</option>
                  <option value="INACTIVE">Không hoạt động</option>
                  <option value="SUSPENDED">Tạm khóa</option>
                </select>
              </div>

              {/* Địa chỉ */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>

              {/* URL ảnh đại diện */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL ảnh đại diện
                </label>
                <div className="relative">
                  <Image
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="url"
                    name="profilePictureURL"
                    value={formData.profilePictureURL}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Nhập URL ảnh đại diện"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={20} />
                      Cập nhật thông tin
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileEditor;
