export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 font-outfit text-neb-text">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-block bg-yellow-400 text-neb-text px-6 py-2 rounded-xl border-[3px] border-neb-text shadow-[4px_4px_0px_#1E1B4B] font-fredoka font-black text-xl mb-6">
                    ABOUT US
                </div>
                <h1 className="text-5xl md:text-6xl font-black font-fredoka mb-6">
                    关于 Probability Hub
                </h1>
                <p className="text-xl text-neb-text/80 max-w-2xl mx-auto leading-relaxed">
                    一个致力于让概率统计学习变得直观、有趣且深刻的现代化开源教育平台。
                </p>
            </div>

            {/* Content Cards */}
            <div className="space-y-12">
                {/* Mission */}
                <div className="bg-white border-[3px] border-neb-text rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#1E1B4B]">
                    <h2 className="text-3xl font-black font-fredoka mb-6 flex items-center gap-3">
                        <i className="ph-bold ph-target text-neb-primary"></i>
                        我们的使命
                    </h2>
                    <p className="text-lg leading-loose text-neb-text/90">
                        Probability Hub 旨在打破传统教材枯燥乏味的刻板印象。我们通过**可视化交互实验**、**直观的数学公式解析**以及**深度的思政哲学引导**，帮助学生建立从现象到本质的统计学思维。我们相信，数学不仅是计算的工具，更是理解世界的语言。
                    </p>
                </div>

                {/* Team */}
                <div className="bg-purple-50 border-[3px] border-neb-text rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#1E1B4B]">
                    <h2 className="text-3xl font-black font-fredoka mb-8 flex items-center gap-3">
                        <i className="ph-bold ph-users text-purple-600"></i>
                        创作团队
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Member 1 */}
                        <div className="bg-white border-[3px] border-neb-text rounded-2xl p-6 shadow-[4px_4px_0px_#1E1B4B]">
                            <div className="w-16 h-16 bg-blue-500 rounded-full border-[3px] border-neb-text mb-4 flex items-center justify-center text-white text-2xl font-black">
                                <i className="ph-bold ph-ghost"></i>
                            </div>
                            <h3 className="text-xl font-bold font-fredoka mb-2">核心开发者</h3>
                            <p className="text-neb-text/70 text-sm">
                                负责全栈开发、交互设计与数学可视化引擎的实现。
                            </p>
                        </div>
                        {/* Member 2 */}
                        <div className="bg-white border-[3px] border-neb-text rounded-2xl p-6 shadow-[4px_4px_0px_#1E1B4B]">
                            <div className="w-16 h-16 bg-pink-500 rounded-full border-[3px] border-neb-text mb-4 flex items-center justify-center text-white text-2xl font-black">
                                <i className="ph-bold ph-pen-nib"></i>
                            </div>
                            <h3 className="text-xl font-bold font-fredoka mb-2">内容策划</h3>
                            <p className="text-neb-text/70 text-sm">
                                负责课程大纲编写、思政案例筛选与知识点梳理。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Origins */}
                <div className="bg-blue-50 border-[3px] border-neb-text rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#1E1B4B]">
                    <h2 className="text-3xl font-black font-fredoka mb-6 flex items-center gap-3">
                        <i className="ph-bold ph-rocket-launch text-blue-600"></i>
                        项目起源
                    </h2>
                    <p className="text-lg leading-loose text-neb-text/90">
                        本项目起源于大学《概率论与数理统计》课程的教学改革探索。我们发现，许多同学在面对抽象的公式时感到困惑。为了解决这个问题，我们结合了当下流行的 **Neo-Brutalism** 设计风格与 **Next.js** 技术栈，从零打造了这个“颜值与内涵并重”的学习中心。
                    </p>
                </div>
            </div>
        </div>
    );
}
