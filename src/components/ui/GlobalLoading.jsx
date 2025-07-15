import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component Global Loading cho toàn bộ ứng dụng y tế
 * Thiết kế với màu sắc và cảm giác phù hợp với môi trường y tế
 */
const GlobalLoading = ({
  isLoading,
  message = "Đang tải...",
  variant = "medical",
}) => {
  if (!isLoading) {
    return null;
  }

  const variants = {
    medical: {
      bg: "bg-white/95",
      overlay: "backdrop-blur-sm",
      spinner: "border-accent",
      pulse: "bg-accent/20",
      text: "text-accent",
      icon: "text-accent",
    },
    primary: {
      bg: "bg-primary/95",
      overlay: "backdrop-blur-sm",
      spinner: "border-white",
      pulse: "bg-white/20",
      text: "text-white",
      icon: "text-white",
    },
    gentle: {
      bg: "bg-pink-50/95",
      overlay: "backdrop-blur-sm",
      spinner: "border-pink-500",
      pulse: "bg-pink-200/50",
      text: "text-pink-700",
      icon: "text-pink-500",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center",
        currentVariant.bg,
        currentVariant.overlay
      )}
    >
      <div className="text-center">
        {/* Medical Loading Animation */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Pulse Background */}
          <div
            className={cn(
              "absolute inset-0 rounded-full animate-ping",
              currentVariant.pulse
            )}
          ></div>

          {/* Main Spinner */}
          <div
            className={cn(
              "relative w-24 h-24 border-4 border-solid border-t-transparent rounded-full animate-spin",
              currentVariant.spinner
            )}
          ></div>

          {/* Center Medical Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <i
              className={cn(
                "fas fa-heartbeat text-2xl animate-pulse",
                currentVariant.icon
              )}
            ></i>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className={cn("text-lg font-medium", currentVariant.text)}>
            {message}
          </p>

          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full animate-bounce",
                  currentVariant.icon.replace("text-", "bg-")
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.6s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
