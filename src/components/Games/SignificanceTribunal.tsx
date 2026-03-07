"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import {
    Cpu,
    Gavel,
    AlertOctagon,
    CheckCircle,
    Zap,
    Coins,
    ArrowRight,
    ShieldAlert,
    Library,
    Microscope,
    History
} from 'lucide-react';

type RealityStatus = 'QUALIFIED' | 'DEFECTIVE';

// 半导体合规质检实验室 (IGBT Batch Testing)
export default function SemiconductorQualityLab() {
    const { addPoints } = useGame();

    // 现实情况：批次合格（仅有随机波动 H0 真）还是 批次由于工艺改进确实更优（H0 假）
    const [reality, setReality] = useState<RealityStatus>('QUALIFIED');
    const [alpha, setAlpha] = useState(0.05);
    const [pValue, setPValue] = useState(0.5);
    const [gameState, setGameState] = useState<'BRIEFING' | 'IDLE' | 'JUDGING' | 'VERDICT'>('BRIEFING');
    const [feedback, setFeedback] = useState<{ type: '成功' | '第一类错误' | '第二类错误', message: string, score: number } | null>(null);

    const startTest = useCallback(() => {
        // 随机设定现实情况
        const isBetterProcess = Math.random() > 0.5;
        setReality(isBetterProcess ? 'DEFECTIVE' : 'QUALIFIED');

        // 生成 P 值
        let p;
        if (!isBetterProcess) {
            // H0 为真：P 值服从 [0,1] 均匀分布
            p = Math.random();
        } else {
            // H0 为假：工艺确实改进，P 值倾向于接近 0
            p = Math.pow(Math.random(), 2.5);
        }

        setPValue(p);
        setGameState('JUDGING');
        setFeedback(null);
    }, []);

    const submitVerdict = (decision: 'ACCEPT' | 'REJECT') => {
        let outcome: '成功' | '第一类错误' | '第二类错误';
        let message = "";
        let score = 0;

        if (decision === 'REJECT') { // 判定批次显现出显著优越性（拒绝原假设）
            if (reality === 'QUALIFIED') {
                outcome = '第一类错误';
                message = "【第一类错误】你判定工艺已改进，但实际上这只是抽样带来的偶然好运。这种假阳性会导致生产线盲目调整。";
                score = -200;
            } else {
                outcome = '成功';
                message = "【判定成功】你敏锐地察觉到了工艺改进带来的真实性能提升，国产 IGBT 替代进入下一阶段！";
                score = 300 + Math.round((1 - alpha) * 100);
            }
        } else { // 判定为随机波动（不拒绝原假设）
            if (reality === 'DEFECTIVE') {
                outcome = '第二类错误';
                message = "【第二类错误】工艺其实已经真实改进了，但你的判定阈值过于保守，导致一项重大技术突破被埋没。";
                score = -100;
            } else {
                outcome = '成功';
                message = "【判定成功】你正确地识破了这只是抽样表现稍好的幻觉，守住了质量关，防止了不成熟的技术通过验收。";
                score = 150 + Math.round(alpha * 100);
            }
        }

        addPoints(score);
        setFeedback({ type: outcome, message, score });
        setGameState('VERDICT');
    };

    return (
        <div className="relative w-full h-full bg-[#111] rounded-[40px] shadow-[24px_24px_0px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col font-outfit border-[6px] border-[#222]">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:25px_25px]" />

            {/* Briefing Overlay */}
            <AnimatePresence>
                {gameState === 'BRIEFING' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[60] bg-[#0A0A0A] flex items-center justify-center p-12 overflow-y-auto"
                    >
                        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-16 text-[#10b981] items-center">
                            <div className="space-y-8 text-center lg:text-left">
                                <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} className="p-4 bg-[#10b981]/10 w-fit mx-auto lg:mx-0 rounded-3xl border-2 border-[#10b981]">
                                    <Cpu className="w-12 h-12" />
                                </motion.div>
                                <h1 className="text-6xl font-black font-fredoka uppercase italic leading-none">功率器件<br /><span className="text-white">质检实验室</span></h1>
                                <p className="text-xl font-bold opacity-70 leading-relaxed italic">
                                    【工程背景】一批新的国产 IGBT 功率模块到货。你需要裁定：观测到的击穿电压提升，是源自真实的生产工艺优化，还是仅仅因为抽样的“手气太好”？
                                </p>
                            </div>
                            <div className="space-y-6 bg-white/5 p-8 rounded-[40px] border border-[#10b981]/20">
                                <h3 className="text-2xl font-black flex items-center gap-3 justify-center lg:justify-start">
                                    <ShieldAlert className="w-6 h-6" /> 验收决策法典
                                </h3>
                                <div className="space-y-4 font-bold text-white/80">
                                    <p className="flex gap-3"><span className="text-[#10b981]">α (显著性水平)：</span>你愿意承担多大的风险去“错误认定”一个平庸的工艺？</p>
                                    <p className="flex gap-3"><span className="text-blue-400">P-Value：</span>在已知旧工艺的前提下，观察到当前数据的概率。越小，越说明有“真东西”。</p>
                                </div>
                                <button onClick={() => setGameState('IDLE')} className="w-full bg-[#10b981] text-black py-6 rounded-[32px] font-black text-3xl border-[4px] border-white shadow-[8px_8px_0px_#065f46] hover:scale-105 transition-all uppercase italic">开启高压测试</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADER HUD */}
            <header className="flex justify-between items-center px-10 py-6 bg-[#1A1A1A] border-b-6 border-[#10b981]/30 z-10 shrink-0">
                <div className="flex items-center gap-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#10b981] opacity-50 uppercase tracking-widest leading-none mb-1">Batch ID</span>
                        <span className="font-fredoka font-black text-2xl text-white">IGBT-X300-DOM</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[#10b981] opacity-50 uppercase tracking-widest leading-none mb-1">Significance Level (α)</span>
                        <span className="font-fredoka font-black text-2xl text-[#10b981]">{(alpha).toFixed(3)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {gameState === 'IDLE' && (
                        <button onClick={startTest} className="bg-[#10b981] text-black px-8 py-3 rounded-2xl font-black text-lg border-[4px] border-white shadow-[4px_4px_0px_#065f46] hover:-translate-y-1 transition-all italic">传唤抽样结果</button>
                    )}
                    <button onClick={() => setGameState('BRIEFING')} className="p-3 border-[3px] border-white/10 rounded-xl bg-white/5 text-white/40">
                        <History className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main className="flex-1 relative flex overflow-hidden min-h-0">
                {/* 中央巨幕：P 值监测窗口 */}
                <div className="flex-1 flex flex-col bg-black/20 p-8 relative overflow-hidden">
                    <div className="flex-1 bg-black border-[6px] border-[#222] rounded-[60px] flex flex-col items-center justify-center p-12 relative overflow-hidden shadow-[inset_0px_0px_60px_rgba(16,185,129,0.05)]">
                        <AnimatePresence mode="wait">
                            {(gameState === 'JUDGING' || gameState === 'VERDICT') ? (
                                <motion.div
                                    key="p-view" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    className="text-center space-y-6"
                                >
                                    <p className="text-sm font-black text-[#10b981]/40 uppercase tracking-[0.4em] mb-4">Calculated P-Value</p>
                                    <motion.h2
                                        key={pValue} initial={{ y: 20 }} animate={{ y: 0 }}
                                        className="text-[10vw] font-black font-fredoka text-white leading-none tracking-tighter"
                                    >
                                        {pValue.toFixed(4)}
                                    </motion.h2>
                                    <div className={`mt-8 inline-flex items-center gap-4 px-12 py-5 rounded-full border-[4px] font-black text-2xl uppercase tracking-widest ${pValue < alpha ? 'bg-[#10b981]/20 border-[#10b981] text-[#10b981]' : 'bg-red-500/10 border-red-500 text-red-500'
                                        }`}>
                                        {pValue < alpha ? <CheckCircle className="w-8 h-8" /> : <AlertOctagon className="w-8 h-8" />}
                                        {pValue < alpha ? "结果显著 (Reject H₀)" : "不显著 (Accept H₀)"}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center space-y-6 opacity-10 grayscale">
                                    <Microscope className="w-40 h-40 mx-auto text-[#10b981]" />
                                    <p className="text-4xl font-black font-fredoka uppercase italic tracking-widest text-[#10b981]">Waiting for Lab Data</p>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Background VFX */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#10b981]/20 animate-scan pointer-events-none" />
                    </div>

                    {/* Result Popover */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 200 }}
                                className="absolute bottom-12 inset-x-12 bg-[#1A1A1A] border-[6px] border-[#333] rounded-[50px] p-10 shadow-[0px_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-between gap-12 z-30"
                            >
                                <div className={`w-28 h-28 rounded-[40px] border-[4px] flex items-center justify-center ${feedback.type === '成功' ? 'bg-[#10b981] text-black border-white' : 'bg-red-600 text-white border-white'}`}>
                                    <Zap className="w-14 h-14" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-4xl font-black font-fredoka uppercase text-white mb-2">判定：{feedback.type}</h4>
                                    <p className="text-xl font-bold text-white/60 leading-tight">{feedback.message}</p>
                                    <div className="mt-4 flex gap-6 text-[10px] font-black uppercase text-white/20 tracking-widest">
                                        <span>Reality: {reality === 'QUALIFIED' ? 'Chance Only' : 'True Upgrade'}</span>
                                        <span>Alpha Threshold: {alpha}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className={`text-5xl font-black font-fredoka mb-6 ${feedback.score >= 0 ? 'text-[#10b981]' : 'text-red-500'}`}>
                                        {feedback.score >= 0 ? '+' : ''}{feedback.score} XP
                                    </p>
                                    <button onClick={startTest} className="bg-white text-black px-10 py-5 rounded-[24px] font-black text-2xl flex items-center gap-3 hover:scale-105 transition-transform uppercase italic">
                                        测试下个批次 <ArrowRight className="w-8 h-8" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 侧边分析栏 */}
                <aside className="w-[360px] bg-[#0A0A0A] border-l-6 border-[#1A1A1A] p-10 flex flex-col gap-10 shrink-0">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Gavel className="w-6 h-6 text-[#10b981]" />
                            <h3 className="text-xl font-black font-fredoka text-white uppercase italic">严苛度设定</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-black text-white/30 uppercase leading-none">Alpha Value</span>
                                <span className="text-3xl font-black font-fredoka text-[#10b981] leading-none">{alpha.toFixed(3)}</span>
                            </div>
                            <input
                                type="range" min="0.005" max="0.1" step="0.005" value={alpha}
                                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                                className="w-full h-12 appearance-none bg-[#1A1A1A] rounded-full border-4 border-[#333] accent-[#10b981] cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                <span className="text-red-500">保质风险 ↓ [TYPE II ↑]</span>
                                <span className="text-[#10b981]">创新风险 ↑ [TYPE I ↑]</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6">
                        <h3 className="text-xl font-black font-fredoka text-white uppercase italic">质检裁决</h3>
                        <button
                            disabled={gameState !== 'JUDGING'}
                            onClick={() => submitVerdict('REJECT')}
                            className="flex-1 min-h-[120px] bg-[#10b981] text-black border-[4px] border-white rounded-[32px] p-6 font-black flex flex-col items-center justify-center gap-3 shadow-[8px_8px_0px_#065f46] hover:-translate-y-2 active:translate-y-1 active:shadow-none transition-all disabled:opacity-20"
                        >
                            <Zap className="w-12 h-12" />
                            <div className="text-center">
                                <p className="text-3xl uppercase leading-none mb-1 font-fredoka">UPGRADED</p>
                                <p className="text-[10px] font-bold uppercase opacity-80 italic">判定工艺已真实改进</p>
                            </div>
                        </button>
                        <button
                            disabled={gameState !== 'JUDGING'}
                            onClick={() => submitVerdict('ACCEPT')}
                            className="flex-1 min-h-[120px] bg-white text-black border-[4px] border-[#222] rounded-[32px] p-6 font-black flex flex-col items-center justify-center gap-3 shadow-[8px_8px_0px_#999] hover:-translate-y-2 active:translate-y-1 active:shadow-none transition-all disabled:opacity-20"
                        >
                            <History className="w-12 h-12" />
                            <div className="text-center">
                                <p className="text-3xl uppercase leading-none mb-1 font-fredoka">NOISE ONLY</p>
                                <p className="text-[10px] font-bold uppercase opacity-60 italic">判定仅为随机波动</p>
                            </div>
                        </button>
                    </div>

                    <div className="bg-[#10b981]/5 border-2 border-dashed border-[#10b981]/20 p-6 rounded-[32px] italic text-center">
                        <p className="text-[12px] font-black text-[#10b981] uppercase mb-1">QA PROTOCOL</p>
                        <p className="text-xs font-bold text-white/50 leading-tight">如果 P &lt; α，则当前性能提升具有数理显著性。</p>
                    </div>
                </aside>
            </main>

            {/* Footer Status */}
            <footer className="bg-[#0A0A0A] px-10 py-4 flex justify-between items-center text-white/20 text-[10px] font-black uppercase tracking-[0.4em] shrink-0 border-t-2 border-[#1A1A1A]">
                <div className="flex gap-10">
                    <span className="text-[#10b981]">Tester: BUILT_EE_LAB_01</span>
                    <span>System: Verification HUD v3.0</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
                    高压测试链路已建立
                </div>
            </footer>
        </div>
    );
}
