"use client";

import React, { useState } from "react";
import { AlertDialog } from "@/components/AlertDialog";
import Dock from "@/components/Dock";
import ContextMenu from "@/components/ContextMenu";
import TopBar from "@/components/TopBar";
import Window from "@/components/Window";
import Notes from "@/components/Apps/Notes";

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

  const [fullscreenDialogOpen, setFullscreenDialogOpen] = useState(true);
  const [wallpaper, setWallpaper] = useState("/wallpapers/SequoiaDark.png");

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{ backgroundImage: `url(${wallpaper})` }}
      className="min-h-screen bg-cover bg-center p-4 flex justify-center items-end"
    >
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={contextMenuClose}
        />
      )}
      <TopBar />
      <div className="absolute">
        <Window title="Notes">
          <Notes />
        </Window>
      </div>
      <Dock />
      <AlertDialog
        imgSrc="/app-icons/safari.svg"
        isOpened={fullscreenDialogOpen}
        title="Enable Fullscreen"
        onClose={() => setFullscreenDialogOpen(false)}
        acceptButtonAction={() => {
          setFullscreenDialogOpen(false), requestFullscreen();
        }}
        cancelButtonText="No thanks"
      >
        This website is best viewed in fullscreen. Would you like to enable
        fullscreen mode?
      </AlertDialog>
    </div>
  );
}