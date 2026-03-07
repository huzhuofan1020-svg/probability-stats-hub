"use client";

import DetectiveGame from "@/components/Games/DetectiveGame";

export default function DetectiveGamePage() {
    return (
        <div className="h-full w-full bg-neb-bg flex items-center justify-center p-2 md:p-6 overflow-hidden">
            <DetectiveGame />
        </div>
    );
}
