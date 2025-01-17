"use client";

import React from "react";
import Image from "next/image";

type Images = {
  [key: number]: string;
};

export default function Dock() {
  const images: Images = {
    0: "finder",
    1: "safari",
    2: "xcode",
    3: "terminal",
    4: "apple-music",
    5: "app-store",
    6: "system-preferences",
  };

  return (
    <div className="w-[48ch] h-[7ch] bg-white/45 rounded-2xl flex justify-around items-center backdrop-blur-lg">
      {Object.keys(images).map((key) => {
        const index = Number(key);
        return (
          <React.Fragment key={index}>
            <Image
              src={`/${images[index]}.png`}
              width={55}
              height={55}
              alt={images[index]}
            />
            {index === 0 && <div className="h-8 w-px bg-gray-600 me-1"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
