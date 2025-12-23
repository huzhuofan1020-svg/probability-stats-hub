import React from 'react';

interface Props {
  n: number;
  setN: (val: number) => void;
  p: number;
  setP: (val: number) => void;
}

export const Controls: React.FC<Props> = ({ n, setN, p, setP }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-bold text-slate-700">🎛️ 参数设置</h3>
        <span className="text-xs text-slate-400 font-medium">拖动滑块调整</span>
      </div>

      {/* N Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <label htmlFor="n-slider" className="text-sm font-semibold text-slate-500">
            试验次数 (n)
          </label>
          <span className="font-mono text-xl font-bold text-blue-600 bg-blue-50 px-2 rounded-md">
            {n}
          </span>
        </div>
        <input
          id="n-slider"
          type="range"
          min="1"
          max="100"
          step="1"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>1</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      {/* P Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <label htmlFor="p-slider" className="text-sm font-semibold text-slate-500">
            成功概率 (p)
          </label>
          <span className="font-mono text-xl font-bold text-blue-600 bg-blue-50 px-2 rounded-md">
            {p.toFixed(2)}
          </span>
        </div>
        <input
          id="p-slider"
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
        />
        <div className="flex justify-between text-xs text-slate-400 px-1">
          <span>0.01</span>
          <span>0.50</span>
          <span>0.99</span>
        </div>
      </div>
    </div>
  );
};