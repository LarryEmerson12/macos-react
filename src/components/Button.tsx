"use client"

interface ButtonProps {
  children: any;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
}

export default function Button({ children, variant = "default", disabled = false }: ButtonProps) {
  const variantStyles = {
    default: "rounded-lg min-w-10 max-h-6 flex px-2 bg-blue-600 hover:bg-blue-700",
    outline: "rounded-lg min-w-10 max-h-6 flex px-2 border border-black-600 hover:bg-gray-100",
    ghost: "bg-transparent rounded-lg min-w-10 max-h-6 flex px-2 hover:bg-blue-600",
  };

  const buttonVariant = variantStyles[variant];

  return (
    <button
      className={`${buttonVariant} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}