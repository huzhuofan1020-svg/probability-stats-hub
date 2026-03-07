export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 font-outfit text-neb-text">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-block bg-pink-400 text-white px-6 py-2 rounded-xl border-[3px] border-neb-text shadow-[4px_4px_0px_#1E1B4B] font-fredoka font-black text-xl mb-6 transform rotate-3">
                    CONTACT US
                </div>
                <h1 className="text-5xl md:text-6xl font-black font-fredoka mb-6">
                    联系我们
                </h1>
                <p className="text-xl text-neb-text/80 max-w-2xl mx-auto leading-relaxed">
                    无论是关于课程内容的疑问，还是对平台的反馈与建议，我们都非常乐意倾听您的声音。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-blue-50 border-[3px] border-neb-text rounded-3xl p-8 shadow-[6px_6px_0px_#1E1B4B]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white border-[3px] border-neb-text rounded-full flex items-center justify-center text-xl">
                                <i className="ph-bold ph-envelope-simple"></i>
                            </div>
                            <h2 className="text-2xl font-black font-fredoka">电子邮件</h2>
                        </div>
                        <p className="text-neb-text/80 text-lg">
                            support@probability-hub.com
                        </p>
                        <p className="text-neb-text/60 text-sm mt-2">
                            通常在 24 小时内回复
                        </p>
                    </div>

                    <div className="bg-yellow-50 border-[3px] border-neb-text rounded-3xl p-8 shadow-[6px_6px_0px_#1E1B4B]">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white border-[3px] border-neb-text rounded-full flex items-center justify-center text-xl">
                                <i className="ph-bold ph-github-logo"></i>
                            </div>
                            <h2 className="text-2xl font-black font-fredoka">GitHub</h2>
                        </div>
                        <p className="text-neb-text/80 text-lg">
                            github.com/probability-hub
                        </p>
                        <p className="text-neb-text/60 text-sm mt-2">
                            欢迎提交 Issue 或 PR
                        </p>
                    </div>
                </div>

                {/* Feedback Form Mockup */}
                <div className="bg-white border-[3px] border-neb-text rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_#1E1B4B]">
                    <h2 className="text-2xl font-black font-fredoka mb-6 flex items-center gap-2">
                        <i className="ph-bold ph-paper-plane-tilt text-neb-primary"></i>
                        快速留言
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">姓名</label>
                            <input type="text" className="w-full border-[3px] border-neb-text rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-neb-primary/20 transition-all font-medium" placeholder="您的称呼" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">邮箱</label>
                            <input type="email" className="w-full border-[3px] border-neb-text rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-neb-primary/20 transition-all font-medium" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">留言内容</label>
                            <textarea rows={4} className="w-full border-[3px] border-neb-text rounded-xl p-3 focus:outline-none focus:ring-4 focus:ring-neb-primary/20 transition-all font-medium resize-none" placeholder="想对我们说什么..." ></textarea>
                        </div>
                        <button type="button" className="w-full bg-neb-primary text-white font-black py-3 rounded-xl border-[3px] border-neb-text shadow-[4px_4px_0px_#1E1B4B] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1E1B4B] transition-all hover:bg-neb-primary/90 mt-2">
                            发送留言
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
