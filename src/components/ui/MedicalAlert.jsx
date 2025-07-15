import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component Alert/Notification chuyên dụng cho y tế hiếm muộn
 * Thiết kế màu sắc và icon phù hợp với môi trường y tế nhẹ nhàng
 */
const MedicalAlert = ({
  type = "info",
  title,
  message,
  icon,
  showIcon = true,
  dismissible = false,
  onDismiss,
  size = "medium",
  variant = "filled",
  className = "",
  children,
  ...props
}) => {
  // Định nghĩa các loại alert cho y tế
  const alertTypes = {
    success: {
      icon: "fas fa-check-circle",
      filled: {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-800",
        titleText: "text-emerald-900",
        iconColor: "text-emerald-600",
      },
      outline: {
        bg: "bg-white",
        border: "border-emerald-300 border-2",
        text: "text-emerald-700",
        titleText: "text-emerald-800",
        iconColor: "text-emerald-500",
      },
    },
    info: {
      icon: "fas fa-info-circle",
      filled: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        titleText: "text-blue-900",
        iconColor: "text-blue-600",
      },
      outline: {
        bg: "bg-white",
        border: "border-blue-300 border-2",
        text: "text-blue-700",
        titleText: "text-blue-800",
        iconColor: "text-blue-500",
      },
    },
    warning: {
      icon: "fas fa-exclamation-triangle",
      filled: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-800",
        titleText: "text-amber-900",
        iconColor: "text-amber-600",
      },
      outline: {
        bg: "bg-white",
        border: "border-amber-300 border-2",
        text: "text-amber-700",
        titleText: "text-amber-800",
        iconColor: "text-amber-500",
      },
    },
    error: {
      icon: "fas fa-times-circle",
      filled: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        titleText: "text-red-900",
        iconColor: "text-red-600",
      },
      outline: {
        bg: "bg-white",
        border: "border-red-300 border-2",
        text: "text-red-700",
        titleText: "text-red-800",
        iconColor: "text-red-500",
      },
    },
    medical: {
      icon: "fas fa-heartbeat",
      filled: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-800",
        titleText: "text-pink-900",
        iconColor: "text-accent",
      },
      outline: {
        bg: "bg-white",
        border: "border-pink-300 border-2",
        text: "text-pink-700",
        titleText: "text-pink-800",
        iconColor: "text-accent",
      },
    },
    appointment: {
      icon: "fas fa-calendar-check",
      filled: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        titleText: "text-green-900",
        iconColor: "text-green-600",
      },
      outline: {
        bg: "bg-white",
        border: "border-green-300 border-2",
        text: "text-green-700",
        titleText: "text-green-800",
        iconColor: "text-green-500",
      },
    },
    reminder: {
      icon: "fas fa-bell",
      filled: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-800",
        titleText: "text-purple-900",
        iconColor: "text-purple-600",
      },
      outline: {
        bg: "bg-white",
        border: "border-purple-300 border-2",
        text: "text-purple-700",
        titleText: "text-purple-800",
        iconColor: "text-purple-500",
      },
    },
  };

  const sizes = {
    small: {
      padding: "p-3",
      gap: "gap-2",
      iconSize: "text-sm",
      titleSize: "text-sm font-medium",
      textSize: "text-xs",
    },
    medium: {
      padding: "p-4",
      gap: "gap-3",
      iconSize: "text-base",
      titleSize: "text-base font-semibold",
      textSize: "text-sm",
    },
    large: {
      padding: "p-5",
      gap: "gap-4",
      iconSize: "text-lg",
      titleSize: "text-lg font-semibold",
      textSize: "text-base",
    },
  };

  const currentType = alertTypes[type] || alertTypes.info;
  const currentVariant = currentType[variant] || currentType.filled;
  const currentSize = sizes[size];

  const iconToShow = icon || currentType.icon;

  return (
    <div
      className={cn(
        "relative rounded-lg border flex items-start transition-all duration-200",
        currentVariant.bg,
        currentVariant.border,
        currentSize.padding,
        currentSize.gap,
        "shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    >
      {/* Icon */}
      {showIcon && (
        <div className="flex-shrink-0">
          <i
            className={cn(
              iconToShow,
              currentVariant.iconColor,
              currentSize.iconSize
            )}
          ></i>
        </div>
      )}

      {/* Nội dung */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4
            className={cn(
              currentVariant.titleText,
              currentSize.titleSize,
              "mb-1"
            )}
          >
            {title}
          </h4>
        )}

        {message && (
          <p
            className={cn(
              currentVariant.text,
              currentSize.textSize,
              "leading-relaxed"
            )}
          >
            {message}
          </p>
        )}

        {children && (
          <div
            className={cn(
              currentVariant.text,
              currentSize.textSize,
              title && "mt-2"
            )}
          >
            {children}
          </div>
        )}
      </div>

      {/* Nút đóng */}
      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            "flex-shrink-0 rounded-md p-1.5 transition-colors",
            currentVariant.iconColor,
            "hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2",
            currentVariant.iconColor.replace("text-", "focus:ring-")
          )}
          aria-label="Đóng thông báo"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      )}
    </div>
  );
};

export default MedicalAlert;
