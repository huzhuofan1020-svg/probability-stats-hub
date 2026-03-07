"use client";

import BayesianClinic from "@/components/Games/BayesianClinic";

export default function BayesianClinicPage() {
    return (
        <div className="h-full w-full bg-neb-bg flex items-center justify-center p-2 md:p-6 overflow-hidden">
            <BayesianClinic />
        </div>
    );
}
