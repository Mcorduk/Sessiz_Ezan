import React from "react";
import { useCountdownTimer } from "../hooks/useCountdownTimer";

export interface TagProps {
  children?: React.ReactNode;
  targetTime?: string;
  variant?: "default" | "popup" | "badge";
}

export default function Tag({
  children,
  targetTime,
  variant = "default",
}: TagProps) {
  const timeLeft = useCountdownTimer(targetTime);

  const getVariantStyles = () => {
    switch (variant) {
      case "popup":
        return "absolute top-0 left-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg";
      case "badge":
        return "inline-block bg-blue-500 text-white px-3 py-1 rounded-full";
      default:
        return "inline-block bg-gray-200 text-black px-4 py-2 rounded-md";
    }
  };

  return (
    <div className={`relative ${getVariantStyles()}`}>
      {targetTime ? timeLeft : children}
    </div>
  );
}
