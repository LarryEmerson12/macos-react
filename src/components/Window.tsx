"use client";

import React, { useRef, useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface WindowProps {
  title: string;
  children: React.ReactNode;
}

export default function Window({ title, children }: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(true);
  const [w, setW] = useState(800); // big width = 1360
  const [h, setH] = useState(600); // big height = 610

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  function maximize() {
    setW(1360);
    setH(610);
  }

  return (
    isOpen && (
      <Draggable nodeRef={nodeRef as React.RefObject<HTMLElement>} onDrag={handleDrag}>
        <ResizableBox
          width={w}
          height={h}
          minConstraints={[300, 200]}
          maxConstraints={[1200, 800]}
          className="macos-window bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div ref={nodeRef} className="relative w-full h-full">
            <div className="macos-window-header flex items-center justify-between p-2 bg-gray-200 border-b border-gray-300">
              <div className="macos-window-header-buttons flex gap-2">
                <button
                  className="macos-window-header-button w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                  onClick={() => setIsOpen(false)}
                ></button>
                <button
                  className="macos-window-header-button w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
                  onClick={() => setIsOpen(false)}
                ></button>
                <button
                  className="macos-window-header-button w-3 h-3 bg-green-500 rounded-full cursor-pointer"
                  onClick={maximize}
                ></button>
              </div>
              <div className="macos-window-title flex-grow text-center text-black">
                {title}
              </div>
            </div>
            <div className="macos-window-content p-4">{children}</div>
          </div>
        </ResizableBox>
      </Draggable>
    )
  );
}