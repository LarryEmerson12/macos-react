import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IpadMousePosition {
  x: number;
  y: number;
}

export default function IpadCursor() {
  const [mousePosition, setMousePosition] = useState<IpadMousePosition>({
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
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
  };
  return (
    <motion.div id="ipadCursor" variants={variants} animate="default" />
  );
}
