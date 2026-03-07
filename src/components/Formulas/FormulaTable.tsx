"use client";

import React from 'react';
import MathRenderer from '../MathRenderer';
import { FormulaTableData } from '@/data/formulas';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function FormulaTable({ data }: { data: FormulaTableData }) {
    const isDiscrete = data.type === 'discrete';
    const isContinuous = data.type === 'continuous';

    return (
        <div className="bg-white border-[3px] border-neb-text rounded-xl p-6 shadow-hard overflow-hidden">
            <h3 className="text-xl font-black text-neb-text mb-6 flex items-center gap-2">
                <span className={cn(
                    "w-3 h-3 rounded-full border-2 border-neb-text",
                    isDiscrete ? "bg-purple-400" : isContinuous ? "bg-green-400" : "bg-amber-400"
                )} />
                {data.title}
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-neb-text">
                    <thead>
                        <tr className={cn(
                            "border-b-2 border-neb-text",
                            isDiscrete ? "bg-purple-100" : isContinuous ? "bg-green-100" : "bg-slate-100"
                        )}>
                            {data.headers.map((header, idx) => (
                                <th key={idx} className="p-3 text-sm font-black text-neb-text border-r-2 border-neb-text last:border-r-0">
                                    <MathRenderer content={header} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b-2 border-neb-text last:border-b-0 hover:bg-slate-50 transition-colors">
                                {Object.values(row).map((cell, cellIdx) => (
                                    <td key={cellIdx} className="p-3 text-sm text-center border-r-2 border-neb-text last:border-r-0">
                                        <MathRenderer content={cell.includes('$') ? cell : `$${cell}$`} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
