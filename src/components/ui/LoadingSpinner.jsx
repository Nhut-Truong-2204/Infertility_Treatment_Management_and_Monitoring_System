import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component LoadingSpinner đơn giản cho ứng dụng y tế
 * Tương thích ngược và tích hợp với hệ thống màu y tế
 */
const LoadingSpinner = ({
  size = "medium",
  text = "Đang tải...",
  variant = "primary",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const variants = {
    primary: "border-primary border-t-transparent",
    medical: "border-accent border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };

  const textVariants = {
    primary: "text-primary",
    medical: "text-accent",
    gray: "text-gray-600",
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center p-8", className)}
    >
      <div
        className={cn(
          "rounded-full animate-spin",
          sizeClasses[size],
          variants[variant]
        )}
      ></div>
      {text && (
        <p className={cn("mt-4 font-medium", textVariants[variant])}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
