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
        "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-sm hover:shadow-md",
      secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500/50 border border-gray-300",
      outline:
        "border border-primary bg-white text-primary hover:bg-primary/5 focus:ring-primary/50 hover:border-primary/80",
      ghost: "text-primary hover:bg-primary/10 focus:ring-primary/50",
      medical:
        "bg-accent text-white hover:bg-accent/90 focus:ring-accent/50 shadow-sm hover:shadow-md",
      gentle:
        "bg-pink-100 text-pink-700 hover:bg-pink-200 focus:ring-pink-500/50 border border-pink-300",
      professional:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50 shadow-sm",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50 shadow-sm",
      success:
        "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500/50 shadow-sm",
      warning:
        "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500/50 shadow-sm",
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
