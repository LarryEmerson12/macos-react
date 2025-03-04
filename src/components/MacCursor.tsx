"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MacCursorProps {
  size: number;
}

const MacCursor: React.FC<MacCursorProps> = ({ size }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSelectingText, setIsSelectingText] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleSelectionChange = () => {
      if (document.getSelection()?.toString()) {
        setIsSelectingText(true);
      } else {
        setIsSelectingText(false);
      }
    };

    const handlePointerChange = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseDown = () => {
      setIsGrabbing(true);
    };

    const handleMouseUp = () => {
      setIsGrabbing(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousemove", handlePointerChange);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mousemove", handlePointerChange);
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handlePointerChange);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handlePointerChange);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const cursorImage = {
    default: "/cursors/default-cursor.png",
    text: "/cursors/text-cursor.png",
    pointer: "/cursors/pointer-cursor.png",
    grab: "/cursors/grab-cursor.png",
  };

  return (
    <motion.div
      className="pointer-coarse:hidden"
      style={{
        position: "fixed",
        top: mousePosition.y - size / 5,
        left: mousePosition.x - size / 5,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <Image
        src={
          isGrabbing
            ? cursorImage.grab
            : isPointer
            ? cursorImage.pointer
            : isSelectingText
            ? cursorImage.text
            : cursorImage.default
        }
        alt="Custom Cursor"
        width={size}
        height={size}
      />
    </motion.div>
  );
};

export default MacCursor;