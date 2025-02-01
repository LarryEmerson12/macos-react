"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MacCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSelectingText, setIsSelectingText] = useState(false);
  const size = 24;

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

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.addEventListener("mousemove", handleMouseMove);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const cursorImage = {
    default: "/cursors/default-cursor.png",
    pointer: "/cursors/pointer-cursor.png",
    text: "/cursors/text-cursor.png",
    wait: "/cursors/wait-cursor.png",
  };

  return (
    <motion.div
      className="pointer-coarse:hidden"
      style={{
        position: "fixed",
        top: mousePosition.y - size / 2,
        left: mousePosition.x - size / 2,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <img
        src={isSelectingText ? cursorImage.text : cursorImage.default}
        alt="Custom Cursor"
        width={size}
        height={size}
      />
    </motion.div>
  );
};

export default MacCursor;