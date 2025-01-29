"use client"

interface ButtonProps {
  children: any
}

export default function Button({ children }: ButtonProps) {
  const baseStyles = "rounded-lg w-full max-h-6 flex px-2 bg-blue-600"
  return (
    <button
      className="bg-transparent rounded-lg w-full max-h-6 flex px-2 hover:bg-blue-600"
    >
      {children}
    </button>
  )
}