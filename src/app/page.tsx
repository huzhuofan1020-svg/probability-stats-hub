"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, Activity, Radio, Cpu, Zap, Library, GraduationCap, BookOpen, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const chapters = [
    { id: 1, title: "随机事件与概率", icon: BookOpen },
    { id: 2, title: "随机变量及其分布", icon: Target },
    { id: 3, title: "多维随机变量及其分布", icon: Activity },
    { id: 4, title: "随机变量的数字特征", icon: TrendingUp },
    { id: 5, title: "大数定律与中心极限定理", icon: Zap },
    { id: 6, title: "样本及抽样分布", icon: Library },
    { id: 7, title: "参数估计", icon: Radio },
    { id: 8, title: "假设检验", icon: Cpu },
  ];

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-neb-bg overflow-hidden">
      {/* Sidebar: Chapters 1-8 (Desktop Only) */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 88 : 320 }}
        className="hidden lg:flex bg-white border-r-[3px] border-neb-text flex-col p-4 relative shrink-0 overflow-hidden shadow-[4px_0px_0px_#1E1B4B] transition-colors"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute z-20 p-2 bg-neb-bg border-2 border-neb-text rounded-xl hover:bg-neb-accent transition-colors shadow-[2px_2px_0px_#1E1B4B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
            isCollapsed ? "left-1/2 -translate-x-1/2 top-4" : "right-4 top-6"
          )}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-8 px-2 overflow-hidden whitespace-nowrap transition-all mt-2">
            <GraduationCap className="w-6 h-6 text-neb-primary shrink-0" />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-fredoka font-black text-lg uppercase tracking-tight text-neb-text"
            >
              Course Map
            </motion.h2>
          </div>
        )}

        {/* Space adjustment when collapsed to prevent overlap with button */}
        {isCollapsed && <div className="mt-16" />}


        <div className="space-y-3 flex-1 overflow-y-auto px-1 custom-scrollbar">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.id}`}
              title={isCollapsed ? chapter.title : ""}
              className={cn(
                "group flex items-center p-3 rounded-2xl border-[3px] border-transparent transition-all active:scale-95",
                isCollapsed
                  ? "justify-center"
                  : "gap-4 hover:border-neb-text hover:bg-neb-accent/10"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 border-[2px] border-neb-text flex items-center justify-center font-fredoka font-black group-hover:bg-neb-primary group-hover:text-neb-text transition-colors shrink-0">
                {chapter.id}
              </div>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-outfit font-bold text-sm text-neb-text tracking-wide group-hover:translate-x-1 transition-transform overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {chapter.title}
                </motion.span>
              )}
            </Link>
          ))}
        </div>

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-6 mt-4 border-t border-gray-100 italic text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center"
          >
            Academic Ecosystem v2.0
          </motion.div>
        )}
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col px-12 lg:px-24">
        {/* Minimal Background Effect */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neb-primary/30 rounded-full blur-[100px]" />
        </div>

        <div className="flex-1 flex flex-col justify-start pt-16 lg:pt-24 min-h-[600px]">
          {/* Attention-Guided Layout: Title & Actions Cluster */}
          <motion.div
            animate={{ x: isCollapsed ? -20 : 0 }}
            className="relative flex flex-col lg:flex-row items-start lg:items-center gap-16 xl:gap-40"
          >
            {/* 1. Core Narrative Block (Highest Priority) */}
            <div className="max-w-3xl space-y-8 z-10">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border-[3px] border-neb-text rounded-2xl shadow-[6px_6px_0px_#1E1B4B] font-fredoka font-black text-xs uppercase tracking-widest"
              >
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22C55E]" />
                BUCEA Intelligence Lab
              </motion.div>

              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black font-fredoka text-neb-text leading-[0.85] tracking-tighter">
                Learn <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neb-primary to-neb-secondary pb-4 pr-4">Statistics,</span> <br />
                Anywhere!
              </h1>

              <p className="text-xl md:text-2xl font-outfit text-neb-text/70 leading-relaxed font-bold max-w-2xl">
                告别枯燥公式。通过 <span className="text-neb-text border-b-4 border-neb-accent">50+ 可视化实验</span> 捕捉概率之魂，为未来工程师提供直观的物理直觉。
              </p>
            </div>

            {/* 2. Action Control Center */}
            <div className="flex flex-col gap-12 shrink-0 relative lg:self-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: 4, x: 4 }}
              >
                <Link
                  href="/chapters/1"
                  className="group relative bg-neb-primary border-[3px] border-neb-text px-10 py-5 rounded-2xl font-fredoka font-black text-xl shadow-[8px_8px_0px_#1E1B4B] hover:shadow-none transition-all flex items-center justify-center gap-3 w-72 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                  立即开始学习
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: 4, x: 4 }}
              >
                <Link
                  href="/games"
                  className="group bg-white/80 backdrop-blur-md border-[3px] border-neb-text px-10 py-5 rounded-2xl font-fredoka font-black text-xl shadow-[8px_8px_0px_#1E1B4B] hover:shadow-none transition-all flex items-center justify-center gap-3 text-neb-text w-72"
                >
                  进入实验中心
                  <Activity className="w-7 h-7 text-neb-secondary group-hover:scale-110 transition-transform" />
                </Link>
              </motion.div>

              {/* Strategic Visual Anchor - Subtle hint of more content below */}
              <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-neb-text/5 rounded-full" />
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
