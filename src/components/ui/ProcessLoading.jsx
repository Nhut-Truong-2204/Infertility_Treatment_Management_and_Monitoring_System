import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component Loading cho các quy trình y tế đặc biệt
 * Dành cho các tác vụ như xét nghiệm, thủ thuật, điều trị
 */
const ProcessLoading = ({
  type = "general",
  stage = "",
  progress = 0,
  message = "Đang xử lý...",
  showProgress = false,
  size = "medium",
  className = "",
}) => {
  // Định nghĩa các loại quy trình y tế
  const processTypes = {
    general: {
      icon: "fas fa-cog",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      description: "Đang xử lý yêu cầu",
    },
    labtest: {
      icon: "fas fa-flask",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Đang xử lý kết quả xét nghiệm",
    },
    appointment: {
      icon: "fas fa-calendar-check",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Đang xác nhận lịch hẹn",
    },
    treatment: {
      icon: "fas fa-user-md",
      color: "text-accent",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      description: "Đang chuẩn bị phác đồ điều trị",
    },
    prescription: {
      icon: "fas fa-pills",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Đang xử lý đơn thuốc",
    },
    upload: {
      icon: "fas fa-upload",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "Đang tải lên tài liệu",
    },
    download: {
      icon: "fas fa-download",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      description: "Đang tải xuống báo cáo",
    },
  };

  const sizes = {
    small: {
      container: "p-4",
      icon: "text-2xl",
      text: "text-sm",
      subText: "text-xs",
      spacing: "space-y-2",
    },
    medium: {
      container: "p-6",
      icon: "text-3xl",
      text: "text-base",
      subText: "text-sm",
      spacing: "space-y-3",
    },
    large: {
      container: "p-8",
      icon: "text-4xl",
      text: "text-lg",
      subText: "text-base",
      spacing: "space-y-4",
    },
  };

  const currentType = processTypes[type];
  const currentSize = sizes[size];

  // Animation icon
  const AnimatedIcon = () => (
    <div className="relative">
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center border-2",
          currentType.bgColor,
          currentType.borderColor,
          "animate-pulse"
        )}
      >
        <i
          className={cn(currentType.icon, currentType.color, currentSize.icon)}
        ></i>
      </div>

      {/* Ripple effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 animate-ping opacity-20",
          currentType.borderColor
        )}
      ></div>
    </div>
  );

  // Progress bar cho các tác vụ cần hiển thị tiến độ
  const ProgressBar = () =>
    showProgress && (
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs mb-1">
          <span className={cn("font-medium", currentType.color)}>Tiến độ</span>
          <span className={cn(currentType.color)}>{Math.round(progress)}%</span>
        </div>
        <div
          className={cn(
            "w-full bg-gray-200 rounded-full h-2",
            currentType.bgColor
          )}
        >
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentType.color.replace("text-", "bg-")
            )}
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          ></div>
        </div>
      </div>
    );

  // Dots loading animation
  const DotsLoading = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full animate-bounce",
            currentType.color.replace("text-", "bg-")
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s",
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        currentSize.container,
        currentSize.spacing,
        "bg-white rounded-xl border border-gray-100 shadow-sm",
        className
      )}
    >
      <AnimatedIcon />

      <div className="text-center">
        <h3
          className={cn("font-semibold", currentType.color, currentSize.text)}
        >
          {message}
        </h3>

        {stage && (
          <p className={cn("text-gray-600", currentSize.subText)}>{stage}</p>
        )}

        <p className={cn("text-gray-500 mt-1", currentSize.subText)}>
          {currentType.description}
        </p>
      </div>

      <ProgressBar />

      <DotsLoading />
    </div>
  );
};

export default ProcessLoading;
