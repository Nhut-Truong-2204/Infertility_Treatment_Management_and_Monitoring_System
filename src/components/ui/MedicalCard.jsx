import React from "react";
import { cn } from "../../lib/utils";

/**
 * Component Card chuyên dụng cho ứng dụng y tế hiếm muộn
 * Thiết kế nhẹ nhàng, chuyên nghiệp phù hợp với môi trường y tế
 */
const MedicalCard = ({
  variant = "default",
  size = "medium",
  shadow = "sm",
  border = true,
  hover = true,
  className = "",
  children,
  ...props
}) => {
  const variants = {
    default: {
      bg: "bg-white",
      border: "border-gray-200",
      text: "text-gray-900",
    },
    primary: {
      bg: "bg-primary/5",
      border: "border-primary/20",
      text: "text-primary",
    },
    medical: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-900",
    },
    success: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-900",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-900",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-900",
    },
  };

  const sizes = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const currentVariant = variants[variant];
  const hoverEffect = hover
    ? "hover:shadow-md transition-shadow duration-200"
    : "";

  return (
    <div
      className={cn(
        "rounded-xl",
        currentVariant.bg,
        currentVariant.text,
        border && `border ${currentVariant.border}`,
        sizes[size],
        shadows[shadow],
        hoverEffect,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header component
const MedicalCardHeader = ({ className = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between mb-4 pb-3 border-b border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Title component
const MedicalCardTitle = ({ className = "", children, ...props }) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

// Card Description component
const MedicalCardDescription = ({ className = "", children, ...props }) => {
  return (
    <p className={cn("text-sm text-gray-600 mt-1", className)} {...props}>
      {children}
    </p>
  );
};

// Card Content component
const MedicalCardContent = ({ className = "", children, ...props }) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
};

// Card Footer component
const MedicalCardFooter = ({ className = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between pt-3 mt-4 border-t border-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Action component cho các nút bấm
const MedicalCardAction = ({ className = "", children, ...props }) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
};

// Export tất cả components
MedicalCard.Header = MedicalCardHeader;
MedicalCard.Title = MedicalCardTitle;
MedicalCard.Description = MedicalCardDescription;
MedicalCard.Content = MedicalCardContent;
MedicalCard.Footer = MedicalCardFooter;
MedicalCard.Action = MedicalCardAction;

export default MedicalCard;
