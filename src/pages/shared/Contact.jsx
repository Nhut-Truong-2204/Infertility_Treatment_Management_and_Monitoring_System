import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Contact = () => {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: isAuthenticated ? user?.name || "" : "",
    email: isAuthenticated ? user?.email || "" : "",
    phone: "",
    subject: "",
    message: "",
    preferredContactTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic xử lý form submission
    console.log("Form data:", formData);
    alert(
      "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
    );
  };

  return (
    <div className="bg-white py-16 sm:py-24 font-onest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-accent uppercase font-semibold text-sm tracking-widest mb-2">
            LIÊN HỆ
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg text-text-color leading-relaxed max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với
            chúng tôi qua các hình thức dưới đây hoặc điền vào form liên hệ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Thông tin liên hệ */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Thông Tin Liên Hệ
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Địa chỉ</h3>
                  <p className="text-text-color">
                    123 Đường ABC, Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Điện thoại
                  </h3>
                  <p className="text-text-color">
                    <a href="tel:+84123456789" className="hover:text-accent">
                      (+84) 123 456 789
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Email</h3>
                  <p className="text-text-color">
                    <a
                      href="mailto:contact@clinic.com"
                      className="hover:text-accent"
                    >
                      contact@clinic.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">
                    Giờ làm việc
                  </h3>
                  <p className="text-text-color">
                    Thứ 2 - Thứ 6: 8:00 - 18:00
                    <br />
                    Thứ 7: 8:00 - 12:00
                    <br />
                    Chủ nhật: Nghỉ
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency contact for authenticated users */}
            {isAuthenticated && (
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">
                  Liên hệ khẩn cấp
                </h3>
                <p className="text-red-700">
                  Hotline 24/7:{" "}
                  <a href="tel:+84987654321" className="font-bold">
                    0987 654 321
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Form liên hệ */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Gửi Tin Nhắn
            </h2>

            {isAuthenticated && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  <i className="fas fa-user-check mr-2"></i>
                  Chào {user?.name}! Thông tin của bạn đã được điền sẵn.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Nhập họ và tên"
                    readOnly={isAuthenticated}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Nhập email"
                    readOnly={isAuthenticated}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Thời gian liên hệ mong muốn
                  </label>
                  <select
                    name="preferredContactTime"
                    value={formData.preferredContactTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">Chọn thời gian</option>
                    <option value="morning">Buổi sáng (8:00 - 12:00)</option>
                    <option value="afternoon">
                      Buổi chiều (13:00 - 17:00)
                    </option>
                    <option value="evening">Buổi tối (17:00 - 20:00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Chủ đề *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Nhập chủ đề"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Tin nhắn *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Nhập tin nhắn của bạn..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Gửi Tin Nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
