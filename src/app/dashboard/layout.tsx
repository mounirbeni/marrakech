import { DashboardSidebar } from "@/components/dashboard/layout/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 shrink-0 border-r border-border/50">
                <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
                    <DashboardSidebar className="border-none h-full" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <DashboardHeader />

                <main className="p-6 lg:p-10">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
