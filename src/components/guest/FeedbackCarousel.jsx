import React from "react";
import { FaStar } from "react-icons/fa";
import {
  MEDICAL_COLORS,
  MEDICAL_THEMES,
  MEDICAL_SHADOWS,
} from "../../styles/medicalTheme";
import usePublicFeedbacks from "./usePublicFeedbacks";

function FeedbackCarousel() {
  const feedbacks = usePublicFeedbacks();

  if (!feedbacks.length) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-[var(--color-primary, #20296e)]">
          Khách hàng nói gì về chúng tôi?
        </h2>
        <div className="text-center text-gray-500">
          Chưa có phản hồi công khai nào.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-[var(--color-primary, #20296e)]">
        Khách hàng nói gì về chúng tôi?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.feedbackId}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full border border-[var(--color-border, #e5e7eb)]"
            style={{
              borderColor: MEDICAL_THEMES.gentle.border,
              boxShadow: MEDICAL_SHADOWS.soft,
            }}
          >
            <div className="flex items-center mb-2">
              <span className="font-semibold text-lg text-[var(--color-primary, #20296e)]">
                {fb.patientName}
              </span>
              <span className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < fb.ratingScore ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </span>
            </div>
            <div className="italic text-gray-500 mb-2">
              {fb.serviceName} {fb.doctorName ? `- ${fb.doctorName}` : ""}
            </div>
            <div className="mb-2 text-gray-700">{fb.feedbackContent}</div>
            <div className="bg-[var(--color-bg-response,#f6f6f6)] rounded-md px-3 py-2 mt-2 text-sm border border-[var(--color-border,#e5e7eb)]">
              <span className="font-semibold text-[var(--color-primary,#20296e)]">
                Phản hồi từ phòng khám:
              </span>{" "}
              {fb.clinicResponse}
              {fb.respondedByUserName && (
                <span className="block text-xs text-gray-400 mt-1">
                  Bởi: {fb.respondedByUserName}{" "}
                  {fb.responseDate &&
                    `- ${new Date(fb.responseDate).toLocaleDateString()}`}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackCarousel;
