"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { formulasData, FormulaCardData, FormulaTableData } from '@/data/formulas';
import FormulaCard from '@/components/Formulas/FormulaCard';
import FormulaTable from '@/components/Formulas/FormulaTable';
import { Printer, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FormulasPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // 简单的搜索逻辑
    const filteredData = formulasData.map(category => {
        const filteredFormulas = category.formulas.filter(f => {
            const matchesTitle = f.title.toLowerCase().includes(searchQuery.toLowerCase());

            // Safe property check for items in FormulaCardData
            let matchesItems = false;
            if ('items' in f && Array.isArray(f.items)) {
                matchesItems = f.items.some(item =>
                    item.label.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            return matchesTitle || matchesItems;
        });

        return {
            ...category,
            formulas: filteredFormulas
        };
    }).filter(category => category.formulas.length > 0);

    return (
        <div className="flex min-h-screen bg-neb-bg">
            {/* 侧边栏 */}
            <Sidebar />

            {/* 主内容区 */}
            <main className="flex-1 transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 py-12 pb-32">

                    {/* 顶部导航与搜索 */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm font-bold text-neb-text/60 hover:text-neb-primary mb-4 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                返回主页
                            </Link>
                            <h1 className="text-5xl font-black text-neb-text flex items-center gap-4">
                                公式速查表
                                <span className="text-xs bg-neb-accent border-2 border-neb-text px-3 py-1 rounded-full uppercase tracking-tighter">
                                    Cheat Sheet
                                </span>
                            </h1>
                            <p className="mt-4 text-neb-text/70 max-w-2xl font-medium">
                                针对北京建筑大学《概率论与数理统计》教学大纲整理。涵盖从随机事件到假设检验的所有核心公式。
                            </p>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-neb-text/40 group-focus-within:text-neb-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="搜索公式或分布..."
                                className="w-full md:w-80 pl-12 pr-4 py-4 bg-white border-[3px] border-neb-text rounded-xl shadow-hard focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0px_#1E1B4B] transition-all font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 公式列表 */}
                    <div className="space-y-16">
                        {filteredData.map((category) => (
                            <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-24">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-3xl font-black text-neb-text bg-white border-[3px] border-neb-text w-12 h-12 flex items-center justify-center rounded-lg shadow-[4px_4px_0px_#1E1B4B]">
                                        {category.id}
                                    </span>
                                    <h2 className="text-3xl font-black text-white bg-neb-text px-6 py-2 rounded-lg rotate-1">
                                        {category.title}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {category.formulas.map((item, idx) => (
                                        <div key={idx} className={'headers' in item ? "md:col-span-2" : ""}>
                                            {'headers' in item ? (
                                                <FormulaTable data={item as FormulaTableData} />
                                            ) : (
                                                <FormulaCard data={item as FormulaCardData} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}

                        {filteredData.length === 0 && (
                            <div className="text-center py-24 bg-white border-[3px] border-dashed border-neb-text/20 rounded-3xl">
                                <p className="text-2xl font-black text-neb-text/30 italic">找不到匹配的公式...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 打印按钮 */}
                <button
                    onClick={() => window.print()}
                    className="fixed bottom-10 right-10 bg-green-500 text-white p-5 rounded-2xl border-[3px] border-neb-text shadow-[6px_6px_0px_#1E1B4B] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none z-50 group print:hidden transition-all"
                >
                    <Printer className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-neb-text text-white px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        打印为 PDF
                    </span>
                </button>
            </main>
        </div>
    );
}
