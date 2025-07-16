import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import TreatmentProtocolModal from "./TreatmentProtocolModal";
import {
  getTreatmentMethods,
  getProtocolTemplates,
} from "../../api/treatmentMethodsAPI";
import {
  MEDICAL_GRADIENTS,
  MEDICAL_COLORS,
  MEDICAL_BORDER_RADIUS,
  MEDICAL_SHADOWS,
  MEDICAL_TYPOGRAPHY,
} from "../../styles/medicalTheme";

const ServiceList = () => {
  const [methods, setMethods] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [carouselHeight, setCarouselHeight] = useState(420);
  const cardRefs = React.useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [methodsRes, protocolsRes] = await Promise.all([
          getTreatmentMethods(),
          getProtocolTemplates(),
        ]);
        setMethods(methodsRes.data || []);
        setProtocols(protocolsRes.data || []);
        console.table(methodsRes.data, [
          "treatmentMethodId",
          "methodName",
          "description",
        ]);
        console.table(protocolsRes.data, [
          "treatmentProtocolTemplateId",
          "templateName",
          "version",
          "treatmentMethodId",
          "description",
        ]);
      } catch (err) {
        console.error(
          "❌ Failed to fetch treatment methods or protocols:",
          err
        );
        setError("Không thể tải dữ liệu dịch vụ điều trị.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (methods.length === 0) return;
    // Đợi render xong, đo chiều cao lớn nhất
    setTimeout(() => {
      let max = 420;
      cardRefs.current.forEach((ref) => {
        if (ref && ref.offsetHeight > max) max = ref.offsetHeight;
      });
      setCarouselHeight(max);
    }, 300);
  }, [methods]);

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
        <span>Đang tải...</span>
      </div>
    );
  if (error)
    return (
      <div
        style={{
          color: MEDICAL_COLORS.error[600],
          textAlign: "center",
          margin: "2rem 0",
        }}
      >
        {error}
      </div>
    );

  return (
    <section style={{ padding: "2rem 0" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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
          Dịch vụ điều trị hiếm muộn
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
        slidesPerView={2}
        loop={true}
        speed={700}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        style={{
          paddingBottom: "1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {methods.map((method, idx) => (
          <SwiperSlide key={method.treatmentMethodId}>
            <div
              ref={(el) => (cardRefs.current[idx] = el)}
              style={{
                background: MEDICAL_GRADIENTS.gentle,
                borderRadius: MEDICAL_BORDER_RADIUS["2xl"],
                boxShadow: MEDICAL_SHADOWS.soft,
                border: `2px solid ${MEDICAL_COLORS.accent[200]}`,
                padding: "2rem 1.5rem",
                minHeight: 190,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  width: "40%",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <img
                  src={method.imageUrl || "/hero-img.png"}
                  alt={method.methodName}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderTopRightRadius: MEDICAL_BORDER_RADIUS["2xl"],
                    borderBottomRightRadius: MEDICAL_BORDER_RADIUS["2xl"],
                    opacity: 0.18,
                    boxShadow: "0 4px 32px rgba(32,41,110,0.10)",
                  }}
                />
              </div>
              <div
                style={{
                  overflowY: "auto",
                  width: "100%",
                  flex: 1,
                  zIndex: 1,
                }}
              >
                <h3
                  style={{
                    color: MEDICAL_COLORS.accent[700],
                    fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
                    fontSize: MEDICAL_TYPOGRAPHY.sizes.xl,
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    textAlign: "left",
                  }}
                >
                  {method.methodName}
                </h3>
                <p
                  style={{
                    color: MEDICAL_COLORS.gray[700],
                    fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
                    lineHeight: MEDICAL_TYPOGRAPHY.leading.relaxed,
                    marginBottom: "1rem",
                    textAlign: "left",
                  }}
                >
                  {method.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Hiển thị các mẫu phác đồ bên dưới, alternate style */}
      <div style={{ maxWidth: "1100px", margin: "2rem auto 0 auto" }}>
        {protocols.map((protocol, idx) => (
          <div
            key={protocol.treatmentProtocolTemplateId}
            style={{
              background:
                idx % 2 === 0
                  ? MEDICAL_GRADIENTS.gentle
                  : MEDICAL_GRADIENTS.primary,
              color:
                idx % 2 === 0
                  ? MEDICAL_COLORS.primary[700]
                  : MEDICAL_COLORS.accent[50],
              borderRadius: MEDICAL_BORDER_RADIUS.xl,
              boxShadow: MEDICAL_SHADOWS.soft,
              border: `2px solid ${MEDICAL_COLORS.accent[200]}`,
              padding: "1.5rem 1.5rem 1.5rem 2rem",
              marginBottom: "1.5rem",
              display: "flex",
              flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.xl,
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color:
                    idx % 2 === 0
                      ? MEDICAL_COLORS.primary[700]
                      : MEDICAL_COLORS.accent[50],
                }}
              >
                {protocol.templateName}{" "}
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                  }}
                >
                  ({protocol.version})
                </span>
              </h4>
              <div
                style={{
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
                  marginBottom: "0.5rem",
                }}
              >
                {protocol.description}
              </div>
              <div
                style={{
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                  marginBottom: "0.5rem",
                }}
              >
                <strong>Phương pháp:</strong> {protocol.treatmentMethodName}
              </div>
              {protocol.targetPatientProfile && (
                <div
                  style={{
                    fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                    marginBottom: "0.5rem",
                  }}
                >
                  <strong>Đối tượng:</strong> {protocol.targetPatientProfile}
                </div>
              )}
            </div>
            <button
              style={{
                background: MEDICAL_GRADIENTS.primary,
                color: MEDICAL_COLORS.accent[50],
                border: "none",
                borderRadius: MEDICAL_BORDER_RADIUS.lg,
                fontWeight: 700,
                fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
                padding: "0.5rem 1.25rem",
                cursor: "pointer",
                boxShadow: MEDICAL_SHADOWS.medium,
                minWidth: "120px",
              }}
              onClick={() => setSelectedProtocol(protocol)}
            >
              Xem timeline
            </button>
          </div>
        ))}
      </div>
      {selectedProtocol && (
        <TreatmentProtocolModal
          protocol={selectedProtocol}
          onClose={() => setSelectedProtocol(null)}
        />
      )}
    </section>
  );
};

export default ServiceList;
