"use client";

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
    content: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ content }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.innerHTML = content;
            // Manually find and render $...$ and $$...$$ patterns
            const el = containerRef.current;
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const textNodes: Text[] = [];
            let node;
            while ((node = walker.nextNode())) {
                textNodes.push(node as Text);
            }

            for (const textNode of textNodes) {
                const text = textNode.textContent || '';
                if (!text.includes('$')) continue;

                const span = document.createElement('span');
                // Replace $$...$$ (display) and $...$ (inline)
                let html = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, formula) => {
                    try {
                        return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
                    } catch { return formula; }
                });
                html = html.replace(/\$([^$\n]+?)\$/g, (_, formula) => {
                    try {
                        return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
                    } catch { return formula; }
                });

                if (html !== text) {
                    span.innerHTML = html;
                    textNode.parentNode?.replaceChild(span, textNode);
                }
            }
        }
    }, [content]);

    return <div ref={containerRef} />;
};

export default MathRenderer;
