"use client"

interface ButtonProps {
  children: any,
}

export default function Button({ children }: ButtonProps) {
  return(
    <span className="bg-blue-600 rounded-lg p-1 text-sm m-2">{children}</span>
  )
}
