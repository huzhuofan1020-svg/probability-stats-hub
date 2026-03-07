"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MathRenderer from "./MathRenderer"; // Import MathRenderer

interface IdeologyCardProps {
    image?: string;
    tag: string;
    title: string;
    description: string;
}

export default function IdeologySection({ cards }: { cards: IdeologyCardProps[] }) {
    return (
        <section className="mt-20 border-t-[4px] border-neb-text pt-12">
            <div className="flex items-center gap-4 mb-12">
                <div className="bg-red-500 text-white px-6 py-2 rounded-xl border-[3px] border-neb-text shadow-[4px_4px_0px_#1E1B4B] font-fredoka font-black text-xl">
                    IDEOLOGY
                </div>
                <h2 className="text-4xl font-black font-fredoka">课程思政案例</h2>
            </div>

            <div className="space-y-8">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, boxShadow: "12px 12px 0px #1E1B4B" }}
                        className={`group relative overflow-hidden bg-white border-[3px] border-neb-text rounded-3xl shadow-[8px_8px_0px_#1E1B4B] ${card.image ? 'grid grid-cols-1 sm:grid-cols-[1fr_3fr]' : 'flex flex-col'}`}
                    >
                        {card.image ? (
                            // --- Image Layout ---
                            <>
                                <div className="relative h-64 sm:h-full border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-neb-text">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="bg-yellow-100 border-[2px] border-neb-text rounded-lg px-3 py-1 text-xs font-black font-fredoka w-fit mb-4">
                                        {card.tag}
                                    </div>
                                    <h3 className="text-2xl font-black font-fredoka mb-4">{card.title}</h3>
                                    <p className="font-outfit text-neb-text/80 leading-relaxed italic">
                                        {card.description}
                                    </p>
                                </div>
                            </>
                        ) : (
                            // --- Text-Only / Principles Layout ---
                            <div className="p-10 relative">
                                {/* Watermark Background */}
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <i className="ph-fill ph-brain text-9xl text-neb-text"></i>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-neb-text text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                                            <i className="ph-bold ph-strategy"></i>
                                            本质洞察
                                        </div>
                                        <div className="bg-yellow-100 border-[2px] border-neb-text rounded-lg px-3 py-1 text-xs font-black font-fredoka">
                                            {card.tag}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black font-fredoka mb-6 text-neb-text">
                                        {card.title}
                                    </h3>

                                    <div className="pl-6 border-l-[6px] border-neb-primary/30">
                                        <div className="font-outfit text-xl text-neb-text/90 leading-relaxed font-medium">
                                            “<MathRenderer content={card.description} />”
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
