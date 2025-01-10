"use client";

import Dock from "@/components/Dock";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Corrected import from 'motion/react' to 'framer-motion'

interface MousePosition {
  x: number;
  y: number;
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
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
  }, []); // Added empty dependency array to ensure useEffect runs only once

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
  };

  return (
    <div className="min-h-screen bg-[url('/big-sur.jpg')] bg-cover bg-center p-4 flex justify-center items-end">
      <Dock />
      <motion.div id="cursor" variants={variants} animate="default" />
    </div>
  );
}