import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t-[4px] border-neb-text bg-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="bg-neb-primary text-white px-4 py-1 border-[3px] border-neb-text shadow-[4px_4px_0px_#1E1B4B] -rotate-2 font-fredoka font-black text-xl w-fit">
                        PROBABILITY HUB
                    </div>
                    <p className="font-outfit text-neb-text/80 text-sm mt-2 font-medium">
                        © 2026 概率统计智库. All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 font-outfit font-bold text-neb-text">
                    <Link href="/" className="hover:text-neb-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-neb-primary underline-offset-4">
                        首页
                    </Link>
                    <Link href="/formulas" className="hover:text-neb-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-neb-primary underline-offset-4">
                        核心公式
                    </Link>
                    <Link href="/about" className="hover:text-neb-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-neb-primary underline-offset-4">
                        关于我们
                    </Link>
                    <Link href="/terms" className="hover:text-neb-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-neb-primary underline-offset-4">
                        用户条例
                    </Link>
                    <Link href="/contact" className="hover:text-neb-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-neb-primary underline-offset-4">
                        联系我们
                    </Link>
                </div>
            </div>
        </footer>
    );
}
