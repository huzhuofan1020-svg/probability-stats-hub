"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
    points: number;
    level: string;
    addPoints: (amount: number) => void;
    entropy: number; // 0 to 100
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const ENTROPY_TITLES = [
    { threshold: 0, title: "确定性小白" },
    { threshold: 200, title: "概率初学者" },
    { threshold: 500, title: "随机推演者" },
    { threshold: 1000, title: "统计学侦探" },
    { threshold: 2000, title: "规律掌握者" },
    { threshold: 5000, title: "贝叶斯先知" },
    { threshold: 10000, title: "概率论主宰" },
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Functional initializer for points from localStorage
    const [points, setPoints] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('neb_stats_points');
            return saved ? parseInt(saved) : 0;
        }
        return 0;
    });

    // Derive level and entropy using useMemo to avoid cascading renders
    const level = React.useMemo(() => {
        const currentTitle = ENTROPY_TITLES.slice().reverse().find(t => points >= t.threshold);
        return currentTitle ? currentTitle.title : "确定性小白";
    }, [points]);

    const entropy = React.useMemo(() => {
        const nextTitleIndex = ENTROPY_TITLES.findIndex(t => points < t.threshold);
        if (nextTitleIndex !== -1) {
            const currentThreshold = ENTROPY_TITLES[nextTitleIndex - 1]?.threshold || 0;
            const nextThreshold = ENTROPY_TITLES[nextTitleIndex].threshold;
            return ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
        }
        return 100;
    }, [points]);

    // Save to LocalStorage whenever points change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('neb_stats_points', points.toString());
        }
    }, [points]);

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    return (
        <GameContext.Provider value={{ points, level, addPoints, entropy }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
