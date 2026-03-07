"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b-[3px] border-neb-text px-6 py-4 flex items-center justify-between shadow-[4px_4px_0px_#1E1B4B]">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/img/bucea-logo.png"
                        alt="BUCEA Logo"
                        className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                    />

                </Link>

                <div className="hidden lg:flex items-center gap-6 font-fredoka font-bold">
                    <Link href="/" className="hover:text-neb-primary transition-colors">首页</Link>
                    <Link href="/games" className="hover:text-neb-accent transition-colors">实验门户</Link>
                    <Link href="/formulas" className="hover:text-neb-secondary transition-colors">核心公式</Link>
                    <Link href="/about" className="hover:text-neb-accent transition-colors">关于我们</Link>
                    <Link href="/terms" className="hover:text-neb-primary transition-colors hover:rotate-1">用户条例</Link>
                    <Link href="/contact" className="hover:text-neb-secondary transition-colors hover:-rotate-1">联系我们</Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative group hidden sm:block">
                    <input
                        type="text"
                        placeholder="搜索知识点..."
                        className="bg-[#F3F4F6] border-[3px] border-neb-text rounded-lg px-4 py-1.5 pl-10 focus:outline-none focus:ring-2 ring-neb-primary font-outfit text-sm transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neb-text" />
                </div>

                <button className="lg:hidden p-2 border-[3px] border-neb-text rounded-lg bg-neb-accent shadow-[3px_3px_0px_#1E1B4B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
