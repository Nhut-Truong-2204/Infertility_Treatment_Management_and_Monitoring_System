import React, { useEffect, useState } from "react";
import {
  MEDICAL_GRADIENTS,
  MEDICAL_COLORS,
  MEDICAL_BORDER_RADIUS,
  MEDICAL_SHADOWS,
  MEDICAL_TYPOGRAPHY,
} from "../../styles/medicalTheme";

const markerIcons = [
  "M12 2C6.48 2 2 6.48 2 12c0 5.25 7.5 10 10 10s10-4.75 10-10c0-5.52-4.48-10-10-10zm0 13.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z", // start
  "M12 2C6.48 2 2 6.48 2 12c0 5.25 7.5 10 10 10s10-4.75 10-10c0-5.52-4.48-10-10-10zm0 17c-3.87 0-7-3.13-7-7 0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.87-3.13 7-7 7z", // middle
  "M12 2C6.48 2 2 6.48 2 12c0 5.25 7.5 10 10 10s10-4.75 10-10c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.76-2.24 5-5 5z", // end
];

const getMarkerType = (idx, total) => {
  if (idx === 0) return 0;
  if (idx === total - 1) return 2;
  return 1;
};

const TreatmentTimeline = ({ protocol }) => {
  const [visibleSteps, setVisibleSteps] = useState([]);

  // Sort steps by stepOrder, memoized
  const sortedSteps = React.useMemo(() => {
    return protocol?.protocolStepTemplates
      ? [...protocol.protocolStepTemplates].sort(
          (a, b) => a.stepOrder - b.stepOrder
        )
      : [];
  }, [protocol]);

  useEffect(() => {
    if (!sortedSteps.length) return;
    setVisibleSteps([]);
    sortedSteps.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, idx]);
      }, 200 + idx * 180);
    });
  }, [sortedSteps]);

  if (!protocol || !sortedSteps.length) {
    return (
      <div
        style={{
          textAlign: "center",
          color: MEDICAL_COLORS.error[600],
          margin: "2rem 0",
        }}
      >
        Không có dữ liệu timeline cho phác đồ này.
      </div>
    );
  }

  // Responsive width for timeline container
  const timelineContainerStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 0.5rem",
    boxSizing: "border-box",
  };

  return (
    <div style={timelineContainerStyle}>
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
            🗺️
          </span>
          Lộ trình điều trị
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
            🗺️
          </span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          minHeight: "100px",
        }}
      >
        {/* Vertical line behind markers */}
        <div
          style={{
            position: "absolute",
            left: "54px",
            top: "24px",
            bottom: "24px",
            width: "6px",
            background: "linear-gradient(180deg, #20296e 0%, #ff70a3 100%)",
            borderRadius: "3px",
            zIndex: 0,
          }}
        />
        <div style={{ width: "100%" }}>
          {sortedSteps.map((step, idx, arr) => {
            const markerType = getMarkerType(idx, arr.length);
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: idx === arr.length - 1 ? 0 : "2.5rem",
                  position: "relative",
                  opacity: visibleSteps.includes(idx) ? 1 : 0,
                  transform: visibleSteps.includes(idx)
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition:
                    "opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)",
                  zIndex: 1,
                }}
              >
                {/* Marker */}
                <div
                  style={{
                    width: 108,
                    minWidth: 108,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div style={{ position: "relative", zIndex: 3 }}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill={
                        markerType === 0
                          ? MEDICAL_COLORS.primary[500]
                          : markerType === 2
                          ? MEDICAL_COLORS.success[500]
                          : MEDICAL_COLORS.accent[500]
                      }
                      style={{
                        filter:
                          markerType === 0
                            ? "drop-shadow(0 2px 8px #20296e33)"
                            : markerType === 2
                            ? "drop-shadow(0 2px 8px #10b98133)"
                            : "drop-shadow(0 2px 8px #ff70a333)",
                        marginBottom: 8,
                        background: "#fff",
                        borderRadius: "50%",
                        border: `3px solid ${MEDICAL_COLORS.gray[200]}`,
                      }}
                    >
                      <path d={markerIcons[markerType]} />
                    </svg>
                  </div>
                  {/* Line segment below marker, except last */}
                  {idx !== arr.length - 1 && (
                    <div
                      style={{
                        width: 6,
                        height: "calc(100% - 56px)",
                        background:
                          "linear-gradient(180deg, #20296e 0%, #ff70a3 100%)",
                        marginTop: 0,
                        borderRadius: 3,
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
                {/* Step Card */}
                <div
                  style={{
                    background: MEDICAL_GRADIENTS.gentle,
                    borderRadius: MEDICAL_BORDER_RADIUS["2xl"],
                    boxShadow: MEDICAL_SHADOWS.soft,
                    border: `2px solid ${MEDICAL_COLORS.accent[200]}`,
                    padding: "1.5rem 2rem 1.5rem 1.5rem",
                    marginLeft: 0,
                    flex: 1,
                    minWidth: 0,
                    maxWidth: "700px",
                    width: "100%",
                    overflowWrap: "break-word",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        color: MEDICAL_COLORS.primary[700],
                        fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
                        fontSize: MEDICAL_TYPOGRAPHY.sizes.lg,
                        fontWeight: 700,
                        marginRight: 12,
                      }}
                    >
                      {step.stepOrder + 1}.
                    </span>
                    <span
                      style={{
                        color: MEDICAL_COLORS.accent[700],
                        fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
                        fontSize: MEDICAL_TYPOGRAPHY.sizes.lg,
                        fontWeight: 700,
                      }}
                    >
                      {step.stepName}
                    </span>
                  </div>
                  <p
                    style={{
                      color: MEDICAL_COLORS.gray[700],
                      fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
                      lineHeight: MEDICAL_TYPOGRAPHY.leading.relaxed,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.description}
                  </p>
                  <div
                    style={{
                      color: MEDICAL_COLORS.primary[600],
                      fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Thời gian dự kiến:{" "}
                    <strong>{step.defaultDurationDays} ngày</strong>
                  </div>
                  {step.defaultNotesForPatient && (
                    <div
                      style={{
                        color: MEDICAL_COLORS.success[600],
                        fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                        marginBottom: "0.5rem",
                      }}
                    >
                      <i className="fas fa-info-circle mr-1"></i> Lưu ý cho bệnh
                      nhân: {step.defaultNotesForPatient}
                    </div>
                  )}
                  {step.defaultRelatedService && (
                    <div
                      style={{
                        color: MEDICAL_COLORS.accent[600],
                        fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                      }}
                    >
                      <i className="fas fa-stethoscope mr-1"></i> Dịch vụ liên
                      quan:{" "}
                      <strong>{step.defaultRelatedService.serviceName}</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Responsive style */}
      <style>{`
        @media (max-width: 700px) {
          .treatment-timeline-modal {
            max-width: 98vw !important;
            padding: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TreatmentTimeline;
