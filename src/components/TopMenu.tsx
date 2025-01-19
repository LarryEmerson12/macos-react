"use client";

import Menu from "./Menu";
import React from "react";

export default function TopMenu() {
  const menuItems = ["File", "Edit", "View", "Go", "Window", "Help"];
  return (
    <div className="absolute flex w-full bg-white/35 h-6 backdrop-blur-lg top-0 p-1">
      <span className="font-bold text-black text-xs mx-2 h-4">Finder</span>
      {menuItems.map((i) => (
        <span key={i} className="text-xs text-black mx-2 h-4">{i}</span>
      ))}
    </div>
  );
}
