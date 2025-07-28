import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useClinicIntro from "../hooks/useClinicIntro";
import SocialLinks from "./ui/SocialLinks";
import logo from "../assets/images/logo.svg";
export default function Footer() {
  const { user, isAuthenticated } = useAuth();
  const { clinicIntro: clinicInfo, loading } = useClinicIntro();

  const quickLinks = [
    { path: "/", name: "Trang Chủ" },
    { path: "/about", name: "Về Chúng Tôi" },
    { path: "/services", name: "Dịch Vụ" },
    { path: "/blog", name: "Bài Viết" },
    { path: "/contact", name: "Liên Hệ" },
  ];

  const serviceLinks = [
    { path: "/services/fertility-consultation", name: "Tư vấn vô sinh" },
    { path: "/services/ivf-treatment", name: "Điều trị IVF" },
    { path: "/services/artificial-insemination", name: "Thụ tinh nhân tạo" },
    { path: "/services/hormone-therapy", name: "Liệu pháp hormone" },
    { path: "/services/fertility-testing", name: "Xét nghiệm vô sinh" },
  ];

  // Dynamic support links based on authentication status
  const getSupportLinks = () => {
    if (!isAuthenticated) {
      // Guest users
      return [
        { path: "/contact", name: "Hỗ trợ khách hàng" },
        { path: "/about", name: "Giới thiệu" },
        { path: "/services", name: "Dịch vụ của chúng tôi" },
        { path: "/privacy-policy", name: "Chính sách bảo mật" },
        { path: "/terms", name: "Điều khoản sử dụng" },
      ];
    }

    // Authenticated users (customers)
    return [
      { path: "/customer/appointments", name: "Lịch hẹn của tôi" },
      { path: "/customer/medical-records", name: "Hồ sơ y tế" },
      { path: "/customer/prescriptions", name: "Đơn thuốc" },
      { path: "/customer/profile", name: "Thông tin cá nhân" },
      { path: "/contact", name: "Hỗ trợ khách hàng" },
    ];
  };

  const supportLinks = getSupportLinks();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-[1480px] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src={logo}
                alt="Logo Ferlix"
                className="h-12 w-auto mb-4"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h3 className="text-xl font-bold text-white mb-2">
                {loading
                  ? "Đang tải..."
                  : clinicInfo?.clinicName || "Ferlix Clinic"}
              </h3>
            </div>

            {!loading && clinicInfo && (
              <div className="space-y-3 text-white/80">
                <p className="text-sm leading-relaxed">
                  {clinicInfo.description ||
                    "Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe sinh sản tốt nhất với đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại."}
                </p>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <i className="fas fa-map-marker-alt text-accent mt-1 flex-shrink-0"></i>
                    <span className="text-sm">{clinicInfo.address}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <i className="fas fa-phone text-accent flex-shrink-0"></i>
                    <a
                      href={`tel:${clinicInfo.phoneNumber}`}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {clinicInfo.phoneNumber}
                    </a>
                  </div>

                  <div className="flex items-center space-x-2">
                    <i className="fas fa-envelope text-accent flex-shrink-0"></i>
                    <a
                      href={`mailto:${clinicInfo.email}`}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {clinicInfo.email}
                    </a>
                  </div>

                  <div className="flex items-start space-x-2">
                    <i className="fas fa-clock text-accent mt-1 flex-shrink-0"></i>
                    <span className="text-sm">{clinicInfo.operatingHours}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">
                Kết nối với chúng tôi
              </h4>
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group"
                  >
                    <i className="fas fa-chevron-right text-accent mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Dịch vụ</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group"
                  >
                    <i className="fas fa-chevron-right text-accent mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              {!isAuthenticated ? "Hỗ trợ" : "Tài khoản của tôi"}
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-accent transition-colors text-sm flex items-center group"
                  >
                    <i className="fas fa-chevron-right text-accent mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Emergency Contact - Only show for authenticated users or always show hotline */}
            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h5 className="text-sm font-semibold text-accent mb-2">
                <i className="fas fa-phone-alt mr-2"></i>
                {isAuthenticated ? "Hotline bệnh nhân" : "Hotline 24/7"}
              </h5>
              <p className="text-white font-bold text-lg">
                {loading ? "..." : clinicInfo?.phoneNumber || "1900 1234"}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {isAuthenticated
                  ? "Tư vấn và hỗ trợ y tế"
                  : "Hỗ trợ khẩn cấp mọi lúc"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-[1480px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/70 text-sm">
                © 2024 {clinicInfo?.clinicName || "Ferlix Clinic"}. Bảo lưu mọi
                quyền.
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-white/50 text-xs mt-1">
                <span>Phát triển bởi SWP391 Team - FPT University</span>
                {isAuthenticated && (
                  <span className="md:border-l md:border-white/30 md:pl-4 mt-1 md:mt-0">
                    Đăng nhập với tư cách:{" "}
                    {user?.fullName || user?.name || "Khách hàng"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/terms"
                className="text-white/70 hover:text-accent transition-colors"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                to="/privacy-policy"
                className="text-white/70 hover:text-accent transition-colors"
              >
                Chính sách bảo mật
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/sitemap"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Sơ đồ trang web
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
