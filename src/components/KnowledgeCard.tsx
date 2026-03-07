"use client";

import { motion } from "framer-motion";
import { BookMarked, Braces, Lightbulb, Heart } from "lucide-react";
import MathRenderer from "./MathRenderer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface KnowledgeCardProps {
    type: 'definition' | 'theorem' | 'example' | 'ideology';
    title: string;
    children: React.ReactNode;
}

const icons = {
    definition: BookMarked,
    theorem: Braces,
    example: Lightbulb,
    ideology: Heart,
};

const headerStyles = {
    definition: "bg-blue-500 text-white",
    theorem: "bg-purple-500 text-white",
    example: "bg-green-500 text-white",
    ideology: "bg-red-500 text-white",
};

const labelMap = {
    definition: "定义",
    theorem: "定理",
    example: "例题",
    ideology: "思政",
};

export default function KnowledgeCard({ type, title, children }: KnowledgeCardProps) {
    const Icon = icons[type];

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="border-[3px] border-neb-text rounded-2xl overflow-hidden shadow-[4px_4px_0px_#1E1B4B] mb-8 bg-white hover:shadow-[8px_8px_0px_#1E1B4B] transition-shadow"
        >
            <div className={cn("px-6 py-3 border-b-[3px] border-neb-text flex items-center gap-3 font-fredoka font-black", headerStyles[type])}>
                <Icon className="w-5 h-5 text-current" />
                <span className="tracking-tight">{labelMap[type]} — {title}</span>
            </div>
            <div className="p-6 font-outfit text-neb-text leading-relaxed">
                {typeof children === 'string' ? <MathRenderer content={children} /> : children}
            </div>
        </motion.div>
    );
}
