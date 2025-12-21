
import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-muted/20 min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
