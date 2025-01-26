"use client";

import React from "react";
import Dock from "@/components/Dock";
import { useEffect, useState } from "react";
import ContextMenu from "@/components/ContextMenu";
import TopMenu from "@/components/TopMenu";
import MacCursor from "@/components/MacCursor";
import Input from "@/components/Input";

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const contextMenuClose = () => setContextMenu(initialContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };
  return (
    <div
      onContextMenu={handleContextMenu}
      className="min-h-screen bg-[url('/wallpapers/big-sur.jpg')] bg-cover bg-center p-4 flex justify-center items-end"
    >
      <MacCursor size={23} isLoading={isLoading} />
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
