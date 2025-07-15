import React from "react";
import { cn } from "../../lib/utils";
import {
  MEDICAL_COLORS,
  MEDICAL_SHADOWS,
  MEDICAL_SPACING,
  MEDICAL_ANIMATIONS,
} from "../../styles/medicalTheme";

/**
 * Component Loading duy nhất cho toàn bộ hệ thống
 * Thiết kế theo medical theme - nhẹ nhàng, chuyên nghiệp, an toàn
 */
const Loading = ({
  variant = "primary",
  size = "medium",
  text = "Đang tải...",
  subText = "",
  type = "spinner",
  fullScreen = false,
  overlay = false,
  showIcon = true,
  progress = null,
  className = "",
  ...props
}) => {
  // Định nghĩa variants theo medical theme
  const variants = {
    primary: {
      spinner: MEDICAL_COLORS.primary[500],
      background: MEDICAL_COLORS.primary[50],
      text: MEDICAL_COLORS.primary[700],
      subText: MEDICAL_COLORS.primary[600],
      glow: MEDICAL_COLORS.primary[200],
    },
    accent: {
      spinner: MEDICAL_COLORS.accent[500],
      background: MEDICAL_COLORS.accent[50],
      text: MEDICAL_COLORS.accent[700],
      subText: MEDICAL_COLORS.accent[600],
      glow: MEDICAL_COLORS.accent[200],
    },
    success: {
      spinner: MEDICAL_COLORS.success[500],
      background: MEDICAL_COLORS.success[50],
      text: MEDICAL_COLORS.success[700],
      subText: MEDICAL_COLORS.success[600],
      glow: MEDICAL_COLORS.success[200],
    },
    warning: {
      spinner: MEDICAL_COLORS.warning[500],
      background: MEDICAL_COLORS.warning[50],
      text: MEDICAL_COLORS.warning[700],
      subText: MEDICAL_COLORS.warning[600],
      glow: MEDICAL_COLORS.warning[200],
    },
    error: {
      spinner: MEDICAL_COLORS.error[500],
      background: MEDICAL_COLORS.error[50],
      text: MEDICAL_COLORS.error[700],
      subText: MEDICAL_COLORS.error[600],
      glow: MEDICAL_COLORS.error[200],
    },
    info: {
      spinner: MEDICAL_COLORS.info[500],
      background: MEDICAL_COLORS.info[50],
      text: MEDICAL_COLORS.info[700],
      subText: MEDICAL_COLORS.info[600],
      glow: MEDICAL_COLORS.info[200],
    },
    medical: {
      spinner: MEDICAL_COLORS.medical.treatment,
      background: MEDICAL_COLORS.gray[50],
      text: MEDICAL_COLORS.gray[700],
      subText: MEDICAL_COLORS.gray[600],
      glow: MEDICAL_COLORS.medical.treatment + "33",
    },
    lab: {
      spinner: MEDICAL_COLORS.medical.lab,
      background: "#f3f0ff",
      text: MEDICAL_COLORS.gray[700],
      subText: MEDICAL_COLORS.gray[600],
      glow: MEDICAL_COLORS.medical.lab + "33",
    },
    consultation: {
      spinner: MEDICAL_COLORS.medical.consultation,
      background: MEDICAL_COLORS.warning[50],
      text: MEDICAL_COLORS.warning[700],
      subText: MEDICAL_COLORS.warning[600],
      glow: MEDICAL_COLORS.medical.consultation + "33",
    },
  };

  // Định nghĩa sizes
  const sizes = {
    small: {
      spinner: "w-5 h-5",
      container: "p-3",
      text: "text-sm",
      subText: "text-xs",
      icon: "text-lg",
      spacing: "space-y-2",
    },
    medium: {
      spinner: "w-8 h-8",
      container: "p-6",
      text: "text-base",
      subText: "text-sm",
      icon: "text-2xl",
      spacing: "space-y-3",
    },
    large: {
      spinner: "w-12 h-12",
      container: "p-8",
      text: "text-lg",
      subText: "text-base",
      icon: "text-3xl",
      spacing: "space-y-4",
    },
    xlarge: {
      spinner: "w-16 h-16",
      container: "p-10",
      text: "text-xl",
      subText: "text-lg",
      icon: "text-4xl",
      spacing: "space-y-5",
    },
  };

  const currentVariant = variants[variant] || variants.primary;
  const currentSize = sizes[size] || sizes.medium;

  // Spinner Component
  const Spinner = () => (
    <div className="relative">
      <div
        className={cn(
          "rounded-full border-3 border-transparent animate-spin",
          currentSize.spinner
        )}
        style={{
          borderTopColor: currentVariant.spinner,
          borderRightColor: currentVariant.spinner + "40",
          animationDuration: MEDICAL_ANIMATIONS.duration.slow,
        }}
      />

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full blur-sm opacity-30 animate-pulse",
          currentSize.spinner
        )}
        style={{
          backgroundColor: currentVariant.glow,
          animationDuration: "1.5s",
        }}
      />
    </div>
  );

  // Dots Loading
  const DotsLoading = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full animate-bounce"
          style={{
            backgroundColor: currentVariant.spinner,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );

  // Pulse Loading
  const PulseLoading = () => (
    <div className="relative">
      <div
        className={cn("rounded-full animate-ping", currentSize.spinner)}
        style={{
          backgroundColor: currentVariant.spinner,
          animationDuration: "1s",
        }}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-pulse",
          currentSize.spinner
        )}
        style={{
          backgroundColor: currentVariant.spinner,
          opacity: 0.6,
        }}
      />
    </div>
  );

  // Progress Bar (nếu có progress)
  const ProgressBar = () =>
    progress !== null && (
      <div className="w-full max-w-xs mx-auto">
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: currentVariant.text }}>Tiến độ</span>
          <span style={{ color: currentVariant.subText }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
          style={{ backgroundColor: currentVariant.background }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              backgroundColor: currentVariant.spinner,
              background: `linear-gradient(90deg, ${currentVariant.spinner}, ${currentVariant.spinner}cc)`,
            }}
          />
        </div>
      </div>
    );

  // Icon theo type
  const getTypeIcon = () => {
    const iconMap = {
      spinner: null,
      dots: null,
      pulse: null,
      appointment: "fas fa-calendar-check",
      treatment: "fas fa-user-md",
      lab: "fas fa-flask",
      medicine: "fas fa-pills",
      consultation: "fas fa-comments",
      upload: "fas fa-cloud-upload-alt",
      download: "fas fa-download",
      processing: "fas fa-cog fa-spin",
    };
    return iconMap[type];
  };

  // Render loading content
  const LoadingContent = () => (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        currentSize.container,
        currentSize.spacing
      )}
    >
      {/* Icon */}
      {showIcon && getTypeIcon() && (
        <i
          className={cn(getTypeIcon(), currentSize.icon, "mb-2")}
          style={{ color: currentVariant.spinner }}
        />
      )}

      {/* Loading Animation */}
      <div className="flex items-center justify-center">
        {type === "dots" && <DotsLoading />}
        {type === "pulse" && <PulseLoading />}
        {(type === "spinner" || !["dots", "pulse"].includes(type)) && (
          <Spinner />
        )}
      </div>

      {/* Progress Bar */}
      {progress !== null && (
        <div className="w-full max-w-xs">
          <ProgressBar />
        </div>
      )}

      {/* Text */}
      {text && (
        <p
          className={cn("font-medium text-center", currentSize.text)}
          style={{ color: currentVariant.text }}
        >
          {text}
        </p>
      )}

      {/* Sub Text */}
      {subText && (
        <p
          className={cn("text-center opacity-80", currentSize.subText)}
          style={{ color: currentVariant.subText }}
        >
          {subText}
        </p>
      )}
    </div>
  );

  // Full screen loading
  if (fullScreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          overlay ? "bg-black/20 backdrop-blur-sm" : ""
        )}
        style={{
          backgroundColor: overlay
            ? undefined
            : currentVariant.background + "e6",
        }}
      >
        <div
          className="rounded-xl shadow-lg"
          style={{
            backgroundColor: currentVariant.background,
            boxShadow: MEDICAL_SHADOWS.large,
          }}
        >
          <LoadingContent />
        </div>
      </div>
    );
  }

  // Overlay loading
  if (overlay) {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div
          className="rounded-xl shadow-md"
          style={{
            backgroundColor: currentVariant.background,
            boxShadow: MEDICAL_SHADOWS.medium,
          }}
        >
          <LoadingContent />
        </div>
      </div>
    );
  }

  // Regular loading
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <LoadingContent />
    </div>
  );
};

export default Loading;
