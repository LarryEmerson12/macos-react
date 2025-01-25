"use client"

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

export default function MacCursor({size}: MacCursorProps) {
  const [mousePosition, setMousePosition] = useState<MacMousePosition>({
    x: 0,
    y: 0,
  });

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

  const variants = {
    default: {
      x: mousePosition.x - 0,
      y: mousePosition.y - 0,
    },
  };

  return (
    <motion.div
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
      <Image src="cursors/default-cursor.png" width={size} height={40} alt="cursor" />
    </motion.div>
  );
}