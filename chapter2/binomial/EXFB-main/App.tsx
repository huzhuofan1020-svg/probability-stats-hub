import React, { useState, useMemo } from 'react';
import { calculateBinomialDistribution } from './utils/math';
import { DistributionChart } from './components/DistributionChart';
import { DerivationPanel } from './components/DerivationPanel';
import { RealLifeExample } from './components/RealLifeExample';
import { Controls } from './components/Controls';
import { BarChart2 } from 'lucide-react';

const App: React.FC = () => {
  const [n, setN] = useState<number>(20);
  const [p, setP] = useState<number>(0.25);

  const { data, stats } = useMemo(() => calculateBinomialDistribution(n, p), [n, p]);

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden text-slate-900 font-sans">
      {/* Header */}
      <header className="flex-none h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shrink-0">
            <BarChart2 size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">二项分布探索器</h1>
            <p className="hidden sm:block text-xs text-slate-500 font-medium">B(n, p) 图形化演示与数学机理</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-0">
        
        {/* Left: Chart Area - Adaptive Width */}
        <section className="flex-none h-[400px] lg:h-auto lg:flex-1 p-4 lg:p-6 flex flex-col min-h-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 p-2 sm:p-4 lg:p-6 relative flex flex-col">
             <DistributionChart data={data} />
          </div>
        </section>

        {/* Right Area: Sidebar Container */}
        {/* 
            Mobile (<1024px): Stacked vertically below chart, w-full.
            Laptop (1024px-1280px): Right sidebar, w-[400px], content stacked vertically.
            Desktop (>=1280px): Expanded sidebar, w-[720px]+, content split into two columns (Middle & Right).
        */}
        <aside className="
          flex-none w-full 
          lg:w-[400px] lg:h-full lg:overflow-y-auto
          xl:w-[720px] xl:overflow-hidden xl:flex xl:flex-row
          2xl:w-[800px]
          bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200
        ">
          
          {/* Middle Column: Controls + Example */}
          <div className="
            flex flex-col gap-4 lg:gap-6
            p-4 lg:p-6 pb-2 lg:pb-3 xl:pb-6
            xl:w-1/2 xl:h-full xl:overflow-y-auto xl:border-r border-slate-200
          ">
            <Controls n={n} setN={setN} p={p} setP={setP} />
            <RealLifeExample n={n} p={p} stats={stats} data={data} />
          </div>

          {/* Right Column: Mathematical Mechanism */}
          <div className="
            flex flex-col gap-4 lg:gap-6
            p-4 lg:p-6 pt-2 lg:pt-3 xl:pt-6
            xl:w-1/2 xl:h-full xl:overflow-y-auto
            pb-10 lg:pb-6
          ">
            <DerivationPanel n={n} p={p} stats={stats} />
            
            <div className="text-center mt-auto py-2 text-xs text-slate-400">
              交互式数学 • React + Recharts
            </div>
          </div>

        </aside>

      </main>
    </div>
  );
};

export default App;