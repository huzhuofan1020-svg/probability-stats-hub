export interface Section {
    id: string;
    title: string;
    cards: Card[];
}

export interface Card {
    type: 'definition' | 'theorem' | 'example' | 'ideology';
    title: string;
    content: string;
}

export interface IdeologyCardProps {
    image?: string;
    tag: string;
    title: string;
    description: string;
}

export interface Chapter {
    id: number;
    title: string;
    description: string;
    sections: Section[];
    ideologies?: IdeologyCardProps[];
    demos: { title: string; url: string; icon: string }[];
}

export const chaptersData: Record<number, Chapter> = {
    1: {
        id: 1,
        title: "随机事件的概率",
        description: "本章我们从最基本的概念出发，建立概率论的公理化体系。通过韦恩图理解事件的关系，掌握三大公式（加法、乘法、全概率）的核心逻辑。",
        demos: [
            { title: "韦恩图", url: "/chapter1/venn/index.html", icon: "circles-three-plus" },
            { title: "生日悖论", url: "/chapter1/birthday/index.html", icon: "cake" },
            { title: "贝叶斯可视化", url: "/chapter1/bayes/index.html", icon: "strategy" },
        ],
        sections: [
            {
                id: "s1-1",
                title: "试验与事件",
                cards: [
                    {
                        type: "definition",
                        title: "随机试验",
                        content: "满足以下条件的试验称为<strong>随机试验</strong> ($E$)：<ol class='list-decimal ml-6 mt-4 marker:font-bold marker:text-neb-text'><li>试验可以在相同条件下重复进行；</li><li>试验的所有可能结果是已知的，且不止一个；</li><li>每次试验前不能确定会出现哪个结果。</li></ol>"
                    },
                    {
                        type: "definition",
                        title: "样本空间",
                        content: "<strong>样本空间 ($\\Omega$)</strong>：随机试验所有可能结果的集合。<br/><br/><strong>样本点 ($\\omega$)</strong>：样本空间中的每一个元素。"
                    }
                ]
            },
            {
                id: "s1-2",
                title: "概率的公理化定义",
                cards: [
                    {
                        type: "theorem",
                        title: "柯尔莫哥洛夫公理",
                        content: "设 $\\Omega$ 是样本空间，$A$ 是随机事件，概率 $P(A)$ 满足：<ul class='list-disc ml-6 mt-4 marker:text-neb-primary'><li><strong>非负性</strong>：$P(A) \\ge 0$</li><li><strong>规范性</strong>：$P(\\Omega) = 1$</li><li><strong>可列可加性</strong>：若 $A_1, A_2, ...$ 互不相容，则 $P(\\bigcup_{i=1}^{\\infty} A_i) = \\sum_{i=1}^{\\infty} P(A_i)$<./li></ul>"
                    }
                ]
            },
            {
                id: "s1-3",
                title: "古典概型",
                cards: [
                    {
                        type: "example",
                        title: "计算公式",
                        content: "$$ P(A) = \\frac{A\\text{包含的样本点数}}{\\Omega\\text{样本点总数}} = \\frac{k}{n} $$<p class='mt-4 text-neb-text/60 text-sm'>前提：有限性（样本空间有限）、等可能性（每个样本点发生概率相等）。</p>"
                    }
                ]
            },
            {
                id: "s1-4",
                title: "条件概率",
                cards: [
                    {
                        type: "definition",
                        title: "条件概率",
                        content: "设 $A, B$ 是两个事件，且 $P(B) > 0$，称 $$P(A|B) = \\frac{P(AB)}{P(B)}$$ 为在事件 $B$ 发生的条件下，事件 $A$ 发生的<strong>条件概率</strong>。"
                    },
                    {
                        type: "theorem",
                        title: "贝叶斯公式 (Bayes' Theorem)",
                        content: "设 $B_1, B_2, \\dots, B_n$ 是样本空间 $\\Omega$ 的一个划分，且 $P(B_i) > 0$，则对于任一事件 $A$ ($P(A) > 0$)：$$P(B_i|A) = \\frac{P(B_i)P(A|B_i)}{\\sum_{j=1}^n P(B_j)P(A|B_j)}$$"
                    }
                ]
            },
            {
                id: "s1-5",
                title: "事件的独立性",
                cards: [
                    {
                        type: "definition",
                        title: "相互独立",
                        content: "若事件 $A, B$ 满足 $$P(AB) = P(A)P(B)$$ 则称事件 $A, B$ <strong>相互独立</strong>。"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "数学名家",
                title: "柯尔莫哥洛夫：公理化体系的奠基人",
                image: "/img/kolmogorov.jpg",
                description: "20世纪最伟大的数学家之一，他通过三条简洁的公理，将原本零散的概率计算统一为严谨的数学分支。他的故事激励我们：复杂的表象下往往隐藏着简洁的逻辑，勇于探索本质是科学进步的动力。"
            },
            {
                tag: "科学精神",
                title: "托马斯·贝叶斯：逆向思维的力量",
                image: "/img/bayes.jpg",
                description: "贝叶斯公式不仅是数学工具，更是一种认知哲学。它告诉我们：面对新证据，我们要敢于修正旧认知。在信息爆炸的时代，保持理性判断、不断优化逻辑，是当代大学生必备的素养。"
            }
        ]
    },
    2: {
        id: 2,
        title: "随机变量及其分布",
        description: "本章引入随机变量的概念，它是连接随机现象与数学分析的桥梁。我们将学习离散型与连续型随机变量及其分布规律，这是后续统计推断的基础。",
        demos: [
            { title: "泊松分布", url: "/chapter2/poisson/index.html", icon: "chart-bar" },
        ],
        sections: [
            {
                id: "s2-1",
                title: "随机变量及其独立性",
                cards: [
                    {
                        type: "definition",
                        title: "随机变量",
                        content: "设 $(\\Omega, \\mathcal{F}, P)$ 是概率空间。如果 $X: \\Omega \\to \\mathbf{R}$ 是一个实值函数，且对任意实数 $a$，有 $${X \\le a} = {\\omega \\in \\Omega : X(\\omega) \\le a} \\in \\mathcal{F}$$ 则称 $X$ 为 $(\\Omega, \\mathcal{F}, P)$ 上的<strong>随机变量</strong>。<p class='mt-4 text-neb-text/60 text-sm'>直观理解：随机变量是将随机试验的结果数值化的函数。</p>"
                    },
                    {
                        type: "definition",
                        title: "随机变量的独立性",
                        content: "设 $X, Y$ 是两个随机变量。如果对任意实数 $a, b$，有 $$P(X \\le a, Y \\le b) = P(X \\le a) \\cdot P(Y \\le b)$$ 则称随机变量 $X$ 与 $Y$ <strong>相互独立</strong>。"
                    }
                ]
            },
            {
                id: "s2-2",
                title: "离散型随机变量",
                cards: [
                    {
                        type: "theorem",
                        title: "常见离散型分布",
                        content: "<p class='font-bold mb-2'>A. 泊松分布 $\\pi(\\lambda)$</p> $$P\\{X = k\\} = \\frac{\\lambda^k}{k!} e^{-\\lambda}, \\quad k = 0, 1, 2, \\cdots$$"
                    }
                ]
            },
            {
                id: "s2-3",
                title: "连续型随机变量",
                cards: [
                    {
                        type: "definition",
                        title: "概率密度函数 (PDF)",
                        content: "如果存在<strong>非负可积</strong>函数 $f(x)$，使得随机变量 $X$ 的分布函数可以表示为 $$F(x) = P\\{X \\le x\\} = \\int_{-\\infty}^{x} f(t) \\, dt$$ 则称 $X$ 为<strong>连续型随机变量</strong>，$f(x)$ 称为 $X$ 的<strong>概率密度函数</strong>。"
                    },
                    {
                        type: "theorem",
                        title: "常见连续型分布",
                        content: "<p class='font-bold mb-2'>A. 均匀分布 $U(a, b)$</p> $$f(x) = \\begin{cases} \\dfrac{1}{b-a}, & a \\le x \\le b \\\\ 0, & \\text{其他} \\end{cases}$$ <p class='font-bold mt-4 mb-2'>B. 指数分布 $E(\\theta)$</p> $$f(x) = \\begin{cases} \\theta e^{-\\theta x}, & x \\ge 0 \\\\ 0, & x < 0 \\end{cases}$$ <p class='font-bold mt-4 mb-2'>C. 正态分布 $N(\\mu, \\sigma^2)$</p> $$f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma} \\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)$$"
                    }
                ]
            },
            {
                id: "s2-4",
                title: "概率分布函数",
                cards: [
                    {
                        type: "definition",
                        title: "定义",
                        content: "设 $X$ 是一个随机变量，$x$ 是任意实数，函数 $$F(x) = P\\{X \\le x\\}, \\quad -\\infty < x < +\\infty$$ 称为 $X$ 的<strong>分布函数</strong>。<p class='font-bold mt-4'>性质：</p><ul class='list-disc ml-6 marker:text-neb-primary'><li>单调不减：若 $x_1 < x_2$，则 $F(x_1) \\le F(x_2)$</li><li>有界性：$0 \\le F(x) \\le 1$，且 $F(-\\infty)=0, F(+\\infty)=1$</li><li>右连续性：$F(x+0) = F(x)$</li></ul>"
                    }
                ]
            },
            {
                id: "s2-5",
                title: "随机变量函数的分布",
                cards: [
                    {
                        type: "theorem",
                        title: "离散型情形",
                        content: "设 $X$ 有分布律 $P(X=x_i) = p_i$。若 $Y = g(X)$，则 $Y$ 的分布律为：$$P(Y=y_j) = \\sum_{g(x_i)=y_j} P(X=x_i)$$"
                    }
                ]
            },
            {
                id: "s2-6",
                title: "随机变量的 p 分位数",
                cards: [
                    {
                        type: "definition",
                        title: "p 分位数",
                        content: "设 $X$ 为连续型随机变量，其分布函数为 $F(x)$。对于给定的 $p \\in (0, 1)$，若存在 $x_p$ 满足：$$F(x_p) = p$$ 则称 $x_p$ 为该分布的 <strong>$p$ 分位数</strong>。"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "科学溯源",
                title: "高尔顿钉板：秩序之美的具象化",
                image: "/img/chapter2-galton.png",
                description: "正态分布并非数学家的凭空想象，而是自然界最普遍的客观规律。高尔顿钉板揭示了：无数微小的、偶然的力量交织在一起，最终会形成极其稳定的数学秩序。这启发我们，个体的努力固然微小，但集体奋斗的合力终将造就社会发展的宏图。"
            },
            {
                tag: "人文关怀",
                title: "正态分布中的包容精神",
                image: "/img/chapter2-normal.png",
                description: "正态曲线的两侧虽然概率较低，但永远不会消失（取值范围为负无穷到正无穷）。这寓意着：一个成熟的社会应当既尊重主流，又包容“少数派”。在学习数学之严谨的同时，我们更应培养博大的胸怀，尊重多样性，共建和谐文明。"
            }
        ]
    },
    3: {
        id: 3,
        title: "多维随机变量及其分布",
        description: "本章我们将随机变量的概念从一维推广到多维，重点讨论二维随机向量的联合分布、边缘分布和条件分布，以及它们之间的独立性关系。",
        demos: [
            { title: "二维正态分布", url: "/chapter3/normal/index.html", icon: "graph" },
        ],
        sections: [
            {
                id: "s3-1",
                title: "随机向量及其联合分布",
                cards: [
                    {
                        type: "definition",
                        title: "定义 — 随机向量与联合分布函数",
                        content: "设 $(X_1, \\cdots, X_n)$ 是定义在同一概率空间上的 $n$ 个随机变量，则称其为 <strong>$n$ 维随机向量</strong>。<br/><br/><strong>联合分布函数</strong>定义为：$$F(x, y) = P(X \\le x, Y \\le y)$$<p class='mt-4 font-bold'>性质：</p><ul class='list-disc ml-6 marker:text-neb-primary'><li>$0 \\le F(x, y) \\le 1$</li><li>单调不减，右连续</li><li>$F(-\\infty, y) = F(x, -\\infty) = 0, \\quad F(+\\infty, +\\infty) = 1$</li></ul>"
                    },
                    {
                        type: "definition",
                        title: "边缘分布函数",
                        content: "$$F_X(x) = P(X \\le x) = F(x, +\\infty) = \\lim_{y \\to +\\infty} F(x, y)$$ $$F_Y(y) = P(Y \\le y) = F(+\\infty, y) = \\lim_{x \\to +\\infty} F(x, y)$$"
                    }
                ]
            },
            {
                id: "s3-2",
                title: "离散型随机向量及其分布",
                cards: [
                    {
                        type: "definition",
                        title: "联合分布律",
                        content: "$$p_{ij} = P(X = x_i, Y = y_j), \\quad i, j = 1, 2, \\cdots$$<br/><strong>独立性充要条件：</strong> $p_{ij} = p_{i \\cdot} \\cdot p_{\\cdot j}$ 对所有 $i, j$ 成立。"
                    }
                ]
            },
            {
                id: "s3-3",
                title: "连续型随机向量及其联合密度",
                cards: [
                    {
                        type: "definition",
                        title: "联合概率密度函数",
                        content: "若存在非负可积函数 $f(x, y)$，使得 $$F(x, y) = \\int_{-\\infty}^{x} \\int_{-\\infty}^{y} f(u, v) \\, du \\, dv$$ <strong>独立性充要条件：</strong> $f(x, y) = f_X(x) \\cdot f_Y(y)$ 几乎处处成立。"
                    }
                ]
            },
            {
                id: "s3-4",
                title: "随机向量函数的分布",
                cards: [
                    {
                        type: "theorem",
                        title: "卷积公式 (Z = X + Y)",
                        content: "若 $X, Y$ 独立，则 $Z = X + Y$ 的密度函数为：$$f_Z(z) = f_X * f_Y = \\int_{-\\infty}^{+\\infty} f_X(x) f_Y(z-x) \\, dx$$ 这是信号处理中卷积概念在概率论中的体现。"
                    }
                ]
            },
            {
                id: "s3-5",
                title: "条件分布和条件密度",
                cards: [
                    {
                        type: "definition",
                        title: "离散型条件分布律",
                        content: "在 $Y=y_j$ 发生的条件下，$X$ 的条件分布律为：$$P(X=x_i | Y=y_j) = \\frac{p_{ij}}{p_{\\cdot j}}, \\quad i=1, 2, \\cdots$$ 直观理解：在已知 $Y$ 的取值时，重新分配 $X$ 取值的概率份额。"
                    },
                    {
                        type: "definition",
                        title: "连续型条件概率密度",
                        content: "设 $(X, Y)$ 的联合密度为 $f(x, y)$，边缘密度为 $f_Y(y)$。在 $Y=y$ 的条件下，$X$ 的条件概率密度定义为：$$f_{X|Y}(x|y) = \\frac{f(x, y)}{f_Y(y)}, \\quad f_Y(y) > 0$$"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "学科交叉",
                title: "多维视野：从个体到关系的跨越",
                image: "/img/chapter3-placeholder.png",
                description: "正如多维随机变量揭示了不同变量间的隐含联系，社会的发展也绝非孤立个体的叠加。理解联合分布、边缘分布与条件分布的关系，能够帮助我们跳出片面思维，在复杂的关系网络中寻找平衡与规律，培养全面系统的眼光观照世界。"
            }
        ]
    },
    4: {
        id: 4,
        title: "随机变量的数字特征",
        description: "本章重点介绍随机变量的数字特征，包括描述分布集中趋势的数学期望、描述分布离散程度的方差，以及描述变量间相关性的协方差与相关系数。",
        demos: [
            { title: "期望与方差可视化", url: "/chapter4/moments/index.html", icon: "activity" },
        ],
        sections: [
            {
                id: "s4-1",
                title: "数学期望",
                cards: [
                    {
                        type: "definition",
                        title: "定义",
                        content: "<strong>离散型：</strong> 若 $\\sum x_k p_k$ 绝对收敛，则 $E(X) = \\sum_k x_k p_k$<br/><strong>连续型：</strong> 若 $\\int x f(x) dx$ 绝对收敛，则 $E(X) = \\int_{-\\infty}^{+\\infty} x f(x) \\, dx$"
                    }
                ]
            },
            {
                id: "s4-2",
                title: "方差",
                cards: [
                    {
                        type: "definition",
                        title: "定义与公式",
                        content: "$$D(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2$$<p class='mt-4 font-bold'>性质：</p><ul class='list-disc ml-6 marker:text-neb-primary'><li>$D(c) = 0$</li><li>$D(aX + b) = a^2 D(X)$</li><li>若 $X, Y$ 独立，则 $D(X \\pm Y) = D(X) + D(Y)$</li></ul>"
                    }
                ]
            },
            {
                id: "s4-3",
                title: "协方差与相关系数",
                cards: [
                    {
                        type: "definition",
                        title: "定义",
                        content: "<strong>协方差：</strong> $\\text{Cov}(X, Y) = E(XY) - E(X)E(Y)$<br/><strong>相关系数：</strong> $\\rho_{XY} = \\frac{\\text{Cov}(X, Y)}{\\sqrt{D(X)} \\sqrt{D(Y)}}$"
                    },
                    {
                        type: "theorem",
                        title: "独立与不相关",
                        content: "<ol class='list-decimal ml-6 marker:font-bold'><li>独立 $\\Rightarrow$ 不相关 ($\\rho = 0$)</li><li>不相关 $\\not\\Rightarrow$ 独立</li><li><strong>特例：</strong>对于二维正态分布，独立 $\\Leftrightarrow$ 不相关</li></ol>"
                    }
                ]
            },
            {
                id: "s4-4",
                title: "矩",
                cards: [
                    {
                        type: "definition",
                        title: "矩的定义",
                        content: "• <strong>$k$ 阶原点矩</strong>：$\\nu_k = E(X^k)$<br/>• <strong>$k$ 阶中心矩</strong>：$\\mu_k = E[(X-E(X))^k]$<br/>• <strong>混合矩</strong>：对于随机向量 $(X, Y)$，有 $E(X^k Y^l)$ 等。"
                    }
                ]
            },
            {
                id: "s4-6",
                title: "条件数学期望",
                cards: [
                    {
                        type: "definition",
                        title: "定义与计算",
                        content: "<strong>离散型：</strong> $E(X | Y=y_j) = \\sum_{i} x_i P(X=x_i | Y=y_j)$<br/><strong>连续型：</strong> $E(X | Y=y) = \\int_{-\\infty}^{+\\infty} x f_{X|Y}(x|y) \\, dx$<br/><br/><strong>全期望公式：</strong> $E(X) = E[E(X|Y)]$"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "学科溯源",
                title: "巴斯卡与费马：概率论的信函起源",
                description: "1654年，巴斯卡与费马通过信函讨论“点数分配问题”，诞生了数学期望的雏形。科学研究并非总是高不可攀，它往往源于对日常现象的深度思考。从赌徒的疑问到严谨的科学，期望的概念告诉我们：衡量事物的价值不能仅看眼前，而应看其长远的期望。"
            },
            {
                tag: "社会调研",
                title: "识破“稳赢不赔”的骗局",
                description: "通过计算摸球游戏的期望，我们能清晰揭示庄家设置的数学陷阱。数学期望是理性的照妖镜。这种理性思维能力不仅能帮我们守住钱包，更能引导我们在复杂社会生活中保持清醒判断，做一个智慧、诚信、正直的公民。"
            }
        ]
    },
    5: {
        id: 5,
        title: "大数定律及中心极限定理",
        description: "本章讨论极限定理，包括大数定律（频率稳定性的理论基础）和中心极限定理（正态分布普遍性的理论解释）。",
        demos: [
            { title: "高尔顿钉板模拟", url: "/chapter5/galton/index.html", icon: "dots-nine" },
        ],
        sections: [
            {
                id: "s5-1",
                title: "依概率收敛",
                cards: [
                    {
                        type: "definition",
                        title: "依概率收敛",
                        content: "对任意 $\\varepsilon > 0$，若 $\\lim_{n \\to \\infty} P\\{|X_n - a| < \\varepsilon\\}=1$，则称 $\\{X_n\\}$ <strong>依概率收敛于</strong> $a$，记作 $X_n \\xrightarrow{P} a$。"
                    }
                ]
            },
            {
                id: "s5-2",
                title: "大数定律",
                cards: [
                    {
                        type: "theorem",
                        title: "辛钦大数律 (Khinchin)",
                        content: "设 $X_1, X_2, \\cdots$ 独立同分布，$E(X_i) = \\mu$，则 $$\\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^{n} X_i \\xrightarrow{P} \\mu$$"
                    },
                    {
                        type: "theorem",
                        title: "伯努利大数律 (Bernoulli)",
                        content: "设 $n_A$ 是 $n$ 次独立重复试验中 $A$ 发生的次数，$p = P(A)$，则 $$\\frac{n_A}{n} \\xrightarrow{P} p$$ 即频率依概率收敛于概率。"
                    }
                ]
            },
            {
                id: "s5-3",
                title: "中心极限定理",
                cards: [
                    {
                        type: "theorem",
                        title: "林德伯格-列维 CLT",
                        content: "设 $X_1, X_2, \\cdots$ 独立同分布，$E(X_i)=\\mu$，$D(X_i)=\\sigma^2>0$，则 $$\\frac{\\sum_{i=1}^{n} X_i - n\\mu}{\\sqrt{n}\\sigma} \\xrightarrow{d} N(0, 1)$$ 意义：大量独立同分布随机变量的和近似服从正态分布。"
                    },
                    {
                        type: "theorem",
                        title: "棣莫弗-拉普拉斯定理",
                        content: "设 $S_n \\sim B(n, p)$，则 $$\\frac{S_n - np}{\\sqrt{np(1-p)}} \\xrightarrow{d} N(0, 1)$$ 应用：当 $n$ 较大时，二项分布可以用正态分布近似。"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "自然辩证法",
                title: "量变到质变：大数定律的哲学力量",
                description: "当观测次数趋于无穷时，随机波动逐渐抵消，呈现出必然的规律。这生动诠释了“从量变到质变”的哲学原理。在日常生活中，虽然瞬时的结果难以预料，但长期的积累必然通向确定的终点。"
            },
            {
                tag: "科学审美",
                title: "混沌中的秩序美",
                description: "虽然每个个体的行为具有随机性，但整体却服从严谨的数学规律。大数定律揭示了世界的稳定性与和谐性，激励我们以科学的眼光看待社会复杂现象，从不确定的波动中发现内在联系。"
            }
        ]
    },
    6: {
        id: 6,
        title: "样本及抽样分布",
        description: "本章是数理统计的基础，介绍样本、统计量的概念，以及三大抽样分布（χ²、t、F 分布）及其在正态总体中的应用。",
        demos: [
            { title: "三大分布演示", url: "/chapter6/distributions/index.html", icon: "chart-scatter" },
        ],
        sections: [
            {
                id: "s6-1",
                title: "随机样本",
                cards: [
                    {
                        type: "definition",
                        title: "简单随机样本",
                        content: "若 $X_1, \\cdots, X_n$ 相互独立且都与总体 $X$ 同分布，则称 $(X_1, \\cdots, X_n)$ 为<strong>简单随机样本</strong>。"
                    },
                    {
                        type: "theorem",
                        title: "常用统计量",
                        content: "• <strong>样本均值：</strong> $\\bar{X} = \\frac{1}{n} \\sum X_i$<br/>• <strong>样本方差：</strong> $S^2 = \\frac{1}{n-1} \\sum (X_i - \\bar{X})^2$<br/>性质：$E(\\bar{X}) = \\mu$, $E(S^2) = \\sigma^2$ (无偏性)。"
                    }
                ]
            },
            {
                id: "s6-2",
                title: "抽样分布",
                cards: [
                    {
                        type: "definition",
                        title: "三大抽样分布",
                        content: "• <strong>$\\chi^2$ 分布：</strong> 标准正态变量的平方和。<br/>• <strong>$t$ 分布：</strong> 标准正态变量与 $\\chi^2$ 变量之比。<br/>• <strong>$F$ 分布：</strong> 两个独立 $\\chi^2$ 变量之比。"
                    },
                    {
                        type: "theorem",
                        title: "正态总体的抽样分布定理",
                        content: "1. $\\bar{X} \\sim N(\\mu, \\sigma^2/n)$<br/>2. $\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)$<br/>3. $\\bar{X}$ 与 $S^2$ 独立<br/>4. $\\frac{\\bar{X} - \\mu}{S/\\sqrt{n}} \\sim t(n-1)$"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "系统观念",
                title: "窥一斑而知全豹：抽样的科学",
                description: "统计学的魅力在于通过“局部”去推断“全体”。这不仅是数学技巧，更是一种辩证思维。它要求我们在观察社会时，既要深入局部获取细节，又要具备全局视野。通过科学的抽样方法规避幸存者偏差，看清事物的真实全貌。"
            },
            {
                tag: "职业素养",
                title: "数据的代表性与诚实守信",
                description: "抽样分布的严谨性建立在样本的“随机性”之上。如果样本被刻意挑选，所有结论都将崩塌。这教育我们：统计工作的生命线是真实与客观。作为未来的建设者，我们要坚持科学底线，不弄虚作假。"
            }
        ]
    },
    7: {
        id: 7,
        title: "参数估计",
        description: "本章研究如何利用样本信息对总体中的未知参数进行估计。包括点估计（矩估计与最大似然估计）以及区间估计。",
        demos: [
            { title: "置信区间仿真", url: "/chapter7/ci/index.html", icon: "arrows-out" },
        ],
        sections: [
            {
                id: "s7-1",
                title: "点估计",
                cards: [
                    {
                        type: "theorem",
                        title: "矩估计法 (Moment Estimation)",
                        content: "基本思想：用样本矩估计总体矩。结论：样本均值 $\\bar{X}$ 是总体均值 $\\mu$ 的矩估计。"
                    },
                    {
                        type: "theorem",
                        title: "最大似然估计 (MLE)",
                        content: "基本思想：选择使观测样本出现概率最大的参数 $\\theta$。似然函数：$L(\\theta) = \\prod f(x_i; \\theta)$。"
                    }
                ]
            },
            {
                id: "s7-2",
                title: "评选标准",
                cards: [
                    {
                        type: "definition",
                        title: "无偏性、有效性、一致性",
                        content: "• <strong>无偏：</strong> $E(\\hat{\\theta}) = \\theta$<br/>• <strong>有效：</strong> 无偏估计中方差更小。<br/>• <strong>一致：</strong> 样本量大时依概率收敛于真值。"
                    }
                ]
            },
            {
                id: "s7-3",
                title: "置信区间",
                cards: [
                    {
                        type: "definition",
                        title: "置信区间",
                        content: "给定置信度 $1-\\alpha$，找到区间 $(\\hat{\\theta}_L, \\hat{\\theta}_U)$ 满足 $P(\\hat{\\theta}_L < \\theta < \\hat{\\theta}_U)=1-\\alpha$。"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "智慧思维",
                title: "最大似然：合理性的数学推演",
                description: "最大似然估计的核心思想是：如果我们观测到了某些结果，那么一定是那些最容易导致这些结果发生的参数最有可能是真实的。这蕴含了“顺藤摸瓜”的科学逻辑，启发我们在解决工程难题时学会从结果反推原因。"
            },
            {
                tag: "求真务实",
                title: "估计的温度：接近真理的过程",
                description: "参数估计虽然无法百分之百还原总体的“实相”，但通过置信区间和无偏性，我们能不断逼近真相。科学就是一场永无止境的逼近，这种追求卓越的精神是青年工程师应当秉持的初心。"
            }
        ]
    },
    8: {
        id: 8,
        title: "假设检验",
        description: "本章研究如何利用样本判断一个关于总体的假设是否成立。我们将学习显两类错误、著性水平以及常见的检验方法。",
        demos: [
            { title: "假设检验计算器", url: "/chapter8/tester/index.html", icon: "check-circle" },
        ],
        sections: [
            {
                id: "s8-1",
                title: "基本概念",
                cards: [
                    {
                        type: "definition",
                        title: "原假设与备择假设",
                        content: "<strong>$H_0$：</strong> 原假设 (如 $\\mu = \\mu_0$)<br/><strong>$H_1$：</strong> 备择假设，原假设的对立面。"
                    },
                    {
                        type: "theorem",
                        title: "两类错误",
                        content: "• <strong>第 I 类错误：</strong> 弃真 (概率为 $\\alpha$)<br/>• <strong>第 II 类错误：</strong> 取伪<br/>显著性水平 $\\alpha$ 是犯第一类错误的最大允许概率。"
                    }
                ]
            },
            {
                id: "s8-2",
                title: "正态总体检验",
                cards: [
                    {
                        type: "example",
                        title: "常见检验统计量",
                        content: "• <strong>U 检验：</strong> 方差已知，检验均值。<br/>• <strong>t 检验：</strong> 方差未知，检验均值。<br/>• <strong>$\\chi^2$ 检验：</strong> 检验方差。"
                    }
                ]
            }
        ],
        ideologies: [
            {
                tag: "科学批判性",
                title: "证伪主义：假设检验的灵魂",
                description: "假设检验并不直接证明 $H_1$ 正确，而是通过证明 $H_0$ 在概率上极难发生来否定它。这体现了“证伪主义”：科学理论应当敢于接受检验。这教导我们在面对权威时保持独立思考，勇于用数据去质疑。"
            },
            {
                tag: "法治精神",
                title: "无罪推定：统计与法律的交响",
                description: "原假设 $H_0$ 的地位类似于法律中的“无罪推定”。这要求我们在做决策时审慎对待证据，尊重事实，既不轻率地全盘否定，也不盲目照单全收，培养公平公正的素养。"
            }
        ]
    }
};
