'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Search, Slash } from "lucide-react"
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Notifications } from '@/components/admin/Notifications'
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import React from "react"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function AdminHeader() {
    const pathname = usePathname()
    const [sheetOpen, setSheetOpen] = React.useState(false)

    // Generate breadcrumbs from path
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)
        return { href, label, isLast: index === segments.length - 1 }
    })

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md transition-all">
            <div className="flex items-center gap-4 md:hidden">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="-ml-3">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 border-r-0">
                        <SheetTitle className="sr-only">Navigation</SheetTitle>
                        <AdminSidebar onClose={() => setSheetOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex flex-1 items-center gap-4">
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => (
                            <React.Fragment key={item.href}>
                                <BreadcrumbItem>
                                    {item.isLast ? (
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64 rounded-xl bg-muted/50 pl-9 focus-visible:bg-background transition-colors"
                    />
                </div>

                <Separator orientation="vertical" className="h-6 hidden sm:block" />

                <Notifications />
            </div>
        </header>
    )
}
