import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local"
import MacCursor from "@/components/MacCursor";

export const metadata: Metadata = {
  title: "macOS in React",
  description: "Generated by create next app",
};

const sanFransisco = localFont({ src: './sf-pro.woff2' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sanFransisco.className}>
        <MacCursor size={23} />
        {children}
      </body>
    </html>
  );
}
