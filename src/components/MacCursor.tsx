"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MacMousePosition {
  x: number;
  y: number;
}

interface MacCursorProps {
  size: number;
}

type CursorType = "default" | "pointer" | "text";

export default function MacCursor({ size }: MacCursorProps) {
  const [mousePosition, setMousePosition] = useState<MacMousePosition>({
    x: 0,
    y: 0,
  });
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isSelectingText, setIsSelectingText] = useState(false);

  // Track mouse movement
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Track text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        setIsSelectingText(true); // Text is being selected
      } else {
        setIsSelectingText(false); // Text selection is cleared
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  // Track hover states for links, buttons, inputs, etc.
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (isSelectingText) {
        setCursorType("text"); // Force text cursor during text selection
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        setCursorType("text");
      } else if (target.tagName === "A" || target.tagName === "BUTTON") {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isSelectingText]); // Re-run effect when isSelectingText changes

  const variants = {
    default: {
      x: mousePosition.x - 0,
      y: mousePosition.y - 0,
    },
  };

  const cursorImage = {
    default: "/cursors/default-cursor.png",
    pointer: "/cursors/pointer-cursor.png",
    text: "/cursors/text-cursor.png",
  };

  return (
    <motion.div
    className="pointer-coarse:hidden"
      variants={variants}
      animate="default"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <Image
        src={cursorImage[cursorType]}
        width={size}
        height={40}
        alt="cursor"
      />
    </motion.div>
  );
}