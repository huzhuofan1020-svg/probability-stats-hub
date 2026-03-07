"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import MathRenderer from '../MathRenderer';
import { FormulaCardData } from '@/data/formulas';

export default function FormulaCard({ data }: { data: FormulaCardData }) {
    const Icon = (LucideIcons[data.icon as keyof typeof LucideIcons] as React.ElementType) || LucideIcons.FunctionSquare;

    return (
        <div className="bg-white border-[3px] border-neb-text rounded-xl p-6 shadow-hard hover-lift h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-slate-100">
                <div
                    className="p-2 rounded-lg border-2 border-neb-text"
                    style={{ backgroundColor: data.color || '#3B82F6' }}
                >
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-neb-text">{data.title}</h3>
            </div>

            <div className="space-y-6 flex-grow">
                {data.items.map((item, idx) => (
                    <div key={idx} className="group">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-hover:text-neb-primary transition-colors">
                            {item.label}
                        </span>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 group-hover:border-neb-text transition-all">
                            <MathRenderer content={`$${item.content}$`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
