import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component Status Badge chuyên dụng cho hệ thống y tế hiếm muộn
 * Thiết kế màu sắc phù hợp với môi trường y tế - nhẹ nhàng, dễ phân biệt
 */
const MedicalStatusBadge = ({
  status,
  size = "medium",
  showIcon = true,
  className = "",
  ...props
}) => {
  // Chuẩn hóa status
  const statusLower = status?.toLowerCase() || "";

  // Định nghĩa màu sắc và icon phù hợp với y tế
  const getStatusConfig = () => {
    // Trạng thái điều trị và lịch hẹn
    const medicalStatuses = {
      // Trạng thái tích cực - xanh lá nhẹ nhàng
      completed: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "fas fa-check-circle",
        shadow: "shadow-emerald-100",
      },
      success: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: "fas fa-check",
        shadow: "shadow-green-100",
      },

      // Trạng thái đang tiến hành - xanh dương nhẹ
      in_progress: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: "fas fa-spinner",
        shadow: "shadow-blue-100",
      },
      active: {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-200",
        icon: "fas fa-play-circle",
        shadow: "shadow-sky-100",
      },

      // Trạng thái chờ - vàng nhẹ
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: "fas fa-clock",
        shadow: "shadow-amber-100",
      },
      scheduled: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: "fas fa-calendar",
        shadow: "shadow-yellow-100",
      },

      // Trạng thái tạm dừng - tím nhẹ
      paused: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: "fas fa-pause-circle",
        shadow: "shadow-purple-100",
      },

      // Trạng thái hủy/lỗi - đỏ nhẹ nhàng
      cancelled: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: "fas fa-times-circle",
        shadow: "shadow-red-100",
      },
      failed: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        icon: "fas fa-exclamation-triangle",
        shadow: "shadow-rose-100",
      },

      // Trạng thái đặc biệt y tế - màu accent nhẹ
      consultation: {
        bg: "bg-pink-50",
        text: "text-pink-700",
        border: "border-pink-200",
        icon: "fas fa-user-md",
        shadow: "shadow-pink-100",
      },
      treatment: {
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        icon: "fas fa-heartbeat",
        shadow: "shadow-indigo-100",
      },

      // Mặc định - xám nhẹ
      default: {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: "fas fa-info-circle",
        shadow: "shadow-gray-100",
      },
    };

    // Mapping status tiếng Việt
    const vietnameseMapping = {
      "hoàn thành": "completed",
      "thành công": "success",
      "đang tiến hành": "in_progress",
      "đang xử lý": "in_progress",
      "hoạt động": "active",
      "chờ xử lý": "pending",
      "chờ xác nhận": "pending",
      "đã lên lịch": "scheduled",
      "tạm dừng": "paused",
      "hủy bỏ": "cancelled",
      "đã hủy": "cancelled",
      "thất bại": "failed",
      lỗi: "failed",
      "tư vấn": "consultation",
      "điều trị": "treatment",
    };

    // Tìm status phù hợp
    let matchedStatus = "default";

    // Kiểm tra tiếng Việt trước
    for (const [vn, en] of Object.entries(vietnameseMapping)) {
      if (statusLower.includes(vn)) {
        matchedStatus = en;
        break;
      }
    }

    // Nếu không tìm thấy, kiểm tra tiếng Anh
    if (matchedStatus === "default") {
      for (const en of Object.keys(medicalStatuses)) {
        if (statusLower.includes(en)) {
          matchedStatus = en;
          break;
        }
      }
    }

    return medicalStatuses[matchedStatus] || medicalStatuses.default;
  };

  const sizes = {
    small: {
      padding: "px-2 py-0.5",
      text: "text-xs",
      icon: "text-xs",
    },
    medium: {
      padding: "px-3 py-1",
      text: "text-sm",
      icon: "text-xs",
    },
    large: {
      padding: "px-4 py-1.5",
      text: "text-base",
      icon: "text-sm",
    },
  };

  const config = getStatusConfig();
  const sizeConfig = sizes[size];

  const baseClasses = cn(
    "inline-flex items-center gap-1.5 rounded-full font-medium border transition-all duration-200",
    "hover:shadow-md transform hover:scale-105",
    sizeConfig.padding,
    sizeConfig.text
  );

  return (
    <span
      className={cn(
        baseClasses,
        config.bg,
        config.text,
        config.border,
        config.shadow,
        className
      )}
      {...props}
    >
      {showIcon && <i className={cn(config.icon, sizeConfig.icon)}></i>}
      <span>{status || "Không xác định"}</span>
    </span>
  );
};

export default MedicalStatusBadge;
