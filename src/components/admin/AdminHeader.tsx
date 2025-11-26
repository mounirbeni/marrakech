'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Notifications } from '@/components/admin/Notifications'

export function AdminHeader() {
    return (
        <header className="flex items-center justify-between p-4 border-b bg-card md:hidden">
            <div className="flex items-center gap-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SheetTitle className="sr-only">Admin Menu</SheetTitle>
                        <AdminSidebar />
                    </SheetContent>
                </Sheet>
                <span className="font-bold text-lg">Admin Panel</span>
            </div>
            <div className="flex items-center gap-2">
                <Notifications />
            </div>
        </header>
    )
}
