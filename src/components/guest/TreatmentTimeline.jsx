import React, { useEffect, useState } from "react";
import {
  MEDICAL_GRADIENTS,
  MEDICAL_COLORS,
  MEDICAL_BORDER_RADIUS,
  MEDICAL_SHADOWS,
  MEDICAL_TYPOGRAPHY,
} from "../../styles/medicalTheme";

const TreatmentTimeline = ({ protocol }) => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  useEffect(() => {
    if (!protocol?.protocolStepTemplates) return;
    setVisibleSteps([]);
    protocol.protocolStepTemplates.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, idx]);
      }, 200 + idx * 180);
    });
  }, [protocol]);

  if (!protocol || !protocol.protocolStepTemplates?.length) {
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

  return (
    <div style={{ padding: "2rem 0" }}>
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
            ⏳
          </span>
          Timeline điều trị
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
            ⏳
          </span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {protocol.protocolStepTemplates.map((step, idx) => (
          <div
            key={idx}
            style={{
              background: MEDICAL_GRADIENTS.gentle,
              borderRadius: MEDICAL_BORDER_RADIUS["2xl"],
              boxShadow: MEDICAL_SHADOWS.soft,
              border: `2px solid ${MEDICAL_COLORS.accent[200]}`,
              width: "100%",
              maxWidth: "600px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              position: "relative",
              opacity: visibleSteps.includes(idx) ? 1 : 0,
              transform: visibleSteps.includes(idx)
                ? "translateY(0)"
                : "translateY(40px)",
              transition:
                "opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-2.5rem",
                top: "1.5rem",
                color: MEDICAL_COLORS.primary[500],
                fontSize: "2rem",
                opacity: 0.15,
              }}
            >
              {idx === 0 ? "🚩" : "●"}
            </div>
            <h4
              style={{
                color: MEDICAL_COLORS.accent[700],
                fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
                fontSize: MEDICAL_TYPOGRAPHY.sizes.lg,
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              {step.stepOrder + 1}. {step.stepName}
            </h4>
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
                <i className="fas fa-info-circle mr-1"></i> Lưu ý cho bệnh nhân:{" "}
                {step.defaultNotesForPatient}
              </div>
            )}
            {step.relatedService && (
              <div
                style={{
                  color: MEDICAL_COLORS.accent[600],
                  fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
                }}
              >
                <i className="fas fa-stethoscope mr-1"></i> Dịch vụ liên quan:{" "}
                <strong>{step.relatedService.serviceName}</strong> (
                {step.relatedService.unit})
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentTimeline;
