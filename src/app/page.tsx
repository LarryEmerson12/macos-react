"use client";

import React, { useEffect, useState } from "react";
import Dock from "@/components/Dock";
import ContextMenu from "@/components/ContextMenu";
import TopBar from "@/components/TopBar";
import MacCursor from "@/components/MacCursor";

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function Home() {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const contextMenuClose = () => setContextMenu(initialContextMenu);

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className="min-h-screen bg-[url('/wallpapers/big-sur.jpg')] bg-cover bg-center p-4 flex justify-center items-end"
    >
      <MacCursor size={23} />
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={contextMenuClose}
        />
      )}
      <TopBar />
      <Dock />
    </div>
  );
}