import React from "react";
import TreatmentTimeline from "./TreatmentTimeline";

const TreatmentProtocolModal = ({ protocol, onClose }) => {
  if (!protocol) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(32,41,110,0.12)] overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="treatment-timeline-modal max-w-[900px] w-[98vw] max-h-[90vh] min-h-[200px] p-10 pt-10 pb-8 relative flex flex-col overflow-y-auto rounded-3xl shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #fef7f3 0%, #f4f5ff 100%)",
          boxShadow:
            "0 10px 15px rgba(32, 41, 110, 0.1), 0 4px 6px rgba(32, 41, 110, 0.05)",
          borderRadius: "1.5rem",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <style>{`
          .treatment-timeline-modal::-webkit-scrollbar { display: none; }
          .treatment-timeline-modal { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <h2
          className="text-center text-2xl font-bold font-display mb-4"
          style={{
            color: "#151c47",
            fontFamily: "Poppins, Montserrat, sans-serif",
          }}
        >
          {protocol.templateName}{" "}
          <span className="text-sm font-normal" style={{ color: "#6b7280" }}>
            ({protocol.version})
          </span>
        </h2>
        <div
          className="text-center text-base mb-2 font-sans"
          style={{ color: "#374151" }}
        >
          {protocol.description}
        </div>
        <div
          className="text-center text-sm mb-4 font-sans"
          style={{ color: "#2563eb" }}
        >
          {protocol.targetPatientProfile
            ? `Đối tượng: ${protocol.targetPatientProfile}`
            : ""}
        </div>
        <div className="flex-1 min-h-0">
          <TreatmentTimeline protocol={protocol} animate />
        </div>
      </div>
    </div>
  );
};

export default TreatmentProtocolModal;
