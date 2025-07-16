import React, { useEffect, useState } from "react";
import Loading from "../ui/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { getDoctors } from "../../api/doctorList";
import {
  MEDICAL_COLORS,
  MEDICAL_GRADIENTS,
  MEDICAL_SHADOWS,
  MEDICAL_BORDER_RADIUS,
  MEDICAL_THEMES,
  MEDICAL_ANIMATIONS,
  MEDICAL_SPACING,
  MEDICAL_TYPOGRAPHY,
} from "../../styles/medicalTheme";

const DoctorCarousel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Không thể tải danh sách bác sĩ.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          padding: "2rem 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading
          variant="treatment"
          size="large"
          text="Đang tải danh sách bác sĩ..."
          type="spinner"
        />
      </div>
    );
  if (error) return <div>{error}</div>;

  // Tone màu điều trị hiếm muộn
  const theme = MEDICAL_THEMES.treatment;
  return (
    <div
      className="doctor-carousel-container"
      style={{ width: "100%", padding: "2rem 0" }}
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <span
          style={{
            display: "inline-block",
            padding: "0.5rem 2.5rem",
            background: MEDICAL_GRADIENTS.primary,
            color: MEDICAL_COLORS.accent[50],
            fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
            fontSize: MEDICAL_TYPOGRAPHY.sizes["2xl"],
            fontWeight: 700,
            borderRadius: MEDICAL_BORDER_RADIUS.xl,
            boxShadow: MEDICAL_SHADOWS.accent,
            letterSpacing: "1px",
            textShadow: "0 2px 8px rgba(32,41,110,0.12)",
            border: `2px solid ${MEDICAL_COLORS.accent[500]}`,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "-1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "2rem",
              color: MEDICAL_COLORS.accent[500],
              opacity: 0.25,
            }}
          >
            ★
          </span>
          Đội ngũ bác sĩ chuyên môn
          <span
            style={{
              position: "absolute",
              right: "-1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "2rem",
              color: MEDICAL_COLORS.accent[500],
              opacity: 0.25,
            }}
          >
            ★
          </span>
        </span>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={32}
        slidesPerView={3}
        loop={true}
        speed={700}
        autoplay={{ delay: 1800, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: "1.5rem" }}
      >
        {doctors.map((doctor) => (
          <SwiperSlide key={doctor.userId}>
            <div
              className="doctor-card"
              style={{
                background: MEDICAL_GRADIENTS.gentle,
                borderRadius: MEDICAL_BORDER_RADIUS["2xl"],
                boxShadow: MEDICAL_SHADOWS.accent,
                border: `2px solid ${theme.border}`,
                padding: MEDICAL_BORDER_RADIUS["2xl"],
                textAlign: "center",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: `box-shadow ${MEDICAL_ANIMATIONS.duration.normal} ${MEDICAL_ANIMATIONS.easing.ease}`,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = MEDICAL_SHADOWS.large)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = MEDICAL_SHADOWS.accent)
              }
            >
              <img
                src={doctor.profilePictureUrl || "/public/author-1.jpg"}
                alt={doctor.fullName}
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: MEDICAL_SPACING.lg,
                  border: `3px solid ${theme.primary}`,
                  boxShadow: MEDICAL_SHADOWS.soft,
                  background: MEDICAL_COLORS.accent[50],
                }}
              />
              <h3
                style={{
                  margin: MEDICAL_SPACING.sm + " 0",
                  color: theme.primary,
                  fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.xl,
                  fontWeight: 700,
                }}
              >
                {doctor.fullName}
              </h3>
              <p
                style={{
                  color: MEDICAL_COLORS.accent[700],
                  fontWeight: 600,
                  marginBottom: MEDICAL_SPACING.sm,
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.lg,
                }}
              >
                {doctor.specializationName}
              </p>
              <p
                style={{
                  color: MEDICAL_COLORS.gray[700],
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
                  lineHeight: MEDICAL_TYPOGRAPHY.leading.relaxed,
                  margin: 0,
                }}
              >
                {doctor.shortBio}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DoctorCarousel;
