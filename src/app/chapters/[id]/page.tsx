import { chaptersData } from "@/data/chapters";
import KnowledgeCard from "@/components/KnowledgeCard";
import IdeologySection from "@/components/IdeologySection";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const chapterId = parseInt(id);
    const chapter = chaptersData[chapterId];

    if (!chapter) {
        notFound();
    }

    return (
        <div className="space-y-12 pb-20">
            {/* Chapter Hero */}
            <header className="mb-16">
                <div className="inline-block px-4 py-1 bg-neb-primary border-[3px] border-neb-text rounded-lg font-fredoka font-black mb-4 -rotate-2">
                    Chapter {chapter.id.toString().padStart(2, '0')}
                </div>
                <h1 className="text-5xl font-black font-fredoka mb-6">{chapter.title}</h1>
                <p className="text-xl font-outfit text-neb-text/70">{chapter.description}</p>
            </header>

            {chapter.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-neb-text text-white px-4 py-2 rounded-lg font-mono font-bold text-lg">
                            §{section.id.split('s')[1]}
                        </div>
                        <h2 className="text-3xl font-black font-fredoka">{section.title}</h2>
                    </div>

                    <div className="space-y-8">
                        {section.cards.map((card, idx) => (
                            <KnowledgeCard key={idx} type={card.type} title={card.title}>
                                {card.content}
                            </KnowledgeCard>
                        ))}
                    </div>
                </section>
            ))}

            {/* Ideology Section */}
            {(() => {
                // The user intended to add a card for a specific chapter, likely Chapter 8.
                // This data is hardcoded here as a temporary solution because the original file
                // does not contain the data structure the user was trying to search for.
                // Ideally, this data should be moved to the central data source (`/data/chapters.ts`).
                if (chapter.id === 8 && chapter.ideologies) {
                    const chapter8Ideologies = [
                        {
                            tag: "实事求是",
                            title: "用贝叶斯思维更新认知",
                            image: "/img/bayes.jpg",
                            description: `贝叶斯定理不仅仅是一个数学公式，它更是一种科学的世界观和方法论。它告诉我们，我们的认知和信念（先验概率）应该随着新的事实和证据（观测数据）而更新。这要求我们以开放和理性的态度面对世界，勇于承认未知，并根据客观事实修正自己的看法，而不是固步自封或盲目崇拜权威。这种实事求是、与时俱进的思维方式，是建立正确价值观和人生观的重要基石。`
                        },
                        {
                            tag: "辩证唯物主义",
                            title: "偶然与必然的辩证统一",
                            image: "/img/chapter8-justice.png",
                            description: `概率论揭示了偶然现象背后隐藏的必然规律。单个随机事件的发生看似偶然，但大量重复事件的统计结果却呈现出稳定的规律性，这就是大数定律。这体现了偶然性与必然性的辩证统一关系：必然性通过无数的偶然事件为自己开辟道路，而偶然性背后则隐藏着必然的规律。`
                        },
                        {
                            tag: "实践是检验真理的唯一标准",
                            title: "从统计推断看实践的重要性",
                            image: "/img/chapter8-science.png",
                            description: `参数估计和假设检验是统计推断的核心，其本质就是“从实践中来，到实践中去”的科学过程。我们从具体问题（实践）出发，通过抽样（调查研究）获取数据，建立统计模型进行分析，最终得出结论并用于指导新的实践。这一过程深刻体现了实践在认识世界和改造世界中的决定性作用。`
                        }
                    ];
                    return <IdeologySection cards={chapter8Ideologies} />;
                } else if (chapter.ideologies) {
                    return <IdeologySection cards={chapter.ideologies} />;
                }
                return null;
            })()}

            {/* Chapter Footer / Navigation */}
            <footer className="pt-20 border-t-[3px] border-dotted border-neb-text flex justify-between items-center mt-20">
                {chapterId > 1 ? (
                    <Link href={`/chapters/${chapterId - 1}`} className="bg-white border-[3px] border-neb-text px-6 py-3 rounded-xl font-fredoka font-black hover:bg-neb-bg transition-colors shadow-[4px_4px_0px_#1E1B4B] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        ← 上一章
                    </Link>
                ) : (
                    <div /> // Placeholder for alignment
                )}
                <div className="hidden md:block h-1 flex-1 mx-8 bg-neb-text/10 rounded-full"></div>
                {chapterId < 8 ? (
                    <Link href={`/chapters/${chapterId + 1}`} className="bg-white border-[3px] border-neb-text px-6 py-3 rounded-xl font-fredoka font-black hover:bg-neb-bg transition-colors shadow-[4px_4px_0px_#1E1B4B] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                        下一章 →
                    </Link>
                ) : (
                    <div /> // Placeholder for alignment
                )}
            </footer>
        </div>
    );
}
