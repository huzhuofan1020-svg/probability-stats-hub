"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    Target,
    TrendingUp,
    PieChart,
    Activity,
    Layers,
    MousePointer2,
    Heart,
    FileText
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const chapters = [
    { id: 1, title: "随机事件与概率", icon: BookOpen, color: "bg-pink-200" },
    { id: 2, title: "随机变量及其分布", icon: Target, color: "bg-blue-200" },
    { id: 3, title: "多维随机变量及其分布", icon: Layers, color: "bg-purple-200" },
    { id: 4, title: "随机变量的数字特征", icon: TrendingUp, color: "bg-green-200" },
    { id: 5, title: "大数定律与中心极限定理", icon: Activity, color: "bg-yellow-200" },
    { id: 6, title: "样本及抽样分布", icon: PieChart, color: "bg-orange-200" },
    { id: 7, title: "参数估计", icon: MousePointer2, color: "bg-indigo-200" },
    { id: 8, title: "假设检验", icon: Activity, color: "bg-red-200" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-80 border-r-[3px] border-neb-text bg-white h-[calc(100vh-80px)] overflow-y-auto sticky top-20 hidden lg:block p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="font-fredoka font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-neb-primary border-2 border-neb-text inline-block"></span>
                        课程目录
                    </h3>
                    <div className="space-y-2">
                        {chapters.map((chapter) => (
                            <Link
                                key={chapter.id}
                                href={`/chapters/${chapter.id}`}
                                className={cn(
                                    "group flex items-center gap-3 p-3 border-[3px] border-neb-text rounded-xl transition-all duration-200",
                                    pathname === `/chapters/${chapter.id}`
                                        ? "bg-neb-primary shadow-none translate-x-[2px] translate-y-[2px]"
                                        : "bg-white shadow-[4px_4px_0px_#1E1B4B] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1E1B4B]"
                                )}
                            >
                                <div className={cn("w-10 h-10 border-2 border-neb-text rounded-lg flex items-center justify-center shadow-[3px_3px_0px_#1E1B4B]", chapter.color)}>
                                    <chapter.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-fredoka font-bold text-xs text-neb-text opacity-60 uppercase">CH.{chapter.id.toString().padStart(2, '0')}</p>
                                    <p className="font-fredoka font-bold text-sm truncate">{chapter.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="pt-6 border-t-[3px] border-dotted border-neb-text">
                    <Link
                        href="/formulas"
                        className="flex items-center gap-3 p-3 bg-neb-accent border-[3px] border-neb-text rounded-xl shadow-[4px_4px_0px_#1E1B4B] hover:shadow-[6px_6px_0px_#1E1B4B] hover:-translate-y-0.5 transition-all"
                    >
                        <div className="w-10 h-10 bg-white border-2 border-neb-text rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-neb-text" />
                        </div>
                        <p className="font-fredoka font-black text-sm">公式手册</p>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
