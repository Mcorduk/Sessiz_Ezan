import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  className = "",
  onClick,
}: IButtonProps) {
  return (
    <button
      className={` hover:bg-gray-700 focus:ring-gray-100 rounded-lg text-sm   dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
