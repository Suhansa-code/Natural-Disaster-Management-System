import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Badge = ({ children, variant = "default", color, className }) => {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default"
          ? "bg-gray-100 text-gray-800"
          : "border border-gray-300 text-gray-600",
        color,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
