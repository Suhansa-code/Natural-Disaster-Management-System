import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export function getStatusColor(status) {
  return statusColors[status] || "bg-gray-100 text-gray-800";
}

const roleColors = {
  admin: "bg-green-100 text-green-700",
  Editor: "bg-blue-100 text-blue-800",
  Viewer: "bg-teal-100 text-teal-800",
  user: "bg-blue-100 text-blue-800",
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export function getRoleColor(role) {
  return roleColors[role] || "bg-gray-100 text-gray-800";
}
