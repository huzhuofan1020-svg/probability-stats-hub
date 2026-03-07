
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ChapterCardProps = {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  bg: string;
};

export function ChapterCard({ id, title, desc, icon: Icon, accent, bg }: ChapterCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "p-6 rounded-2xl border-[3px] border-neb-text shadow-[6px_6px_0px_#1E1B4B] transition-all group",
        bg
      )}
    >
      <div className="flex justify-between items-start">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-br",
            accent
          )}
        >
          <Icon className="w-8 h-8" />
        </div>
        <span className="font-fredoka font-black text-5xl opacity-10">#{id}</span>
      </div>
      <div className="mt-6 space-y-2">
        <h3 className="text-2xl font-fredoka font-black text-neb-text">
          {title}
        </h3>
        <p className="font-outfit text-neb-text/70">{desc}</p>
      </div>
      <div className="mt-8">
        <Link
          href={`/chapters/${id}`}
          className="font-fredoka font-bold text-lg flex items-center gap-2 group-hover:gap-3 transition-all"
        >
          开始学习 <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
}
