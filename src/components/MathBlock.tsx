"use client";

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathBlockProps {
    formula: string;
    displayMode?: boolean;
}

const MathBlock: React.FC<MathBlockProps> = ({ formula, displayMode = false }) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(formula, containerRef.current, {
                    displayMode,
                    throwOnError: false,
                });
            } catch (e) {
                console.error('KaTeX rendering error:', e);
            }
        }
    }, [formula, displayMode]);

    return <span ref={containerRef} />;
};

export default MathBlock;
