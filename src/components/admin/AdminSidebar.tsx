'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Settings, LogOut, Package, MessageSquare, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarItems = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        title: 'Bookings',
        href: '/admin/bookings',
        icon: Calendar,
    },
    {
        title: 'Calendar',
        href: '/admin/calendar',
        icon: Calendar,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: Package,
    },
    {
        title: 'Complaints',
        href: '/admin/complaints',
        icon: MessageSquare,
    },
    {
        title: 'Customers',
        href: '/admin/customers',
        icon: Users,
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
]

import { ThemeToggle } from '@/components/shared/ThemeToggle'

interface AdminSidebarProps {
    onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-full flex-col border-r bg-card px-3 py-4">
            <div className="mb-8 flex items-center justify-between px-3">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <ThemeToggle />
            </div>
            <div className="flex-1 space-y-1">
                {sidebarItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={onClose}>
                        <span
                            className={cn(
                                'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                            )}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>
            <div className="mt-auto">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST' })
                        window.location.href = '/admin/login'
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
