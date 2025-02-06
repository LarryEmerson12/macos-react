"use client";
import React, { useState } from "react";
import Dock from "@/components/Dock";
import ContextMenu from "@/components/ContextMenu";
import TopBar from "@/components/TopBar";
import Button from "@/components/Button";

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

  const requestFullscreen = () => {
    const docElement = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };

    if (docElement.requestFullscreen) {
      docElement.requestFullscreen();
    } else if (docElement.webkitRequestFullscreen) {
      docElement.webkitRequestFullscreen();
    }
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
      <TopBar />
      <Dock />
      <Button onClick={requestFullscreen} className="absolute bottom-4 right-4">
        Go Fullscreen
      </Button>
    </div>
  );
}