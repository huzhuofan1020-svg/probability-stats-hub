import Sidebar from "@/components/Sidebar";

export default function ChaptersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-neb-bg">
            <Sidebar />
            <div className="flex-1 min-h-[calc(100vh-80px)] p-6 lg:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
