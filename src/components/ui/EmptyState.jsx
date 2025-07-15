import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component EmptyState cho ứng dụng y tế hiếm muộn
 * Thiết kế nhẹ nhàng, thân thiện phù hợp với môi trường y tế
 */
const MedicalEmptyState = ({
  type = "general",
  title,
  description,
  actionButton = null,
  size = "medium",
  className = "",
}) => {
  // Định nghĩa các loại empty state cho y tế
  const emptyTypes = {
    general: {
      icon: "fas fa-inbox",
      iconColor: "text-gray-400",
      bgColor: "bg-gray-50",
      defaultTitle: "Không có dữ liệu",
      defaultDesc: "Chưa có thông tin để hiển thị",
    },
    appointments: {
      icon: "fas fa-calendar-alt",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-50",
      defaultTitle: "Chưa có lịch hẹn",
      defaultDesc:
        "Bạn chưa có lịch hẹn nào. Hãy đặt lịch để được tư vấn và điều trị.",
    },
    records: {
      icon: "fas fa-file-medical",
      iconColor: "text-green-400",
      bgColor: "bg-green-50",
      defaultTitle: "Chưa có hồ sơ y tế",
      defaultDesc: "Hồ sơ y tế của bạn sẽ được cập nhật sau khi khám.",
    },
    labtests: {
      icon: "fas fa-flask",
      iconColor: "text-purple-400",
      bgColor: "bg-purple-50",
      defaultTitle: "Chưa có kết quả xét nghiệm",
      defaultDesc: "Kết quả xét nghiệm sẽ có sẵn sau khi hoàn thành.",
    },
    treatments: {
      icon: "fas fa-heartbeat",
      iconColor: "text-accent",
      bgColor: "bg-pink-50",
      defaultTitle: "Chưa có phác đồ điều trị",
      defaultDesc: "Bác sĩ sẽ lập phác đồ điều trị phù hợp sau khi thăm khám.",
    },
    prescriptions: {
      icon: "fas fa-pills",
      iconColor: "text-orange-400",
      bgColor: "bg-orange-50",
      defaultTitle: "Chưa có đơn thuốc",
      defaultDesc: "Đơn thuốc sẽ được kê sau khi bác sĩ thăm khám.",
    },
    search: {
      icon: "fas fa-search",
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-50",
      defaultTitle: "Không tìm thấy kết quả",
      defaultDesc:
        "Hãy thử với từ khóa khác hoặc kiểm tra lại thông tin tìm kiếm.",
    },
    notifications: {
      icon: "fas fa-bell",
      iconColor: "text-indigo-400",
      bgColor: "bg-indigo-50",
      defaultTitle: "Không có thông báo",
      defaultDesc: "Bạn đã xem hết tất cả thông báo.",
    },
  };

  const sizes = {
    small: {
      container: "py-8",
      icon: "text-4xl mb-3",
      title: "text-lg",
      desc: "text-sm",
      iconBg: "w-16 h-16",
    },
    medium: {
      container: "py-12",
      icon: "text-5xl mb-4",
      title: "text-xl",
      desc: "text-base",
      iconBg: "w-20 h-20",
    },
    large: {
      container: "py-16",
      icon: "text-6xl mb-6",
      title: "text-2xl",
      desc: "text-lg",
      iconBg: "w-24 h-24",
    },
  };

  const currentType = emptyTypes[type] || emptyTypes.general;
  const currentSize = sizes[size];

  const displayTitle = title || currentType.defaultTitle;
  const displayDesc = description || currentType.defaultDesc;

  return (
    <div
      className={cn(
        "text-center max-w-md mx-auto",
        currentSize.container,
        className
      )}
    >
      {/* Icon với background nhẹ nhàng */}
      <div
        className={cn(
          "mx-auto rounded-full flex items-center justify-center mb-4",
          currentType.bgColor,
          currentSize.iconBg
        )}
      >
        <i
          className={cn(currentType.icon, currentType.iconColor, "text-2xl")}
        ></i>
      </div>

      {/* Tiêu đề */}
      <h3 className={cn("font-semibold text-gray-700 mb-2", currentSize.title)}>
        {displayTitle}
      </h3>

      {/* Mô tả */}
      <p className={cn("text-gray-500 leading-relaxed mb-6", currentSize.desc)}>
        {displayDesc}
      </p>

      {/* Action button */}
      {actionButton && (
        <div className="flex justify-center">{actionButton}</div>
      )}
    </div>
  );
};

export default MedicalEmptyState;
