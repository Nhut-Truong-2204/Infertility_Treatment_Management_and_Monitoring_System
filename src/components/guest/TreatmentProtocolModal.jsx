import React from "react";
import TreatmentTimeline from "./TreatmentTimeline";
import {
  MEDICAL_GRADIENTS,
  MEDICAL_COLORS,
  MEDICAL_BORDER_RADIUS,
  MEDICAL_SHADOWS,
  MEDICAL_TYPOGRAPHY,
} from "../../styles/medicalTheme";

const TreatmentProtocolModal = ({ protocol, onClose }) => {
  if (!protocol) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(32,41,110,0.12)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: MEDICAL_GRADIENTS.gentle,
          borderRadius: MEDICAL_BORDER_RADIUS["2xl"],
          boxShadow: MEDICAL_SHADOWS.large,
          maxWidth: "700px",
          width: "100%",
          padding: "2.5rem 2rem 2rem 2rem",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: MEDICAL_GRADIENTS.primary,
            color: MEDICAL_COLORS.accent[50],
            border: "none",
            borderRadius: MEDICAL_BORDER_RADIUS.lg,
            fontWeight: 700,
            fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
            padding: "0.5rem 1.25rem",
            cursor: "pointer",
            boxShadow: MEDICAL_SHADOWS.medium,
          }}
        >
          Đóng
        </button>
        <h2
          style={{
            color: MEDICAL_COLORS.primary[700],
            fontFamily: MEDICAL_TYPOGRAPHY.fonts.display.join(","),
            fontSize: MEDICAL_TYPOGRAPHY.sizes["2xl"],
            fontWeight: 700,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {protocol.templateName}{" "}
          <span
            style={{
              color: MEDICAL_COLORS.gray[600],
              fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
            }}
          >
            ({protocol.version})
          </span>
        </h2>
        <div
          style={{
            color: MEDICAL_COLORS.gray[700],
            fontSize: MEDICAL_TYPOGRAPHY.sizes.base,
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {protocol.description}
        </div>
        <div
          style={{
            color: MEDICAL_COLORS.info[600],
            fontSize: MEDICAL_TYPOGRAPHY.sizes.sm,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {protocol.targetPatientProfile
            ? `Đối tượng: ${protocol.targetPatientProfile}`
            : ""}
        </div>
        <TreatmentTimeline protocol={protocol} animate />
      </div>
    </div>
  );
};

export default TreatmentProtocolModal;
