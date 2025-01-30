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

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      // Get the element under the cursor
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;

      if (target) {
        const isDisabled = target.closest("[disabled]") !== null;

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
        } else if (
          (target.tagName === "A" || target.tagName === "BUTTON") &&
          !isDisabled
        ) {
          setCursorType("pointer");
        } else {
          setCursorType("default");
        }
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [isSelectingText, isLoading]);

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