"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MacCursor from "@/components/MacCursor";
import ContextMenu from "@/components/ContextMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const handleContextMenu = (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    console.log("Context menu triggered", e.pageX, e.pageY); // Debugging
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const contextMenuClose = () => setContextMenu(initialContextMenu);

  return (
    <html lang="en">
      <body
        onContextMenu={handleContextMenu}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {contextMenu.show && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            closeContextMenu={contextMenuClose}
          />
        )}
        <MacCursor size={16} />
        {children}
      </body>
    </html>
  );
}