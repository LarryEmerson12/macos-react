"use client"

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant = "default", disabled = false, className = "", ...props }: ButtonProps) {
  const variantStyles = {
    default: "rounded-lg min-w-10 max-h-6 flex px-2 bg-blue-600 hover:bg-blue-700",
    outline: "rounded-lg min-w-10 max-h-6 flex px-2 border border-gray-600 hover:bg-gray-100",
    ghost: "bg-transparent rounded-lg min-w-10 max-h-6 flex px-2 hover:bg-blue-600",
  };

  const buttonVariant = variantStyles[variant];

  return (
    <button
      className={`${buttonVariant} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      onClick={props.onClick}
      {...props}
    >
      {children}
    </button >
  );
}