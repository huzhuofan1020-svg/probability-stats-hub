export interface FormulaItem {
    label: string;
    content: string;
}

export interface FormulaCardData {
    title: string;
    description?: string;
    icon?: string;
    color?: string;
    items: FormulaItem[];
}

export interface TableRow {
    [key: string]: string;
}

export interface FormulaTableData {
    title: string;
    type: "discrete" | "continuous" | "general";
    headers: string[];
    rows: TableRow[];
}

export interface FormulaCategory {
    id: string;
    title: string;
    formulas: (FormulaCardData | FormulaTableData)[];
}

export const formulasData: FormulaCategory[] = [
    {
        id: "01",
        title: "概率论基础",
        formulas: [
            {
                title: "条件概率与独立性",
                icon: "Intersect",
                color: "#EC4899",
                items: [
                    { label: "条件概率定义", content: "P(A|B) = \\frac{P(AB)}{P(B)}" },
                    { label: "乘法公式", content: "P(AB) = P(A)P(B|A)" },
                    { label: "独立性判据", content: "P(AB) = P(A)P(B)" },
                ],
            },
            {
                title: "全概与贝叶斯",
                icon: "GitBranch",
                color: "#3B82F6",
                items: [
                    { label: "全概率公式", content: "P(A) = \\sum_{i=1}^n P(B_i)P(A|B_i)" },
                    { label: "贝叶斯公式 (Bayes)", content: "P(B_j|A) = \\frac{P(B_j)P(A|B_j)}{\\sum_{i=1}^n P(B_i)P(A|B_i)}" },
                ],
            },
        ],
    },
    {
        id: "02",
        title: "分布规律 (Expectation & Variance)",
        formulas: [
            {
                title: "离散型分布 (Discrete Distributions)",
                type: "discrete",
                headers: ["分布类型", "分布律 P{X=k}", "参数范围", "期望 E(X)", "方差 D(X)"],
                rows: [
                    { name: "0-1 分布", formula: "p^k (1-p)^{1-k}", param: "k=0,1", e: "p", d: "p(1-p)" },
                    { name: "二项分布 B(n, p)", formula: "C_n^k p^k (1-p)^{n-k}", param: "k=0,1,\\cdots,n", e: "np", d: "np(1-p)" },
                    { name: "泊松分布 \\pi(\\lambda)", formula: "\\frac{\\lambda^k}{k!} e^{-\\lambda}", param: "k=0,1,2,\\cdots", e: "\\lambda", d: "\\lambda" },
                    { name: "几何分布 G(p)", formula: "(1-p)^{k-1} p", param: "k=1,2,\\cdots", e: "1/p", d: "(1-p)/p^2" },
                    { name: "超几何分布 H(n,N,M)", formula: "\\frac{C_M^k C_{N-M}^{n-k}}{C_N^n}", param: "k=\\max(0, n-N+M)", e: "n\\frac{M}{N}", d: "n\\frac{M}{N}(1-\\frac{M}{N})\\frac{N-n}{N-1}" },
                ],
            },
            {
                title: "连续型分布 (Continuous Distributions)",
                type: "continuous",
                headers: ["分布类型", "概率密度 f(x)", "参数/范围", "期望 E(X)", "方差 D(X)"],
                rows: [
                    { name: "均匀分布 U(a, b)", formula: "\\frac{1}{b-a}", param: "a < x < b", e: "\\frac{a+b}{2}", d: "\\frac{(b-a)^2}{12}" },
                    { name: "指数分布 Exp(\\lambda)", formula: "\\lambda e^{-\\lambda x}", param: "x > 0", e: "1/\\lambda", d: "1/\\lambda^2" },
                    { name: "正态分布 N(\\mu, \\sigma^2)", formula: "\\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}", param: "-\\infty < x < \\infty", e: "\\mu", d: "\\sigma^2" },
                    { name: "标准正态 N(0, 1)", formula: "\\frac{1}{\\sqrt{2\\pi}} e^{-x^2/2}", param: "\\phi(x)", e: "0", d: "1" },
                ],
            },
        ],
    },
    {
        id: "03",
        title: "数字特征与相关性",
        formulas: [
            {
                title: "性质总结",
                icon: "Calculator",
                color: "#F59E0B",
                items: [
                    { label: "期望线性性质", content: "E(aX+bY) = aE(X) + bE(Y)" },
                    { label: "方差计算公式", content: "D(X) = E(X^2) - [E(X)]^2" },
                    { label: "方差性质", content: "D(aX+b) = a^2 D(X)" },
                ],
            },
            {
                title: "协方差与相关系数",
                icon: "LineChart",
                color: "#6366F1",
                items: [
                    { label: "协方差定义", content: "Cov(X, Y) = E(XY) - E(X)E(Y)" },
                    { label: "相关系数 (Pearson)", content: "\\rho_{XY} = \\frac{Cov(X, Y)}{\\sqrt{D(X)D(Y)}}" },
                ],
            },
        ],
    },
    {
        id: "04",
        title: "数理统计基础",
        formulas: [
            {
                title: "样本公式",
                icon: "Database",
                color: "#EF4444",
                items: [
                    { label: "样本均值", content: "\\bar{X} = \\frac{1}{n} \\sum X_i" },
                    { label: "样本方差 (无偏)", content: "S^2 = \\frac{1}{n-1} \\sum (X_i - \\bar{X})^2" },
                ],
            },
            {
                title: "正态总体抽样分布",
                icon: "BarChart3",
                color: "#06B6D4",
                items: [
                    { label: "均值分布", content: "\\bar{X} \\sim N(\\mu, \\sigma^2/n)" },
                    { label: "t 统计量 (未知 \\sigma^2)", content: "\\frac{\\bar{X} - \\mu}{S/\\sqrt{n}} \\sim t(n-1)" },
                    { label: "方差分布", content: "\\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1)" },
                ],
            },
        ],
    },
    {
        id: "05",
        title: "多维随机变量",
        formulas: [
            {
                title: "联合与边缘分布",
                icon: "Shapes",
                color: "#EC4899",
                items: [
                    { label: "联合分布基本性质", content: "F(x,y) = P\\{X \\le x, Y \\le y\\}" },
                    { label: "连续型边缘密度", content: "f_X(x) = \\int_{-\\infty}^{+\\infty} f(x,y) dy" },
                    { label: "独立性判据", content: "f(x,y) = f_X(x) f_Y(y)" },
                ],
            },
        ],
    },
    {
        id: "06",
        title: "极限理论",
        formulas: [
            {
                title: "大数定律 (LLN)",
                icon: "TrendingUp",
                color: "#8B5CF6",
                items: [
                    { label: "辛钦大数定律", content: "\\bar{X}_n \\xrightarrow{P} E(X) \\text{ (独立同分布)}" },
                    { label: "伯努利大数定律", content: "\\frac{n_k}{n} \\xrightarrow{P} p \\text{ (频率收敛于概率)}" },
                ],
            },
            {
                title: "中心极限定理 (CLT)",
                icon: "Bell",
                color: "#10B981",
                items: [
                    { label: "独立同分布 CLT", content: "\\frac{\\sum X_i - n\\mu}{\\sqrt{n}\\sigma} \\xrightarrow{d} N(0, 1)" },
                    { label: "棣莫弗-拉普拉斯 CLT", content: "\\frac{n_A - np}{\\sqrt{np(1-p)}} \\xrightarrow{d} N(0, 1)" },
                ],
            },
        ],
    },
    {
        id: "07",
        title: "参数估计",
        formulas: [
            {
                title: "置信区间 (单正态)",
                type: "general",
                headers: ["待估参数", "条件", "置信区间 (1-\\alpha)"],
                rows: [
                    { p: "均值 \\mu", cond: "\\sigma^2 已知", interval: "[\\bar{x} - z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}, \\bar{x} + z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}]" },
                    { p: "均值 \\mu", cond: "\\sigma^2 未知", interval: "[\\bar{x} - t_{\\alpha/2}(n-1) \\frac{s}{\\sqrt{n}}, \\bar{x} + t_{\\alpha/2}(n-1) \\frac{s}{\\sqrt{n}}]" },
                    { p: "方差 \\sigma^2", cond: "\\mu 未知", interval: "[\\frac{(n-1)s^2}{\\chi_{\\alpha/2}^2(n-1)}, \\frac{(n-1)s^2}{\\chi_{1-\\alpha/2}^2(n-1)}]" },
                ],
            },
        ],
    },
    {
        id: "08",
        title: "假设检验",
        formulas: [
            {
                title: "常用检验统计量",
                type: "general",
                headers: ["适用场景", "零假设 H_0", "检验统计量"],
                rows: [
                    { scene: "均值检验 (\\sigma^2 已知)", h0: "\\mu = \\mu_0", t: "Z = \\frac{\\bar{X}-\\mu_0}{\\sigma/\\sqrt{n}} \\sim N(0,1)" },
                    { scene: "均值检验 (\\sigma^2 未知)", h0: "\\mu = \\mu_0", t: "t = \\frac{\\bar{X}-\\mu_0}{S/\\sqrt{n}} \\sim t(n-1)" },
                    { scene: "方差检验 (\\mu 未知)", h0: "\\sigma^2 = \\sigma_0^2", t: "\\chi^2 = \\frac{(n-1)S^2}{\\sigma_0^2} \\sim \\chi^2(n-1)" },
                ],
            },
        ],
    },
];
