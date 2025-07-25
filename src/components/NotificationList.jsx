import React, { useEffect, useCallback } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import viLocale from "date-fns/locale/vi";
import useNotifications from "../hooks/useNotifications";
import MedicalCard from "../components/ui/MedicalCard";
import MedicalAlert from "../components/ui/MedicalAlert";
import EmptyState from "../components/ui/EmptyState";

const NOTIFICATION_TYPE_CONFIG = {
  INSTALLMENT_PAID: {
    icon: "fas fa-money-check-alt",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  // Thêm các loại khác nếu cần
};

function NotificationList({ onClose }) {
  const { notifications, loading, error, refresh } = useNotifications();

  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Đóng modal khi click overlay
  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(32,41,110,0.18)" }}
      onClick={handleOverlayClick}
    >
      <MedicalCard className="w-full max-w-lg relative max-h-[95vh] overflow-y-auto animate__animated animate__fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
          aria-label="Đóng"
        >
          &times;
        </button>
        <MedicalCard.Content>
          <h2 className="text-xl font-bold text-primary mb-4 text-center">
            Thông báo của bạn
          </h2>
          {loading && (
            <MedicalAlert
              type="info"
              title="Đang tải..."
              message="Đang tải danh sách thông báo."
            />
          )}
          {error && (
            <MedicalAlert
              type="error"
              title="Lỗi"
              message={error}
              dismissible
              onDismiss={refresh}
            />
          )}
          {!loading && notifications.length === 0 && (
            <EmptyState type="notifications" size="medium" />
          )}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {notifications.map((n) => {
              const config = NOTIFICATION_TYPE_CONFIG[n.notificationType] || {};
              return (
                <div
                  key={n.notificationId}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    n.read ? "bg-gray-50" : config.bg || "bg-indigo-50"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 text-2xl ${
                      config.color || "text-indigo-400"
                    }`}
                  >
                    <i className={config.icon || "fas fa-bell"}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                          Mới
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-1">{n.message}</p>
                    {n.link && (
                      <a
                        href={n.link}
                        className="text-accent hover:underline text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem chi tiết
                      </a>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {n.senderFullName && (
                        <span>Gửi bởi: {n.senderFullName} • </span>
                      )}
                      <span>
                        {formatDistanceToNow(parseISO(n.createdAt), {
                          addSuffix: true,
                          locale: viLocale,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </MedicalCard.Content>
      </MedicalCard>
    </div>
  );
}

export default NotificationList;
