import React from "react";
import useClinicInfo from "../../hooks/useClinicIntro";
import { MedicalLoading, MedicalAlert, MedicalCard } from "../../components/ui";

const AboutUs = () => {
  const { clinicIntro: clinicInfo, loading, error } = useClinicInfo();

  // Xử lý trạng thái tải và lỗi
  if (loading) {
    return (
      <MedicalLoading
        variant="primary"
        fullScreen
        message="Đang tải thông tin phòng khám..."
      />
    );
  }

  if (error || !clinicInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="container mx-auto px-4 max-w-md">
          <MedicalAlert
            type="error"
            title="Không thể tải thông tin"
            message={
              error?.response?.data?.message ||
              "Không thể tải thông tin phòng khám. Vui lòng thử lại sau."
            }
            className="shadow-lg"
          />
        </div>
      </div>
    );
  }

  // Chuyển đổi chuỗi JSON thành mảng nếu có
  const additionalImages = clinicInfo.additionalImagesJSON
    ? JSON.parse(clinicInfo.additionalImagesJSON)
    : [];

  return (
    <div className="bg-white py-16 sm:py-24 font-onest">
      <div className="container mx-auto px-4">
        {/* Phần Giới Thiệu Chính */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <img
              src={clinicInfo.logoURL || "https://via.placeholder.com/500x500"}
              alt={`Logo của ${clinicInfo.clinicName}`}
              className="rounded-2xl shadow-lg object-cover w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-accent uppercase font-semibold text-sm tracking-widest mb-2">
              VỀ CHÚNG TÔI
            </h3>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              {clinicInfo.clinicName}
            </h1>
            <p className="text-lg text-text-color leading-relaxed">
              {clinicInfo.description}
            </p>
            <div className="mt-6 space-y-3 text-text-color">
              <p>
                <strong>
                  <i className="fa-solid fa-location-dot text-accent mr-2"></i>
                  Địa chỉ:
                </strong>{" "}
                {clinicInfo.address}
              </p>
              <p>
                <strong>
                  <i className="fa-solid fa-envelope text-accent mr-2"></i>
                  Email:
                </strong>{" "}
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="hover:underline"
                >
                  {clinicInfo.email}
                </a>
              </p>
              <p>
                <strong>
                  <i className="fa-solid fa-phone text-accent mr-2"></i>Điện
                  thoại:
                </strong>{" "}
                <a
                  href={`tel:${clinicInfo.phoneNumber}`}
                  className="hover:underline"
                >
                  {clinicInfo.phoneNumber}
                </a>
              </p>
              <p>
                <strong>
                  <i className="fa-solid fa-clock text-accent mr-2"></i>Giờ làm
                  việc:
                </strong>{" "}
                {clinicInfo.operatingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Phần Giải Thưởng và Chứng Nhận */}
        {clinicInfo.awardsAndCertifications && (
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Giải Thưởng & Chứng Nhận
            </h2>
            <p className="max-w-3xl mx-auto text-text-color">
              {clinicInfo.awardsAndCertifications}
            </p>
          </div>
        )}

        {/* Thư viện ảnh bổ sung */}
        {additionalImages.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Hình Ảnh Phòng Khám
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalImages.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Hình ảnh phòng khám ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {clinicInfo.mapEmbedURL && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">
              Tìm chúng tôi trên bản đồ
            </h2>
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={clinicInfo.mapEmbedURL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
