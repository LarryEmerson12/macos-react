"use client";

import React from "react";

export default function TopMenu() {
  const menuItems = ["File", "Edit", "View", "Go", "Window", "Help"];
  return (
    <div className="absolute flex w-full bg-white/35 h-7 backdrop-blur-lg top-0 p-1">
      <span className="font-bold text-black text-sm mx-2 h-4">Finder</span>
      {menuItems.map((i) => (
        <span key={i} className="text-sm text-black mx-2 h-4">{i}</span>
      ))}
    </div>
  );
}
