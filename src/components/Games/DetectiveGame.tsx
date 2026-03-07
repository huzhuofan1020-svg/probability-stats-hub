"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import {
    Activity,
    Zap,
    Settings,
    Database,
    LineChart,
    BarChart3,
    Cpu,
    ArrowRight,
    Crosshair,
    Info,
    RefreshCw,
    Waves
} from 'lucide-react';

// --- 信号模拟核心算法 ---
// 生成带噪声和随机性的复合信号
const generateSignalPoint = (t: number, config: { freq: number, amp: number, noise: number }) => {
    // 基波 (Fundamental) + 随机高斯噪声 (AWGN)
    const base = config.amp * Math.sin(2 * Math.PI * config.freq * t);
    const noise = (Math.random() + Math.random() + Math.random() + Math.random() - 2) * config.noise; // 简单中心极限定理模拟高斯
    return base + noise;
};

// 正态分布 PDF 用于参考拟合
const normalPDF = (x: number, mu: number, sigma: number) => {
    const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
};

export default function SignalLinkAnalysisLab() {
    const { addPoints } = useGame();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // 状态配置
    const [config, setConfig] = useState({ freq: 5, amp: 5, noise: 1.5 });
    const [truth, setTruth] = useState({ mu: 0, sigma: 1.5 }); // 教师隐藏值
    const [estSigma, setEstSigma] = useState(2);
    const [samples, setSamples] = useState<number[]>([]);
    const [t, setT] = useState(0);
    const [gameState, setGameState] = useState<'BRIEFING' | 'EXPERIMENT' | 'EVALUATION'>('BRIEFING');

    // 统计反馈组件状态
    const [lastSampleX, setLastSampleX] = useState<number | null>(null);
    const [lastSampleY, setLastSampleY] = useState<number | null>(null);
    const [showScanLine, setShowScanLine] = useState(false);

    // 最大似然估计 (MLE) 影子算法：计算样本的标准差
    const sampleStdDev = useMemo(() => {
        if (samples.length < 2) return 0;
        const n = samples.length;
        const mean = samples.reduce((a, b) => a + b, 0) / n;
        const variance = samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
        return Math.sqrt(variance);
    }, [samples]);

    // 计算当前估计值与样本分布的匹配度 (Score)
    // 逻辑：基于 KL 散度简化版，鼓励 estSigma 接近真实样本 sigma
    const matchScore = useMemo(() => {
        if (samples.length < 10) return 0;
        const diff = Math.abs(estSigma - sampleStdDev);
        return Math.max(0, Math.min(100, 100 - (diff / sampleStdDev) * 150));
    }, [estSigma, sampleStdDev, samples.length]);

    // 示波器渲染循环
    useEffect(() => {
        if (gameState !== 'EXPERIMENT') return;

        let animationFrame: number;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const render = () => {
            setT(prev => prev + 0.01);

            // 清屏并绘制示波器网格
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, 800, 200);
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 1;
            for (let i = 0; i < 800; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 200); ctx.stroke(); }
            for (let i = 0; i < 200; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(800, i); ctx.stroke(); }

            // 绘制波形线
            ctx.strokeStyle = '#4ADE80';
            ctx.lineWidth = 2;
            const centerY = ctx.canvas.height / 2;
            ctx.beginPath();
            for (let x = 0; x < 800; x++) {
                const time = t + x * 0.005;
                const y = centerY - generateSignalPoint(time, config) * 10;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            animationFrame = requestAnimationFrame(render);
        };

        animationFrame = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationFrame);
    }, [gameState, t, config]);

    // 初始化实验
    const initExperiment = () => {
        // 解锁全量程随机：0.5 ~ 8.0 V (标准差)
        const secretNoise = 0.5 + Math.random() * 7.5;
        setTruth({ mu: 0, sigma: secretNoise });
        // 增加信号特征随机性
        setConfig({
            freq: 2 + Math.random() * 10,
            amp: 2 + Math.random() * 5,
            noise: secretNoise
        });
        setSamples([]);
        setEstSigma(2);
        setGameState('EXPERIMENT');
    };

    // 采样逻辑：模拟工业级的“触发采集”
    const captureSamples = (count: number) => {
        const newSamples: number[] = [];
        let lastVal = 0;
        // 在 0~800 像素宽度内随机选一个“采样切片”位置
        const screenX = 100 + Math.random() * 600;

        for (let i = 0; i < count; i++) {
            // 采样对应屏幕位置的信号
            const timeOffset = (screenX / 800) * 0.05;
            const val = generateSignalPoint(t + timeOffset, config);
            newSamples.push(val);
            lastVal = val;
        }
        setSamples(prev => [...prev.slice(-2000), ...newSamples]);

        // 触发复合采样动画：竖向触发 -> 横向投影
        setLastSampleX(screenX);
        setLastSampleY(100 - lastVal * 10);
        setShowScanLine(true);
        setTimeout(() => setShowScanLine(false), 600);
    };

    // 计算统计分布 (直方图) - 垂直分桶
    const distData = useMemo(() => {
        const bins = new Array(41).fill(0);
        samples.forEach(s => {
            const idx = Math.floor((s + 10) / 0.5);
            if (idx >= 0 && idx < 41) bins[idx]++;
        });
        return bins;
    }, [samples]);

    const calculateScore = () => {
        const error = Math.abs(estSigma - truth.sigma);
        return Math.max(0, Math.round(100 - error * 30));
    };

    return (
        <div className="relative w-full h-full bg-[#1A1C1E] rounded-[32px] overflow-hidden flex flex-col font-outfit border-4 border-[#2D3135] shadow-2xl">
            {/* MATLAB Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4ADE80_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Briefing */}
            <AnimatePresence>
                {gameState === 'BRIEFING' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#1A1C1E] flex items-center justify-center p-12">
                        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 text-white">
                            <div className="space-y-6">
                                <div className="p-4 bg-[#4ADE80]/10 w-fit rounded-2xl border border-[#4ADE80]/30 text-[#4ADE80]">
                                    <Waves className="w-12 h-12" />
                                </div>
                                <h1 className="text-5xl font-black font-fredoka leading-none italic uppercase">三域联动<br /><span className="text-[#4ADE80]">信号实验室</span></h1>
                                <p className="text-lg font-bold text-gray-400">
                                    【工程逻辑】在电力电子实验室中，波形的“毛刺”即是随机性。本模块将帮助你建立 **【时域波形】$\rightarrow$ 【幅度采样】$\rightarrow$ 【统计分布】** 的完整工程认知。
                                </p>
                            </div>
                            <div className="bg-[#25292E] p-8 rounded-[40px] border border-white/5 space-y-6">
                                <h3 className="text-xl font-black text-[#4ADE80] flex items-center gap-2">
                                    <Activity className="w-5 h-5" /> 概率建模路径
                                </h3>
                                <div className="space-y-4 text-sm font-bold text-gray-300">
                                    <p className="flex gap-3"><span className="text-[#4ADE80]">1. 时域观察：</span> 观察波形的高频抖动，这代表了随机噪声。</p>
                                    <p className="flex gap-3"><span className="text-[#4ADE80]">2. 幅度采样：</span> 捕获离散的电压幅值样本。</p>
                                    <p className="flex gap-3"><span className="text-[#4ADE80]">3. 统计逆向：</span> 调节 $\sigma$ 参数，用最大似然估计的思想拟合噪声强度。</p>
                                </div>
                                <button onClick={initExperiment} className="w-full bg-[#4ADE80] text-black py-5 rounded-2xl font-black text-2xl shadow-[0_8px_0_#166534] hover:scale-105 transition-all">开启实测采集</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header: Instrumentation Style */}
            <header className="px-8 py-5 bg-[#25292E] border-b-2 border-[#2D3135] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#4ADE80] uppercase tracking-widest leading-none mb-1">Channel A</span>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
                            <span className="font-fredoka font-black text-xl text-white">ACOUSTIC_ANALOG_IN</span>
                        </div>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-12">
                        <span className="text-[10px] font-black text-gray-500 uppercase leading-none mb-1">Signal Meta</span>
                        <span className="font-mono font-bold text-sm text-gray-400">50.00 Hz / Normal_AWGN</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-black/40 px-6 py-2 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-[#4ADE80] uppercase">Samples:</span>
                    <span className="font-mono font-bold text-xl text-white">{samples.length}</span>
                </div>
            </header>

            {/* Main Desktop */}
            <main className="flex-1 flex overflow-hidden min-h-0 bg-[#1A1C1E]">
                {/* Visual Clusters: Side-Projection Layout */}
                <div className="flex-1 flex p-4 md:p-6 gap-2 min-w-0">

                    {/* Domain 2: Statistical Domain (Left Projection) */}
                    <div className="w-[160px] md:w-[220px] shrink-0 bg-black/40 border-2 border-[#333] rounded-[24px] relative overflow-hidden flex flex-col">
                        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[9px] font-black text-blue-400 bg-black/60 px-2 py-1 rounded">
                            <BarChart3 className="w-3 h-3" /> 统计域 (PROB)
                        </div>
                        <svg className="flex-1 w-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                            {/* 3-Sigma/1-Sigma Indicators - 帮助用户通过“卡尺”判断噪声 */}
                            <motion.rect
                                x="0" y={100 - estSigma * 3 * 10} width="200" height={estSigma * 6 * 10}
                                fill="#4ADE80" fillOpacity="0.05" stroke="#4ADE80" strokeWidth="1" strokeDasharray="4 4"
                                animate={{ y: 100 - estSigma * 3 * 10, height: estSigma * 6 * 10 }}
                            />
                            <motion.rect
                                x="0" y={100 - estSigma * 10} width="200" height={estSigma * 20}
                                fill="#4ADE80" fillOpacity="0.1"
                                animate={{ y: 100 - estSigma * 10, height: estSigma * 20 }}
                            />

                            {/* Sigma Labels */}
                            <motion.text
                                x="10" y={100 - estSigma * 3 * 10 - 5} fill="#4ADE80" fontSize="8" fontWeight="bold" opacity="0.5"
                                animate={{ y: 100 - estSigma * 3 * 10 - 5 }}
                            >+3σ上限</motion.text>
                            <motion.text
                                x="10" y={100 + estSigma * 3 * 10 + 12} fill="#4ADE80" fontSize="8" fontWeight="bold" opacity="0.5"
                                animate={{ y: 100 + estSigma * 3 * 10 + 12 }}
                            >-3σ下限</motion.text>

                            {/* Histogram - Horizontal Growth to the Right */}
                            {distData.map((count, i) => {
                                const y = (i / 40) * 200;
                                const binHeight = 200 / 41;
                                const binWidth = 0.5;
                                const density = samples.length === 0 ? 0 : (count / samples.length) / binWidth;
                                const width = density * 400; // 这里的增益可以根据需要调整
                                return (
                                    <motion.rect
                                        key={i} x={200 - width} y={200 - y - binHeight} width={width} height={binHeight - 1}
                                        fill="#4ADE80" fillOpacity="0.4" stroke="#4ADE80" strokeWidth="0.5"
                                        initial={{ width: 0 }} animate={{ width }}
                                    />
                                );
                            })}

                            {/* Fitting PDF Curve - Y matches Voltage */}
                            <path
                                d={`M ${Array.from({ length: 160 }, (_, i) => {
                                    const y = (i / 160) * 200;
                                    const worldV = (100 - y) / 10;
                                    const density = normalPDF(worldV, 0, estSigma);
                                    const x = 200 - (density * 400);
                                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                }).join(' ')}`}
                                fill="none" stroke="#4ADE80" strokeWidth="2"
                                className="drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]"
                            />

                            {/* Evaluation Truth Curve */}
                            {gameState === 'EVALUATION' && (
                                <path
                                    d={`M ${Array.from({ length: 160 }, (_, i) => {
                                        const y = (i / 160) * 200;
                                        const worldV = (100 - y) / 10;
                                        const x = 200 - (normalPDF(worldV, 0, truth.sigma) * 400);
                                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                    }).join(' ')}`}
                                    fill="none" stroke="#FF4D4D" strokeWidth="2" strokeDasharray="5 5"
                                />
                            )}
                        </svg>
                    </div>

                    {/* Domain 1: Time Domain (Oscilloscope) - Shared Axis with Left */}
                    <div className="flex-1 bg-black border-2 border-[#333] rounded-[24px] relative overflow-hidden flex flex-col">
                        {/* Cursors Overlay: 工业级卡尺叠加层 (使用百分比对齐几何中心) */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                            {/* 上卡尺 */}
                            <motion.div
                                className="absolute left-0 right-0 border-t border-dashed border-[#4ADE80]/40"
                                style={{ top: '50%' }}
                                animate={{ y: -estSigma * 3 * 10 }}
                                transition={{ type: 'spring', damping: 20 }}
                            >
                                <span className="absolute right-4 bottom-1 text-[8px] font-mono text-[#4ADE80]">UPPER_3σ_LIMIT</span>
                            </motion.div>
                            {/* 下卡尺 */}
                            <motion.div
                                className="absolute left-0 right-0 border-t border-dashed border-[#4ADE80]/40"
                                style={{ top: '50%' }}
                                animate={{ y: estSigma * 3 * 10 }}
                                transition={{ type: 'spring', damping: 20 }}
                            >
                                <span className="absolute right-4 top-1 text-[8px] font-mono text-[#4ADE80]">LOWER_3σ_LIMIT</span>
                            </motion.div>
                        </div>

                        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[9px] font-black text-[#4ADE80] bg-black/60 px-2 py-1 rounded">
                            <Waves className="w-3 h-3" /> 时域波形 (TIME DOMAIN)
                        </div>
                        <canvas ref={canvasRef} width={800} height={200} className="w-full h-full opacity-80" />

                        {/* 实时采样投影复合动画 (使用逻辑中心对齐) */}
                        <AnimatePresence>
                            {showScanLine && lastSampleX !== null && lastSampleY !== null && (
                                <>
                                    {/* 竖向采样脉冲 */}
                                    <motion.div
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: [0, 1, 0], scaleY: 1 }}
                                        className="absolute top-0 bottom-0 w-[2px] bg-white/40 shadow-[0_0_15px_white]"
                                        style={{ left: `${lastSampleX}px` }}
                                    />
                                    {/* 水平投影射线 (注意：动画效果相对于 y 的中心偏移) */}
                                    <motion.div
                                        initial={{ opacity: 0, x: lastSampleX }}
                                        animate={{ opacity: [0, 1, 0], x: -lastSampleX }}
                                        className="absolute h-[2px] bg-[#4ADE80]/60 shadow-[0_0_10px_#4ADE80]"
                                        style={{
                                            top: `${(lastSampleY / 200) * 100}%`,
                                            left: 0,
                                            width: lastSampleX
                                        }}
                                    />
                                    {/* 交点采样亮点 */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 2, 0] }}
                                        className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white]"
                                        style={{
                                            top: `calc(${(lastSampleY / 200) * 100}% - 6px)`,
                                            left: `${lastSampleX - 6}px`
                                        }}
                                    />
                                </>
                            )}
                        </AnimatePresence>

                        {/* 直观基准线 (对齐 50%) */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 border-t border-dashed border-white/20 pointer-events-none" />
                    </div>
                </div>

                {/* Control Desktop (Right) */}
                <aside className="w-[320px] bg-[#25292E] border-l-2 border-[#2D3135] p-6 md:p-8 flex flex-col gap-6 shrink-0 overflow-y-auto">
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase italic tracking-tighter">
                            <Settings className="w-5 h-5 text-[#4ADE80]" /> 采集控制矩阵
                        </h3>
                        {/* 拟合匹配度仪表盘 (Algorithm Feedback) */}
                        <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500">
                                <span>Likelihood Match</span>
                                <span className={matchScore > 80 ? 'text-[#4ADE80]' : 'text-yellow-500'}>{matchScore.toFixed(0)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#4ADE80]"
                                    animate={{ width: `${matchScore}%` }}
                                />
                            </div>
                            <p className="text-[8px] font-bold text-gray-600">MLE算法提示：当前模型与实测噪声特征{matchScore > 90 ? '高度吻合' : '尚有偏差'}。</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Sigma Handle */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-shadow-glow">估计噪声强度 ($\hat{'{'}\sigma{'}'}$)</label>
                                <span className="font-mono font-bold text-3xl text-[#4ADE80]">{estSigma.toFixed(2)}</span>
                            </div>
                            <input
                                type="range" min="0.5" max="8" step="0.1" value={estSigma}
                                onChange={(e) => setEstSigma(parseFloat(e.target.value))}
                                className="w-full h-8 appearance-none bg-black/40 rounded-full border border-white/5 accent-[#4ADE80] cursor-pointer"
                            />
                        </div>

                        {/* Sampling Triggers */}
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => captureSamples(10)} className="bg-white/5 border-2 border-[#333] py-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all font-black text-white text-[10px]">
                                <Zap className="w-4 h-4 text-yellow-400" /> 脉冲采样 (x10)
                            </button>
                            <button onClick={() => captureSamples(200)} className="bg-[#4ADE80]/10 border-2 border-[#4ADE80]/30 py-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-[#4ADE80]/20 transition-all font-black text-[#4ADE80] text-[10px]">
                                <Database className="w-4 h-4" /> 突发扫描 (x200)
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setGameState('EVALUATION')}
                        disabled={samples.length < 50}
                        className="mt-auto w-full py-6 bg-white text-black rounded-3xl font-black text-2xl shadow-[0_8px_0_#CBD5E1] hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-3 uppercase italic"
                    >
                        结束采集并校核 <ArrowRight className="w-6 h-6" />
                    </button>
                </aside>
            </main>

            {/* Results */}
            <AnimatePresence>
                {gameState === 'EVALUATION' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[70] bg-[#1A1C1E]/95 flex items-center justify-center p-12">
                        <motion.div initial={{ y: 20, scale: 0.9 }} animate={{ y: 0, scale: 1 }} className="max-w-2xl w-full bg-[#25292E] border-4 border-[#4ADE80]/30 rounded-[60px] p-12 flex flex-col gap-10">
                            <div className="text-center space-y-4">
                                <h4 className="text-[12px] font-black text-[#4ADE80] uppercase tracking-[0.5em] italic">Calibration Complete</h4>
                                <h1 className="text-5xl font-black font-fredoka text-white italic">参数估计报告</h1>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-black/40 p-10 rounded-[40px] border border-white/5 flex flex-col items-center">
                                    <p className="text-[10px] font-black text-gray-500 uppercase mb-4">估算得分</p>
                                    <p className="text-8xl font-black font-fredoka text-[#4ADE80]">{calculateScore()}</p>
                                </div>
                                <div className="space-y-6 flex flex-col justify-center">
                                    <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-4">
                                        <span className="text-gray-400">真实方差 $\sigma_{'{'}true{'}'}$</span>
                                        <span className="text-red-500 font-mono text-xl">{truth.sigma.toFixed(3)} V</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-bold border-b border-white/5 pb-4">
                                        <span className="text-gray-400">估计值 $\hat{'{'}\sigma{'}'}$</span>
                                        <span className="text-blue-400 font-mono text-xl">{estSigma.toFixed(3)} V</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm font-bold text-gray-400 leading-relaxed italic p-8 bg-black/40 rounded-[32px] border border-white/5">
                                【实验总结】当时域波形叠加了大量高斯白噪声时，通过对其幅度进行采样并拟合 $\sigma$ 参数，我们实际上在进行“最大似然估计”。噪声强度决定了信号分布的“肥瘦”，这在电力系统精确监测中至关重要。
                            </p>

                            <button onClick={initExperiment} className="w-full bg-white text-black py-5 rounded-2xl font-black text-2xl hover:scale-105 transition-all">下一组信号采集</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="px-8 py-3 bg-[#1A1C1E] border-t-2 border-[#2D3135] text-[9px] font-black text-gray-600 uppercase tracking-widest flex justify-between">
                <span>EE_LAB_ENGINE: V3.01_STABLE</span>
                <span>BUCEA_ACADEMIC_PLATFORM</span>
            </footer>
        </div>
    );
}

