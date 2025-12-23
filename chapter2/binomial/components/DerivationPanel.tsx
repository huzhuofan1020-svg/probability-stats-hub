import React from 'react';
import { BinomialStats } from '../types';

interface Props {
  n: number;
  p: number;
  stats: BinomialStats;
}

export const DerivationPanel: React.FC<Props> = ({ n, p, stats }) => {
  const targetValStr = stats.targetVal.toFixed(2);
  const modeStr = Array.isArray(stats.mode) 
    ? `${stats.mode[0]} 和 ${stats.mode[1]}` 
    : stats.mode.toString();

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-4">
      <div className="border-b border-amber-200 pb-3">
        <h3 className="text-amber-900 font-bold flex items-center gap-2 text-sm sm:text-base">
          <span>🧠</span> 数学机理分析
        </h3>
        <p className="text-amber-700/80 text-xs mt-1">为什么峰值（最可能的情况）会出现在这里？</p>
      </div>

      {/* Step 1: Formula */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">第一步：相邻项比值判别</p>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          要判断概率 P(X=k) 是增还是减，我们观察相邻两项概率的比值。如果比值大于 1，则概率递增。
        </p>
        
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-amber-300/50 flex items-center justify-center my-2 shadow-sm overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-3 font-serif italic text-base sm:text-lg text-slate-800 whitespace-nowrap">
            <div className="flex flex-col items-center">
              <span className="border-b border-slate-800 px-1">P(X=k)</span>
              <span className="px-1">P(X=k-1)</span>
            </div>
            <span>=</span>
            <span>1</span>
            <span>+</span>
            <div className="flex flex-col items-center">
              <span className="border-b border-slate-800 px-1 font-bold text-rose-600 not-italic">
                (n+1)p - k
              </span>
              <span className="px-1">k(1-p)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-amber-700">
          决定性因素在于分子 <span className="font-mono bg-white px-1 rounded border border-amber-200 text-rose-600 font-bold">(n+1)p - k</span> 的正负。若为正，图表上升；若为负，图表下降。
        </p>
      </div>

      {/* Step 2: Calculation */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">第二步：实时计算</p>
        
        <div className="pl-4 border-l-2 border-amber-400 space-y-3">
          <div className="text-xs sm:text-sm text-amber-900">
            1. 计算分界点 <span className="font-serif italic">(n+1)p</span>:
            <div className="mt-1 font-mono bg-white inline-block px-2 py-1 rounded border border-amber-200 text-amber-600 font-bold shadow-sm">
              ({n} + 1) × {p} = <span className="text-lg sm:text-xl">{targetValStr}</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-amber-900">
            2. <strong className="text-emerald-600">爬坡阶段 (k &lt; {targetValStr}):</strong>
            <br />
            <span className="text-xs text-amber-700/80">
              当 k 从 0 到 {Number.isInteger(stats.targetVal) ? (stats.targetVal - 2) : (stats.mode as number)} 时，分子为正，概率逐项增加。
            </span>
          </div>

          <div className="text-xs sm:text-sm text-amber-900">
            3. <strong className="text-blue-600">下坡阶段 (k &gt; {targetValStr}):</strong>
             <br />
            <span className="text-xs text-amber-700/80">
              当 k 从 {Number.isInteger(stats.targetVal) ? (stats.targetVal + 1) : ((stats.mode as number) + 1)} 开始，分子变负，概率逐项递减。
            </span>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-auto bg-white rounded-lg p-3 sm:p-4 border border-yellow-400 shadow-[0_2px_8px_-2px_rgba(255,190,0,0.3)]">
        <p className="text-xs sm:text-sm text-slate-700">
          <strong>✨ 结论：</strong><br/>
          峰值（众数）一定是分界点左侧紧邻的整数。<br/>
          <span className="block mt-2 text-center text-base sm:text-lg">
             Mode = ⌊<span className="text-amber-600 font-bold">{targetValStr}</span>⌋ = <span className="text-rose-600 font-bold text-xl sm:text-2xl">{modeStr}</span>
          </span>
        </p>
      </div>
    </div>
  );
};