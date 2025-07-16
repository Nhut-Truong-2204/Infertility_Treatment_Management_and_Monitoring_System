import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { MedicalAlert } from "../../components/ui";
import ServiceList from "../../components/guest/ServiceList";

const Services = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div
      className="bg-white py-16 sm:py-24 font-onest"
      style={{
        background:
          "linear-gradient(120deg, #f4f5ff 0%, #eaf6ff 60%, #fdeee6 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ảnh background giống hero section */}
      <img
        src="/hero-img.png"
        alt="Hero Background"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "520px",
          height: "auto",
          opacity: 0.13,
          zIndex: 0,
          pointerEvents: "none",
          objectFit: "contain",
        }}
      />
      {/* SVG background trang trí góc phải dưới */}
      <svg
        width="420"
        height="420"
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.13,
          pointerEvents: "none",
        }}
      >
        <circle cx="210" cy="210" r="210" fill="#eaf6ff" />
        <circle cx="210" cy="210" r="140" fill="#fdeee6" />
      </svg>
      {/* SVG background trang trí góc trái trên */}
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        <circle cx="160" cy="160" r="160" fill="#f4f5ff" />
        <circle cx="160" cy="160" r="90" fill="#fdeee6" />
      </svg>
      <div
        className="container mx-auto px-4"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          className="relative flex flex-col items-center justify-center mb-14 py-10 px-4"
          style={{
            background: "linear-gradient(135deg, #f4f5ff 0%, #fdeee6 100%)",
            borderRadius: "2rem",
            boxShadow: "0 8px 32px rgba(32,41,110,0.10)",
            overflow: "hidden",
          }}
        >
          <div className="absolute left-8 top-8 text-accent opacity-20 text-7xl pointer-events-none select-none">
            <i className="fas fa-stethoscope"></i>
          </div>
          <div className="absolute right-8 bottom-8 text-primary opacity-10 text-8xl pointer-events-none select-none">
            <i className="fas fa-heartbeat"></i>
          </div>
          <h3
            className="uppercase font-semibold text-sm tracking-widest mb-2 text-accent"
            style={{ letterSpacing: "2px" }}
          >
            DỊCH VỤ ĐIỀU TRỊ HIẾM MUỘN
          </h3>
          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: "Poppins, Montserrat, sans-serif",
              fontSize: "2.8rem",
              color: "#20296e",
              textShadow: "0 2px 12px #e8ebff",
            }}
          >
            Chăm Sóc Sức Khỏe Chuyên Nghiệp
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto mb-2"
            style={{
              color: "#374151",
              fontSize: "1.15rem",
              fontWeight: 500,
            }}
          >
            Đội ngũ bác sĩ tận tâm, công nghệ hiện đại và các phác đồ điều trị
            cá nhân hóa giúp bạn vững tin trên hành trình chữa trị hiếm muộn.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="inline-block px-4 py-2 rounded-full bg-accent text-white font-semibold shadow-md text-base">
              <i className="fas fa-user-md mr-2"></i>Bác sĩ chuyên môn
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-primary text-white font-semibold shadow-md text-base">
              <i className="fas fa-flask mr-2"></i>Phác đồ hiện đại
            </span>
            <span className="inline-block px-4 py-2 rounded-full bg-success text-white font-semibold shadow-md text-base">
              <i className="fas fa-heart mr-2"></i>Chăm sóc tận tâm
            </span>
          </div>
        </div>

        {/* Thông báo cho user đã đăng nhập */}
        {isAuthenticated && (
          <MedicalAlert
            type="info"
            title={`Chào mừng ${user?.name || "bạn"}!`}
            message="Bạn có thể đặt lịch hẹn trực tiếp cho các dịch vụ bên dưới."
            variant="outline"
            className="mb-8"
          />
        )}

        <ServiceList />
      </div>
    </div>
  );
};

export default Services;
