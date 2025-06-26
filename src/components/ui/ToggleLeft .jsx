"use client";

import { motion, useAnimation } from "framer-motion";
import React from "react";

const circleVariants = {
  normal: {
    cx: 8,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  animate: {
    cx: 16,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

const ToggleLeft = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  ...props
}) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
        <motion.circle
          cy="12"
          r="2"
          variants={circleVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  );
};

export { ToggleLeft };
