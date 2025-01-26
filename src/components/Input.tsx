"use client"

import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string,
  error?: string,
  className?: string,
}

export default function Input({
  placeholder = "",
  error,
  className = "",
  ...props
}: InputProps) {
  const baseStyles = "h-8 rounded-md bg-white/10 backdrop-blur-lg focus:outline-none px-2 font-extralight text-gray-500"
  return (
    <div className="relative">
      <input
        className={`${baseStyles} ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}