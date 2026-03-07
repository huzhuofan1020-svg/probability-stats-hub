export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 font-outfit text-neb-text">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-block bg-yellow-400 text-neb-text px-6 py-2 rounded-xl border-[3px] border-neb-text shadow-[4px_4px_0px_#1E1B4B] font-fredoka font-black text-xl mb-6">
                    TERMS
                </div>
                <h1 className="text-4xl md:text-5xl font-black font-fredoka mb-6">
                    用户协议与隐私条款
                </h1>
                <p className="text-xl text-neb-text/80 max-w-2xl mx-auto leading-relaxed">
                    请仔细阅读以下条款，使用本网站即表示您同意遵守以下规定。
                </p>
            </div>

            {/* Content */}
            <div className="bg-white border-[3px] border-neb-text rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#1E1B4B] space-y-8">
                {/* Section 1 */}
                <div>
                    <h2 className="text-2xl font-black font-fredoka mb-4 flex items-center gap-2">
                        <span className="bg-neb-text text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                        服务内容
                    </h2>
                    <p className="text-neb-text/80 leading-relaxed">
                        Probability Hub 提供免费的概率论与数理统计学习资源，包括但不限于课程讲义、公式速查表、交互式演示实验等。所有内容仅供学习交流使用，未经授权不得用于商业用途。
                    </p>
                </div>

                <hr className="border-t-[3px] border-neb-text/10 border-dashed" />

                {/* Section 2 */}
                <div>
                    <h2 className="text-2xl font-black font-fredoka mb-4 flex items-center gap-2">
                        <span className="bg-neb-text text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                        知识产权声明
                    </h2>
                    <p className="text-neb-text/80 leading-relaxed">
                        本站所有原创内容（包括文字、图片、代码及交互设计）的知识产权归开发团队所有。对于引用的第三方开源资源（如 KaTeX, Lucide 等），我们严格遵守其相应的开源协议。
                    </p>
                </div>

                <hr className="border-t-[3px] border-neb-text/10 border-dashed" />

                {/* Section 3 */}
                <div>
                    <h2 className="text-2xl font-black font-fredoka mb-4 flex items-center gap-2">
                        <span className="bg-neb-text text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
                        免责声明
                    </h2>
                    <p className="text-neb-text/80 leading-relaxed">
                        虽然我们力求内容的准确性，但不对因使用本站内容而导致的任何直接或间接损失承担责任。统计学是一门严谨的学科，在实际应用中请参考权威教材或咨询专业人士。
                    </p>
                </div>

                <div className="mt-8 bg-gray-100 p-6 rounded-xl border-[2px] border-neb-text text-sm text-neb-text/60 font-medium">
                    最后更新日期：2026年2月12日
                </div>
            </div>
        </div>
    );
}
