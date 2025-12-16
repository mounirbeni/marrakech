"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar, // Changed from CalendarDays
    Heart,
    LifeBuoy,
    LogOut,
    Map,
    UserCircle, // Changed from User
    ChevronRight,
    Settings,
    CreditCard // Added CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const sidebarItems = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Bookings",
        href: "/dashboard/bookings",
        icon: Calendar,
    },
    {
        title: "Payments",
        href: "/dashboard/payments",
        icon: CreditCard,
    },
    {
        title: "Wishlist",
        href: "/dashboard/wishlist",
        icon: Heart,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: UserCircle,
    },
    {
        title: "Support",
        href: "/dashboard/support",
        icon: LifeBuoy,
    },
];

export function DashboardSidebar({ className }: { className?: string }) {
    const pathname = usePathname();
    const [userName, setUserName] = useState("Traveler");

    useEffect(() => {
        // Simple client-side fetch for name to display in sidebar
        fetch("/api/user").then(res => res.json()).then(data => {
            if (data.name) setUserName(data.name);
        }).catch(() => { });
    }, []);

    return (
        <div className={cn("flex flex-col h-full border-r bg-card/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20", className)}>
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Map className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Marrakech</span>
                </Link>
            </div>

            <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />}
                            <div className="flex items-center gap-3 relative z-10">
                                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors")} />
                                <span className="font-medium">{item.title}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 text-primary-foreground/70" />}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-border/50 bg-card/20">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <Avatar className="h-10 w-10 border-2 border-background/50 shadow-sm">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {userName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{userName}</p>
                        <Link href="/dashboard/profile" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                            View Profile
                        </Link>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
                    onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST' });
                        window.location.href = '/login';
                    }}
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </Button>
            </div>
        </div>
    );
}
