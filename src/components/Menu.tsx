import React from "react";

interface MenuProps {
  content: Array<string>;
}

export default function Menu({ content }: MenuProps) {
  return (
    <div className="select-none bg-white/10 rounded-2xl backdrop-blur-lg flex flex-col min-w-20 min-h-20 p-2">
      {content.map((i) => (
        <button
          key={i}
          className="bg-transparent rounded-lg w-full max-h-6 flex px-2 hover:bg-blue-600"
        >
          {i}
        </button>
      ))}
    </div>
  );
}