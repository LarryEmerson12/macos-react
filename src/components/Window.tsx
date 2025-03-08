"use client";

import React, { useState } from "react";
import Draggable from "./Draggable";

interface WindowProps {
  title: string;
  children: React.ReactNode;
}

export default function Window({ title, children }: WindowProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    isOpen && (
      <Draggable>
        <div
          className={`relative ${
            isMaximized ? "w-[75ch] h-full" : "w-full h-full"
          } bg-white rounded-lg`}
        >
          <div className="flex items-center justify-between p-2 bg-gray-200 border-b border-gray-300 rounded-t-lg">
            <div className="flex gap-2">
              <button
                className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-slate-400"
                onClick={() => setIsOpen(false)}
              ></button>
              <button
                className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:bg-slate-400"
                onClick={() => setIsOpen(false)}
              ></button>
              <button
                className={`w-3 h-3 ${
                  isMaximized ? "bg-slate-400" : "bg-green-500"
                } rounded-full cursor-pointer hover:bg-slate-400 transition duration-300`}
                onClick={toggleMaximize}
              ></button>
            </div>
            <div className="flex-grow text-center text-black">{title}</div>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </Draggable>
    )
  );
}
