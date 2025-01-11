"use client";

import CursorHandler from "@/components/CursorHandler";
import Dock from "@/components/Dock";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/big-sur.jpg')] bg-cover bg-center p-4 flex justify-center items-end">
      <Dock />
      <div className="fixed top-2 left-2">
        <CursorHandler />
      </div>
    </div>
  );
}
