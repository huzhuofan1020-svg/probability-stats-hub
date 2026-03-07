import type { Metadata } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Probability Hub | 概率统计智库",
  description: "全方位的概率论与数理统计学习平台，包含可视化演示与思政案例。",
};

import Navbar from "@/components/Navbar";
import { GameProvider } from "@/context/GameContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${fredoka.variable} ${outfit.variable} antialiased selection:bg-neb-accent selection:text-neb-text`}
      >
        <GameProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
