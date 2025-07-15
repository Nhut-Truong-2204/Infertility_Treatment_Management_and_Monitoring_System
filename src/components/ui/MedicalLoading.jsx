import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component Loading chính cho ứng dụng y tế hiếm muộn
 * Thiết kế phù hợp với tính chất y tế - nhẹ nhàng, chuyên nghiệp, truyền cảm giác an toàn
 */
const MedicalLoading = ({
  variant = "primary",
  size = "medium",
  text = "Đang tải...",
  subText = "",
  showIcon = true,
  fullScreen = false,
  overlay = false,
  className = "",
}) => {
  // Định nghĩa màu sắc phù hợp với y tế hiếm muộn
  const variants = {
    primary: {
      spinner: "border-primary",
      pulse: "bg-primary/20",
      icon: "text-primary",
      text: "text-primary",
      subText: "text-primary/70",
      bg: "bg-white",
    },
    medical: {
      spinner: "border-accent",
      pulse: "bg-accent/20",
      icon: "text-accent",
      text: "text-accent",
      subText: "text-accent/70",
      bg: "bg-white",
    },
    gentle: {
      spinner: "border-pink-400",
      pulse: "bg-pink-100",
      icon: "text-pink-500",
      text: "text-gray-700",
      subText: "text-gray-500",
      bg: "bg-pink-50/80",
    },
    professional: {
      spinner: "border-blue-500",
      pulse: "bg-blue-100",
      icon: "text-blue-600",
      text: "text-blue-800",
      subText: "text-blue-600",
      bg: "bg-blue-50/80",
    },
  };

  const sizes = {
    small: {
      spinner: "w-8 h-8 border-2",
      pulse: "w-12 h-12",
      icon: "text-lg",
      text: "text-sm",
      subText: "text-xs",
      spacing: "space-y-2",
      container: "p-4",
    },
    medium: {
      spinner: "w-12 h-12 border-3",
      pulse: "w-16 h-16",
      icon: "text-xl",
      text: "text-base",
      subText: "text-sm",
      spacing: "space-y-3",
      container: "p-6",
    },
    large: {
      spinner: "w-16 h-16 border-4",
      pulse: "w-20 h-20",
      icon: "text-2xl",
      text: "text-lg",
      subText: "text-base",
      spacing: "space-y-4",
      container: "p-8",
    },
  };

  // Safe fallback to prevent undefined errors
  const currentVariant = variants[variant] || variants.primary;
  const currentSize = sizes[size] || sizes.medium;

  // Validation - log warning for invalid props in development
  if (import.meta.env.DEV) {
    if (!variants[variant]) {
      console.warn(
        `MedicalLoading: Invalid variant "${variant}". Using "primary" as fallback.`
      );
    }
    if (!sizes[size]) {
      console.warn(
        `MedicalLoading: Invalid size "${size}". Using "medium" as fallback.`
      );
    }
  }

  // Icon y tế phù hợp
  const MedicalIcon = () => (
    <div className={cn("relative", currentSize.icon)}>
      <i
        className={cn("fas fa-heartbeat animate-pulse", currentVariant.icon)}
      ></i>
    </div>
  );

  // Spinner y tế với hiệu ứng nhẹ nhàng
  const MedicalSpinner = () => (
    <div className="relative flex items-center justify-center">
      {/* Pulse background */}
      <div
        className={cn(
          "absolute rounded-full animate-ping",
          currentVariant.pulse,
          currentSize.pulse
        )}
      ></div>

      {/* Main spinner */}
      <div
        className={cn(
          "relative rounded-full border-solid border-t-transparent animate-spin",
          currentVariant.spinner,
          currentSize.spinner
        )}
      ></div>

      {/* Center icon */}
      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <i className={cn("fas fa-heart", currentVariant.icon, "text-sm")}></i>
        </div>
      )}
    </div>
  );

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        currentSize.container,
        currentSize.spacing,
        currentVariant.bg,
        "rounded-lg",
        className
      )}
    >
      <MedicalSpinner />

      {text && (
        <div className="text-center max-w-xs">
          <p
            className={cn("font-medium", currentVariant.text, currentSize.text)}
          >
            {text}
          </p>
          {subText && (
            <p
              className={cn(
                "mt-1",
                currentVariant.subText,
                currentSize.subText
              )}
            >
              {subText}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
        {content}
      </div>
    );
  }

  return content;
};

export default MedicalLoading;
