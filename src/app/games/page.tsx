"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    BookOpen,
    ChevronRight,
    Radio,
    Battery,
    Cpu,
    Building2,
    Factory,
    Zap,
    GraduationCap,
    Library
} from "lucide-react";

const DEPARTMENTS = [
    {
        name: "控制与电力工程系统",
        id: "ee",
        description: "北建大电气工程及其自动化专业教学模块",
        labs: [
            {
                id: 'detective',
                title: '谐波参数估算',
                subtitle: '随机过程与 MLE 拟合',
                icon: Radio,
                color: 'text-green-600',
                borderColor: 'border-green-200',
                bgColor: 'bg-green-50',
                link: '/games/detective',
                disabled: false
            },
            {
                id: 'clinic',
                title: '变压器诊断控制台',
                subtitle: '贝叶斯更新与设备状态',
                icon: Battery,
                color: 'text-orange-600',
                borderColor: 'border-orange-200',
                bgColor: 'bg-orange-50',
                link: '/games/clinic',
                disabled: false
            },
            {
                id: 'tribunal',
                title: '半导体效能评估',
                subtitle: '假设检验与功率质检',
                icon: Cpu,
                color: 'text-emerald-600',
                borderColor: 'border-emerald-200',
                bgColor: 'bg-emerald-50',
                link: '/games/tribunal',
                disabled: false
            }
        ]
    },
    {
        name: "智能建造与工程管理",
        id: "smart-build",
        description: "即将上线：基于施工风险概率的工程决策系统",
        labs: [
            {
                id: 'build-risk',
                title: '施工风险评估',
                subtitle: '[开发中]',
                icon: Building2,
                color: 'text-blue-600',
                borderColor: 'border-blue-100',
                bgColor: 'bg-blue-50/50',
                link: '#',
                disabled: true
            }
        ]
    },
    {
        name: "智能制造与工业 4.0",
        id: "smart-mfg",
        description: "即将上线：生产线良率统计与质量控制",
        labs: [
            {
                id: 'mfg-qa',
                title: '生产线控制',
                subtitle: '[开发中]',
                icon: Factory,
                color: 'text-purple-600',
                borderColor: 'border-purple-100',
                bgColor: 'bg-purple-50/50',
                link: '#',
                disabled: true
            }
        ]
    }
];

export default function GamesHub() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] text-[#1E1B4B]">
            {/* Academic Header */}
            <header className="bg-white border-b border-gray-100 pt-16 pb-12 px-6">
                <div className="max-w-7xl mx-auto space-y-4">
                    <div className="flex items-center gap-3 text-neb-primary font-black uppercase tracking-widest text-sm">
                        <GraduationCap className="w-5 h-5" />
                        北京建筑大学概率论智慧教学平台
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black font-fredoka leading-tight tracking-tight">
                        多维学科 <span className="text-neb-primary underline decoration-neb-accent underline-offset-8">实验门户</span>
                    </h1>
                    <p className="max-w-2xl text-lg font-outfit font-medium text-gray-500 leading-relaxed">
                        本平台旨在为不同专业背景的学子提供适配的概率统计教学场景。请根据您的专业方向进入相应的数字化实验室。
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-16 px-6 space-y-24">
                {DEPARTMENTS.map((dept, deptIdx) => (
                    <section key={dept.id} className="space-y-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-neb-primary pl-6">
                            <div>
                                <h2 className="text-3xl font-black font-fredoka">{dept.name}</h2>
                                <p className="text-gray-400 font-bold mt-1 uppercase tracking-wider text-xs">{dept.description}</p>
                            </div>
                            <div className="flex items-center gap-2 text-neb-primary/40 font-black text-[10px] uppercase tracking-widest italic">
                                Campus Lab Division
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {dept.labs.map((lab, labIdx) => (
                                <motion.div
                                    key={lab.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * labIdx }}
                                    className={`relative group h-full flex flex-col p-8 rounded-[32px] border-2 transition-all ${lab.disabled
                                        ? 'bg-gray-50/50 border-gray-100 opacity-60'
                                        : `${lab.bgColor} ${lab.borderColor} hover:shadow-xl hover:scale-[1.02] cursor-pointer`
                                        }`}
                                >
                                    {!lab.disabled && (
                                        <Link href={lab.link} className="absolute inset-0 z-10" />
                                    )}

                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/50 ${lab.bgColor} ${lab.color}`}>
                                        <lab.icon className="w-7 h-7" />
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-xl font-black font-fredoka">{lab.title}</h3>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${lab.color} opacity-80`}>
                                            {lab.subtitle}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between text-neb-primary font-black text-sm group-hover:gap-4 transition-all">
                                        {lab.disabled ? '准备中' : '进入实验室'}
                                        <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${lab.disabled ? 'hidden' : ''}`} />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Filler/Add Service Card */}
                            <div className="hidden lg:flex border-2 border-dashed border-gray-100 rounded-[32px] p-8 items-center justify-center flex-col text-center gap-4 opacity-40">
                                <Library className="w-10 h-10 text-gray-400" />
                                <p className="text-xs font-black uppercase tracking-widest">持续扩充中...</p>
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            {/* Institutional Footer */}
            <footer className="bg-gray-50 py-20 px-6 border-t border-gray-100">
                <div className="max-w-3xl mx-auto text-center space-y-10">
                    <div className="flex justify-center gap-8 grayscale opacity-20">
                        <Zap className="w-6 h-6" />
                        <Building2 className="w-6 h-6" />
                        <Factory className="w-6 h-6" />
                    </div>
                    <div className="space-y-4">
                        <p className="font-outfit font-black text-gray-300 uppercase tracking-[0.6em] text-[10px]">
                            BUCEA Advanced Probability Lab Ecosystem
                        </p>
                        <p className="text-sm font-bold text-gray-400 italic">
                            “为未来城市建造者提供数学原力”
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
