"use client"

interface ButtonProps {
  children: any,
  onClick: any;
}

export default function Button({ children, onClick }: ButtonProps) {
  return(
    <span className="bg-blue-600 rounded-lg p-1 text-sm m-2" onClick={onClick}>{children}</span>
  )
}
