import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { DistributionData } from '../types';

interface Props {
  data: DistributionData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 sm:p-3 border border-slate-200 shadow-lg rounded-lg text-xs sm:text-sm z-50">
        <p className="font-bold text-slate-700 mb-1">成功次数 k = {label}</p>
        <p className="text-blue-600">
          概率 P(X=k): <span className="font-mono">{payload[0].value.toFixed(4)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const DistributionChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-wrap justify-between items-center mb-2 sm:mb-4 px-1 sm:px-2 gap-2">
        <h3 className="text-slate-700 font-bold text-base sm:text-lg">概率分布直方图</h3>
        <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-xs font-medium">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-500">递增</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-rose-500"></span>
            <span className="text-slate-500">峰值</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400"></span>
            <span className="text-slate-500">递减</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 50 }}
            barCategoryGap="2%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="k" 
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fontSize: 10, fill: '#64748b' }}
              label={{ value: '成功次数 k', position: 'bottom', offset: 0, fontSize: 11, fill: '#94a3b8' }}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar 
              dataKey="prob" 
              radius={[4, 4, 0, 0]} 
              animationDuration={300} 
              animationEasing="ease-out"
              isAnimationActive={true}
              maxBarSize={60}
            >
              {data.map((entry, index) => {
                let color = '#60a5fa'; // Default Blue
                if (entry.type === 'peak') color = '#f43f5e'; // Rose-500
                if (entry.type === 'growth') color = '#10b981'; // Emerald-500
                return <Cell key={`cell-${entry.k}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};