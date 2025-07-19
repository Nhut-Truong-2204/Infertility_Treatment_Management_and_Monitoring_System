import React, { useState } from "react";
import { Star, X } from "lucide-react";
import useFeedback from "../hooks/useFeedback";
import { MEDICAL_COLORS } from "../styles/medicalTheme";

const RATING_LABELS = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Xuất sắc"];
export default function FeedbackModal({ isOpen, onClose, appointment }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [content, setContent] = useState("");
  const { submitFeedback, loading, error, success } = useFeedback();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback({
      appointmentId: appointment?.appointmentId || 0,
      ratingScore: rating,
      feedbackContent: content,
    });
  };

  const handleClose = () => {
    setContent("");
    setRating(5);
    setHover(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-blue-100">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={handleClose}
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">
          Gửi đánh giá & phản hồi
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Chia sẻ cảm nhận về dịch vụ, bác sĩ hoặc phòng khám
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none"
                aria-label={`Đánh giá ${star} sao`}
              >
                <Star
                  className="w-8 h-8"
                  fill={
                    (hover || rating) >= star
                      ? MEDICAL_COLORS.accent[500]
                      : "none"
                  }
                  stroke={MEDICAL_COLORS.accent[500]}
                />
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-accent-700 font-medium mb-2">
            {RATING_LABELS[(hover || rating) - 1]}
          </div>
          <textarea
            className="w-full min-h-[80px] rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 bg-blue-50 text-gray-800"
            placeholder="Viết cảm nhận, góp ý hoặc lời nhắn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={500}
            required
          />
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">
              Gửi đánh giá thành công! Cảm ơn bạn đã phản hồi.
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg shadow-md hover:bg-accent-700 transition-colors disabled:opacity-60"
            disabled={loading || success}
          >
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      </div>
    </div>
  );
}
