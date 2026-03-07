"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import {
    Thermometer,
    Zap,
    Coins,
    Settings,
    ShieldAlert,
    FlaskConical,
    Droplets,
    Wind,
} from 'lucide-react';

interface Test {
    id: string;
    name: string;
    cost: number;
    sensitivity: number;
    specificity: number;
    icon: React.ElementType;
    desc: string;
}

interface TestLog {
    name: string;
    result: boolean;
    icon: React.ElementType;
}

// 变压器 DGA 智能诊断控制台
export default function TransformerDiagnostic() {
    const { addPoints } = useGame();

    // 故障类型：NORMAL, ARCING (电弧), OVERHEATING (过热)
    const [faultType, setFaultType] = useState<'NORMAL' | 'ARCING' | 'OVERHEATING'>('NORMAL');
    const [baseRate, setBaseRate] = useState(0.015);
    const [orderedTests, setOrderedTests] = useState<TestLog[]>([]);
    const [userBelief, setUserBelief] = useState(0.015);
    const [mathBelief, setMathBelief] = useState(0.015);
    const [points, setPoints] = useState(100);
    const [gameState, setGameState] = useState<'BRIEFING' | 'EVALUATING' | 'RESULT'>('BRIEFING');

    const TESTS = [
        { id: 'h2', name: '氢气(H₂)检测', cost: 10, sensitivity: 0.82, specificity: 0.75, icon: Wind, desc: '检测早期析气' },
        { id: 'c2h2', name: '乙炔(C₂H₂)检测', cost: 40, sensitivity: 0.95, specificity: 0.98, icon: Droplets, desc: '判定内部电弧' },
        { id: 'infrared', name: '红外成像', cost: 25, sensitivity: 0.88, specificity: 0.85, icon: Thermometer, desc: '扫描局部过热' },
    ];

    const initCase = useCallback(() => {
        const rate = Number((Math.random() * 0.05 + 0.005).toFixed(3));
        setBaseRate(rate);
        setMathBelief(rate);
        setUserBelief(rate);

        // 随机判定故障类型
        const rand = Math.random();
        if (rand < rate) {
            setFaultType(Math.random() > 0.5 ? 'ARCING' : 'OVERHEATING');
        } else {
            setFaultType('NORMAL');
        }

        setOrderedTests([]);
        setPoints(100);
        setGameState('EVALUATING');
    }, []);

    const runTest = useCallback((test: Test) => {
        if (points < test.cost || gameState !== 'EVALUATING') return;

        // 判定结果
        const hasFault = faultType !== 'NORMAL';
        const result = hasFault ? Math.random() < test.sensitivity : Math.random() > test.specificity;

        setOrderedTests(prev => [...prev, { name: test.name, result, icon: test.icon }]);
        setPoints(prev => prev - test.cost);

        // 贝叶斯数学计算
        const prior = mathBelief;
        let posterior;
        if (result) {
            posterior = (test.sensitivity * prior) /
                (test.sensitivity * prior + (1 - test.specificity) * (1 - prior));
        } else {
            posterior = ((1 - test.sensitivity) * prior) /
                ((1 - test.sensitivity) * prior + test.specificity * (1 - prior));
        }
        setMathBelief(posterior);
    }, [points, gameState, faultType, mathBelief]);

    const submitDiagnosis = () => {
        const error = Math.abs(userBelief - mathBelief);
        const reward = Math.max(0, Math.round(500 * (1 - error) * (points / 100)));
        addPoints(reward);
        setGameState('RESULT');
    };

    return (
        <div className="relative w-full h-full bg-[#050505] rounded-[40px] shadow-[24px_24px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-outfit border-[6px] border-[#1A1A1A]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FF8C00_1px,transparent_1px)] [background-size:30px_30px]" />

            {/* Briefing Overlay */}
            <AnimatePresence>
                {gameState === 'BRIEFING' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[60] bg-[#0A0A0A] flex items-center justify-center p-12 overflow-y-auto"
                    >
                        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-16 text-[#FF8C00] items-center text-center lg:text-left">
                            <div className="space-y-8">
                                <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="p-4 bg-[#FF8C00]/10 w-fit mx-auto lg:mx-0 rounded-3xl border-2 border-[#FF8C00]">
                                    <Zap className="w-12 h-12" />
                                </motion.div>
                                <h1 className="text-6xl font-black font-fredoka uppercase italic leading-none">变压器油气<br /><span className="text-white">智能诊断</span></h1>
                                <p className="text-xl font-bold opacity-70 leading-relaxed">
                                    【工程背景】这台 220kV 变压器是变电站的核心。通过 DGA（溶解气体分析），你需要利用有限的测试预算，推演出该设备发生故障的后验概率。
                                </p>
                            </div>
                            <div className="space-y-6 bg-white/5 p-8 rounded-[40px] border border-[#FF8C00]/20">
                                <h3 className="text-2xl font-black flex items-center gap-3 justify-center lg:justify-start">
                                    <ShieldAlert className="w-6 h-6" /> 贝叶斯工程准则
                                </h3>
                                <div className="space-y-4 font-bold text-white/80">
                                    <p className="flex gap-3 underline decoration-[#FF8C00] underline-offset-4">1. 查明变压器的基准事故率（先验）。</p>
                                    <p className="flex gap-3">2. 综合各项气相色谱测试结果的阳性/阴性反馈。</p>
                                    <p className="flex gap-3">3. 动态调整你的风险信心滑块。</p>
                                </div>
                                <button onClick={initCase} className="w-full bg-[#FF8C00] text-black py-6 rounded-[32px] font-black text-3xl border-[4px] border-white shadow-[8px_8px_0px_#CC7000] hover:scale-105 active:scale-95 transition-all">接受诊断指令</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADER HUB */}
            <header className="flex justify-between items-center px-10 py-6 bg-[#111] border-b-6 border-[#FF8C00]/30 z-10 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#FF8C00] opacity-50 uppercase tracking-widest leading-none mb-1">Grid Area</span>
                        <span className="font-fredoka font-black text-2xl text-white">NORTH_BUILT_ST</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#FF8C00] opacity-50 uppercase tracking-widest leading-none mb-1">Equipment Health</span>
                        <span className="font-fredoka font-black text-2xl text-[#FF8C00]">{(baseRate * 100).toFixed(1)}% <small className="text-xs opacity-50">PRIOR</small></span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="bg-[#1A1A1A] border-[3px] border-[#FF8C00]/30 px-6 py-2 rounded-2xl flex items-center gap-3">
                        <Coins className="w-5 h-5 text-[#FF8C00]" />
                        <span className="font-black font-fredoka text-xl text-white">{points} <small className="text-[10px] opacity-40">BUDGET</small></span>
                    </div>
                    <button onClick={() => setGameState('BRIEFING')} className="p-3 border-[3px] border-white/10 rounded-xl bg-white/5 text-white/40">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main className="flex-1 flex overflow-hidden min-h-0">
                {/* 证据获取 (Left) */}
                <div className="flex-1 flex flex-col p-8 gap-8 border-r-6 border-[#1A1A1A]">
                    <div className="grid grid-cols-3 gap-6">
                        {TESTS.map(test => (
                            <button
                                key={test.id}
                                onClick={() => runTest(test)}
                                disabled={points < test.cost || gameState !== 'EVALUATING'}
                                className="group relative bg-[#111] border-[4px] border-[#333] hover:border-[#FF8C00] rounded-[32px] p-6 text-left transition-all shadow-xl disabled:opacity-20 flex flex-col items-center text-center"
                            >
                                <div className="bg-[#FF8C00]/10 p-4 rounded-ful mb-4 border-2 border-[#FF8C00]/20 group-hover:bg-[#FF8C00] group-hover:text-black transition-colors">
                                    <test.icon className="w-8 h-8 text-[#FF8C00] group-hover:text-black" />
                                </div>
                                <p className="font-black text-white text-lg mb-1 leading-tight">{test.name}</p>
                                <p className="text-[10px] font-bold text-white/30 uppercase mb-3">{test.desc}</p>
                                <div className="mt-auto bg-black border-2 border-white/5 px-4 py-1 rounded-full font-black text-[#FF8C00]">
                                    -{test.cost}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-black/40 border-[4px] border-[#1A1A1A] rounded-[40px] p-8 overflow-hidden flex flex-col">
                        <h4 className="text-xs font-black text-[#FF8C00] opacity-40 uppercase tracking-widest mb-6">气相色谱流水 (Analysis Stream)</h4>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-electric">
                            {orderedTests.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center opacity-10">
                                    <FlaskConical className="w-20 h-20 text-white" />
                                    <p className="font-black text-xl italic uppercase font-fredoka mt-4">No Data Input</p>
                                </div>
                            )}
                            {orderedTests.map((log, i) => (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                    key={i} className={`p-6 border-[3px] border-white/5 rounded-2xl flex items-center justify-between shadow-2xl ${log.result ? 'bg-red-950/20 border-red-500/30' : 'bg-green-950/20 border-green-500/30'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`p-3 rounded-xl ${log.result ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                            <log.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-xl">检测项 #{i + 1}: {log.name}</p>
                                            <p className="text-xs opacity-40 font-bold uppercase tracking-widest">Digital Sequence Verified</p>
                                        </div>
                                    </div>
                                    <div className={`font-black font-fredoka text-3xl ${log.result ? 'text-red-500' : 'text-green-500 italics'}`}>
                                        {log.result ? 'POSITIVE (+)' : 'NEGATIVE (-)'}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 信念引擎 (Right Sidebar) */}
                <aside className="w-[420px] bg-[#0A0A0A] p-10 flex flex-col gap-10 shrink-0">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white font-fredoka italic uppercase">风险评估矩阵</h3>
                        <p className="text-xs font-bold text-white/30 leading-tight">通过调节下方滑块，同步你对变压器发生内部故障的“主观判定概率”。</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-12">
                        <div className="relative h-32 bg-[#111] border-4 border-[#FF8C00]/30 rounded-[40px] flex items-center justify-center overflow-hidden shadow-[inset_0px_0px_40px_rgba(255,140,0,0.1)]">
                            <motion.div
                                animate={{ width: `${userBelief * 100}%` }}
                                className="absolute inset-y-0 left-0 bg-[#FF8C00]/20 border-r-4 border-[#FF8C00]"
                            />
                            <div className="relative z-10 text-7xl font-black font-fredoka text-white select-none">
                                {(userBelief * 100).toFixed(1)}<span className="text-2xl opacity-40 ml-2">%</span>
                            </div>
                        </div>

                        <input
                            type="range" min="0" max="1" step="0.001" value={userBelief}
                            onChange={(e) => setUserBelief(parseFloat(e.target.value))}
                            className="w-full h-12 appearance-none bg-[#1A1A1A] rounded-full border-4 border-[#333] accent-[#FF8C00] cursor-pointer"
                        />

                        <div className="p-6 bg-[#FF8C00]/5 border-2 border-dashed border-[#FF8C00]/30 rounded-[32px] text-center">
                            <p className="text-[10px] font-black text-[#FF8C00] uppercase mb-1">Bayesian Engine Status</p>
                            <p className="text-sm italic font-bold text-white/60 leading-tight">“每一份证据都在强制纠正你的先验认知。”</p>
                        </div>
                    </div>

                    <button
                        disabled={gameState !== 'EVALUATING' || orderedTests.length === 0}
                        onClick={submitDiagnosis}
                        className="w-full bg-[#FF8C00] text-black py-6 rounded-[32px] font-black text-3xl shadow-[8px_8px_0px_white] hover:scale-105 active:scale-95 transition-all disabled:opacity-20 uppercase italic tracking-tighter"
                    >
                        确认诊断指令
                    </button>

                    <p className="text-[10px] text-center font-black text-white/20 uppercase tracking-[0.2em]">Protocol: AS-99-Diagnostic</p>
                </aside>
            </main>

            {/* Cinematic Result Overlay */}
            <AnimatePresence>
                {gameState === 'RESULT' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 z-[70] bg-[#0A0A0A]/95 flex items-center justify-center p-12 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }}
                            className="max-w-4xl w-full bg-[#111] border-[6px] border-[#FF8C00] rounded-[60px] p-12 shadow-[0px_0px_80px_rgba(255,140,0,0.3)] flex flex-col gap-10"
                        >
                            <div className="flex items-center justify-between border-b-4 border-[#FF8C00]/20 pb-8">
                                <h2 className="text-6xl font-black font-fredoka text-white uppercase italic">诊断报告</h2>
                                <div className="bg-[#FF8C00] text-black px-6 py-2 rounded-xl font-black">EE-REPORT: 2026-X</div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="bg-black border-4 border-[#333] rounded-[40px] p-8 text-center">
                                    <p className="text-[10px] font-black text-[#FF8C00] uppercase mb-2">贝叶斯数学底牌 (Theoretical Truth)</p>
                                    <p className="text-7xl font-black font-fredoka text-white">{(mathBelief * 100).toFixed(1)}%</p>
                                </div>
                                <div className="bg-black border-4 border-[#333] rounded-[40px] p-8 text-center">
                                    <p className="text-[10px] font-black text-blue-400 uppercase mb-2">你的主观直觉误差 (Error Margin)</p>
                                    <p className={`text-7xl font-black font-fredoka ${Math.abs(userBelief - mathBelief) < 0.05 ? 'text-green-500' : 'text-red-500'}`}>
                                        {(Math.abs(userBelief - mathBelief) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/5 border-2 border-white/10 rounded-[40px] p-8 flex items-center gap-10">
                                <div className="text-6xl p-6 bg-[#FF8C00]/20 rounded-3xl border-2 border-[#FF8C00]">🔬</div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-2xl font-black text-white italic">现实核查：变压器真实状态为 <span className="text-[#FF8C00] uppercase">{faultType === 'NORMAL' ? '健康运行' : faultType}</span></p>
                                    <p className="text-sm font-bold opacity-50 leading-relaxed">
                                        基于概率决策：如果你判定的概率高于 50%，在工程上你就倾向于“强制停电检修”。你的认知曲线与数学曲线的契合度决定了变电站的运行效率。
                                    </p>
                                </div>
                            </div>

                            <button onClick={initCase} className="w-full bg-white text-black py-6 rounded-[32px] font-black text-3xl shadow-[8px_8px_0px_#FF8C00] hover:scale-105 transition-all">
                                处理下一组异常信号
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
