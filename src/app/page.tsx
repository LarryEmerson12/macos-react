"use client";

import React, { useState } from "react";
import Dock from "@/components/Dock";
import ContextMenu from "@/components/ContextMenu";
import TopBar from "@/components/TopBar";
import Button from "@/components/Button";
import Window from "@/components/Window";
import Image from "next/image";
import Input from "@/components/Input";

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
      className="min-h-screen bg-[url('/wallpapers/Macintosh.png')] bg-cover bg-center p-4 flex justify-center items-end"
    >
      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={contextMenuClose}
        />
      )}
      <TopBar />{" "}
      <div className="absolute">
        <Window title="System Preferences">
          <aside className="hidden w-[250px] flex-col md:flex p-4">
            <Input placeholder="Search..." />
            <Button className="w-[19.5ch] h-[3ch] my-2 inline-block">
              <Image
                src="/icons/wallpaper-icon.svg"
                width={23}
                height={16}
                alt=""
                className="me-1"
              />
              <span className="pt-[2.5px]">Wallpaper</span>
            </Button>
          </aside>
          <div className="grid grid-cols-3">
            {}
          </div>
        </Window>
      </div>
      {/* <Button onClick={requestFullscreen}>Go Fullscreen</Button> */}
      <Dock />
    </div>
  );
}
