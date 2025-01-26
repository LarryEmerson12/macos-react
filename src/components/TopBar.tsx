"use client";

import topMenuMenu from "@/config/TopMenuConfig";
import Menu from "./Menu";
import { useState } from "react";

const initialTopBarMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function TopBar() {
  const [topBarMenu, setTopBarMenu] = useState(initialTopBarMenu);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null);

  const topBarMenuClose = () => setTopBarMenu(initialTopBarMenu);

  const handleTopBarMenu = (e: React.MouseEvent<HTMLElement>, index: number) => {
    const { pageX, pageY } = e;
    setSelectedMenuIndex(index);
    setTopBarMenu({ show: true, x: pageX, y: pageY });
  };

  const topMenuItems = ["File", "Edit", "View", "Go", "Window", "Help"];

  return (
    <>
      <div className="select-none absolute flex w-full bg-white/35 h-7 backdrop-blur-lg top-0 p-1">
        <span className="select-none font-bold text-black text-sm mx-2 h-4">Finder</span>
        {topMenuItems.map((item, index) => (
          <button
            key={item}
            className="select-none text-sm text-black mx-2 h-4"
            onClick={(e) => handleTopBarMenu(e, index)}
          >
            {item}
          </button>
        ))}
      </div>
      {topBarMenu.show && selectedMenuIndex !== null && (
        <div
          onClick={topBarMenuClose}
          className="absolute z-20"
          style={{ top: `${topBarMenu.y}px`, left: `${topBarMenu.x}px` }}
        >
          <Menu content={topMenuMenu[selectedMenuIndex]} />
        </div>
      )}
    </>
  );
}