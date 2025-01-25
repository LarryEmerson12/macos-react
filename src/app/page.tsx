"use client";

import React from "react";
import Dock from "@/components/Dock";
import { useState } from "react";
import ContextMenu from "@/components/ContextMenu";
import TopMenu from "@/components/TopMenu";
import Input from "@/components/Input";

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function Home() {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const contextMenuClose = () => setContextMenu(initialContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    console.log("Context menu triggered", e.pageX, e.pageY); // Debugging
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };
  return (
    <div
      onContextMenu={handleContextMenu}
      className="min-h-screen bg-[url('/wallpapers/big-sur.jpg')] bg-cover bg-center p-4 flex justify-center items-end"
    >
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={contextMenuClose}
        />
      )}
      <TopMenu />
      <Dock />
    </div>
  );
}
