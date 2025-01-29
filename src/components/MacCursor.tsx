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
  isLoading?: boolean;
}

type CursorType = "default" | "pointer" | "text" | "wait";

export default function MacCursor({ size, isLoading = false }: MacCursorProps) {
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

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        setIsSelectingText(true);
      } else {
        setIsSelectingText(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (isLoading) {
        setCursorType("wait");
      } else if (isSelectingText) {
        setCursorType("text");
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
  }, [isSelectingText, isLoading]);

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
      <Image
        src={cursorImage[cursorType]}
        width={size}
        height={size}
        alt="cursor"
        className={cursorType === "wait" ? "animate-spin" : ""}
      />
    </motion.div>
  );
}