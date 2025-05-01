import React from "react";
import { motion } from "framer-motion";
import { cn, getInitials } from "../../lib/utils";

export const Avatar = ({ src, name, size = "md", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-full flex items-center justify-center overflow-hidden bg-gray-200 text-gray-600 font-medium",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </motion.div>
  );
};
