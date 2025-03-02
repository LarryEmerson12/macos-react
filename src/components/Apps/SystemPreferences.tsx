"use client";

import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import wallpapers from "@/config/WallpaperConfig";

interface SystemPreferencesProps {
  setWallpaper: (url: string) => void;
}

export default function SystemPreferences({ setWallpaper }: SystemPreferencesProps) {
  return (
    <>
      <aside className="hidden w-[250px] flex-col md:flex p-4">
        <Input placeholder="Search..." />
        <Button className="w-[19.5ch] h-[3ch] my-2 inline-block">
          <Image
            src="/icons/wallpaper-icon.svg"
            width={23}
            height={16}
            alt=""
            className="me-2"
          />
          <span className="pt-[2.5px]">Wallpaper</span>
        </Button>
      </aside>
      <div className="overflow-y-auto h-[400px] p-4 hide-scrollbar">
        <div className="grid grid-cols-3 gap-4">
          {wallpapers.map((wallpaperItem) => (
            <div
              key={wallpaperItem.name}
              className="relative w-full h-48 cursor-pointer"
              onClick={() => setWallpaper(wallpaperItem.url)}
            >
              <Image
                src={wallpaperItem.url}
                layout="fill"
                objectFit="cover"
                alt={wallpaperItem.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}