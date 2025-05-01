import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const Card = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className }) => {
  return (
    <div
      className={cn("px-4 py-3 border-b border-gray-200 bg-gray-50", className)}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={cn("p-4", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }) => {
  return (
    <div
      className={cn("px-4 py-3 border-t border-gray-200 bg-gray-50", className)}
    >
      {children}
    </div>
  );
};
