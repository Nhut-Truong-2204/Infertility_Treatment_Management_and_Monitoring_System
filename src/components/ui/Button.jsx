import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      disabled = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default:
        "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500/50",
      outline:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500/50",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500/50",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/50",
      modal:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-6 py-2 text-lg",
      icon: "h-10 w-10",
    };

    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed",
          loading && "cursor-not-allowed",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
