import React, { useState, useEffect } from "react";
import { Loader, Download, RefreshCw, Clock, Settings } from "lucide-react";

export const SimpleLoadingSpinner = ({
  text = "Đang tải...",
  subText = "Vui lòng chờ trong giây lát",
  variant = "default",
  size = "medium",
  icon = "auto",
}) => {
  const variants = {
    default: {
      spinner: "border-blue-500",
      text: "text-gray-700",
      subText: "text-gray-500",
      icon: "text-blue-500",
    },
    primary: {
      spinner: "border-indigo-500",
      text: "text-indigo-700",
      subText: "text-indigo-500",
      icon: "text-indigo-500",
    },
    success: {
      spinner: "border-green-500",
      text: "text-green-700",
      subText: "text-green-500",
      icon: "text-green-500",
    },
    warning: {
      spinner: "border-orange-500",
      text: "text-orange-700",
      subText: "text-orange-500",
      icon: "text-orange-500",
    },
    medical: {
      spinner: "border-red-500",
      text: "text-red-700",
      subText: "text-red-500",
      icon: "text-red-500",
    },
  };

  const sizes = {
    small: {
      spinner: "w-12 h-12 border-3",
      text: "text-lg",
      subText: "text-base",
      spacing: "space-y-4",
      icon: "w-5 h-5",
    },
    medium: {
      spinner: "w-16 h-16 border-4",
      text: "text-xl",
      subText: "text-lg",
      spacing: "space-y-5",
      icon: "w-6 h-6",
    },
    large: {
      spinner: "w-20 h-20 border-4",
      text: "text-2xl",
      subText: "text-xl",
      spacing: "space-y-6",
      icon: "w-8 h-8",
    },
  };

  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = ["loader", "download", "sync", "clock", "settings"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = icon === "auto" ? icons[currentIconIndex] : icon;

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const getIcon = () => {
    const iconProps = {
      className: `${currentSize.icon} ${currentVariant.icon}`,
    };

    switch (currentIcon) {
      case "download":
        return <Download {...iconProps} />;
      case "sync":
        return <RefreshCw {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      default:
        return <Loader {...iconProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div
          className={`${currentSize.spinner} ${currentVariant.spinner} border-t-transparent rounded-full animate-spin`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>

      <div className={`text-center mt-8 ${currentSize.spacing}`}>
        <h3
          className={`${currentSize.text} font-semibold ${currentVariant.text}`}
        >
          {text}
        </h3>
        {subText && (
          <p className={`${currentSize.subText} ${currentVariant.subText}`}>
            {subText}
          </p>
        )}
      </div>
    </div>
  );
};

export const DotsLoading = ({
  text = "Đang tải...",
  subText,
  variant = "default",
  icon = "auto",
}) => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = ["loader", "download", "sync", "clock", "settings"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = icon === "auto" ? icons[currentIconIndex] : icon;

  const variants = {
    default: { 
      dots: "bg-blue-500",
      icon: "text-blue-500",
      text: "text-gray-700",
      subText: "text-gray-500",
    },
    primary: { 
      dots: "bg-indigo-500",
      icon: "text-indigo-500",
      text: "text-indigo-700",
      subText: "text-indigo-500",
    },
    success: { 
      dots: "bg-green-500",
      icon: "text-green-500",
      text: "text-green-700",
      subText: "text-green-500",
    },
    warning: { 
      dots: "bg-orange-500",
      icon: "text-orange-500",
      text: "text-orange-700",
      subText: "text-orange-500",
    },
    medical: { 
      dots: "bg-red-500",
      icon: "text-red-500",
      text: "text-red-700",
      subText: "text-red-500",
    },
  };

  const currentVariant = variants[variant];

  const getIcon = () => {
    const iconProps = {
      className: `w-6 h-6 ${currentVariant.icon} mb-4`,
    };

    switch (currentIcon) {
      case "download":
        return <Download {...iconProps} />;
      case "sync":
        return <RefreshCw {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      default:
        return <Loader {...iconProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {getIcon()}
      
      <div className="flex space-x-3 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 ${currentVariant.dots} rounded-full animate-bounce`}
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>

      <div className="text-center space-y-3">
        <h3 className={`text-xl font-semibold ${currentVariant.text}`}>{text}</h3>
        {subText && <p className={`text-lg ${currentVariant.subText}`}>{subText}</p>}
      </div>
    </div>
  );
};

// Pulse Loading Component
export const PulseLoading = ({
  text = "Đang tải...",
  subText,
  variant = "default",
  icon = "auto",
}) => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = ["loader", "download", "sync", "clock", "settings"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = icon === "auto" ? icons[currentIconIndex] : icon;

  const variants = {
    default: { 
      pulse: "bg-blue-500",
      icon: "text-blue-500",
      text: "text-gray-700",
      subText: "text-gray-500",
    },
    primary: { 
      pulse: "bg-indigo-500",
      icon: "text-indigo-500",
      text: "text-indigo-700",
      subText: "text-indigo-500",
    },
    success: { 
      pulse: "bg-green-500",
      icon: "text-green-500",
      text: "text-green-700",
      subText: "text-green-500",
    },
    warning: { 
      pulse: "bg-orange-500",
      icon: "text-orange-500",
      text: "text-orange-700",
      subText: "text-orange-500",
    },
    medical: { 
      pulse: "bg-red-500",
      icon: "text-red-500",
      text: "text-red-700",
      subText: "text-red-500",
    },
  };

  const currentVariant = variants[variant];

  const getIcon = () => {
    const iconProps = {
      className: `w-8 h-8 ${currentVariant.icon}`,
    };

    switch (currentIcon) {
      case "download":
        return <Download {...iconProps} />;
      case "sync":
        return <RefreshCw {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      default:
        return <Loader {...iconProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        <div
          className={`w-20 h-20 ${currentVariant.pulse} rounded-full animate-pulse`}
        ></div>
        <div
          className={`absolute inset-0 w-20 h-20 ${currentVariant.pulse} rounded-full animate-ping opacity-25`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className={`text-xl font-semibold ${currentVariant.text}`}>{text}</h3>
        {subText && <p className={`text-lg ${currentVariant.subText}`}>{subText}</p>}
      </div>
    </div>
  );
};

// Line Loading Component
export const LineLoading = ({
  text = "Đang tải...",
  subText,
  variant = "default",
  icon = "auto",
}) => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = ["loader", "download", "sync", "clock", "settings"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = icon === "auto" ? icons[currentIconIndex] : icon;

  const variants = {
    default: { 
      line: "bg-blue-500",
      icon: "text-blue-500",
      text: "text-gray-700",
      subText: "text-gray-500",
    },
    primary: { 
      line: "bg-indigo-500",
      icon: "text-indigo-500",
      text: "text-indigo-700",
      subText: "text-indigo-500",
    },
    success: { 
      line: "bg-green-500",
      icon: "text-green-500",
      text: "text-green-700",
      subText: "text-green-500",
    },
    warning: { 
      line: "bg-orange-500",
      icon: "text-orange-500",
      text: "text-orange-700",
      subText: "text-orange-500",
    },
    medical: { 
      line: "bg-red-500",
      icon: "text-red-500",
      text: "text-red-700",
      subText: "text-red-500",
    },
  };

  const currentVariant = variants[variant];

  const getIcon = () => {
    const iconProps = {
      className: `w-6 h-6 ${currentVariant.icon} mb-4`,
    };

    switch (currentIcon) {
      case "download":
        return <Download {...iconProps} />;
      case "sync":
        return <RefreshCw {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      default:
        return <Loader {...iconProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {getIcon()}
      
      <div className="mb-8">
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${currentVariant.line} rounded-full animate-pulse`}
            style={{
              animation: "loading-line 1.5s ease-in-out infinite",
              transformOrigin: "left",
            }}
          ></div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className={`text-xl font-semibold ${currentVariant.text}`}>{text}</h3>
        {subText && <p className={`text-lg ${currentVariant.subText}`}>{subText}</p>}
      </div>

      <style jsx>{`
        @keyframes loading-line {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
      `}</style>
    </div>
  );
};

// Minimal Loading Component
export const MinimalLoading = ({
  text = "Đang tải...",
  subText,
  variant = "default",
  icon = "auto",
}) => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const icons = ["loader", "download", "sync", "clock", "settings"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % icons.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIcon = icon === "auto" ? icons[currentIconIndex] : icon;

  const variants = {
    default: { 
      spinner: "text-blue-500",
      icon: "text-blue-500",
      text: "text-gray-700",
      subText: "text-gray-500",
    },
    primary: { 
      spinner: "text-indigo-500",
      icon: "text-indigo-500",
      text: "text-indigo-700",
      subText: "text-indigo-500",
    },
    success: { 
      spinner: "text-green-500",
      icon: "text-green-500",
      text: "text-green-700",
      subText: "text-green-500",
    },
    warning: { 
      spinner: "text-orange-500",
      icon: "text-orange-500",
      text: "text-orange-700",
      subText: "text-orange-500",
    },
    medical: { 
      spinner: "text-red-500",
      icon: "text-red-500",
      text: "text-red-700",
      subText: "text-red-500",
    },
  };

  const currentVariant = variants[variant];

  const getIcon = () => {
    const iconProps = {
      className: `w-6 h-6 ${currentVariant.icon} mb-4`,
    };

    switch (currentIcon) {
      case "download":
        return <Download {...iconProps} />;
      case "sync":
        return <RefreshCw {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "settings":
        return <Settings {...iconProps} />;
      default:
        return <Loader {...iconProps} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-40">
      {getIcon()}
      
      <div className={`text-3xl ${currentVariant.spinner} mb-6`}>
        <svg className="animate-spin w-12 h-12" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>

      <div className="text-center space-y-3">
        <h3 className={`text-xl font-semibold ${currentVariant.text}`}>{text}</h3>
        {subText && <p className={`text-lg ${currentVariant.subText}`}>{subText}</p>}
      </div>
    </div>
  );
};

// Default export - có thể export component nào bạn muốn làm mặc định
export default SimpleLoadingSpinner;