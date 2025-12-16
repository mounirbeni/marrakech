'use client';

import { useEffect, useState } from "react";
import { StatsCards } from "@/components/admin/dashboard/StatsCards";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { UrgentTasks } from "@/components/admin/dashboard/UrgentTasks";
import { GeographicStats } from "@/components/admin/dashboard/GeographicStats";
import { EngagementIndex } from "@/components/admin/dashboard/EngagementIndex";
import { Booking } from "@/types/admin";
import { CalendarDateRangePicker } from "@/components/admin/dashboard/CalendarDateRangePicker";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { TopService, UrgentStats } from "@/lib/admin-logic";

interface DashboardData {
    stats: any;
    alerts: any[];
    urgentStats: UrgentStats;
    topServices: TopService[];
}

export default function AdminDashboardPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsRes, dashboardRes] = await Promise.all([
                    fetch('/api/bookings'),
                    fetch('/api/admin/dashboard')
                ]);

                if (bookingsRes.ok) {
                    setBookings(await bookingsRes.json());
                }
                if (dashboardRes.ok) {
                    setDashboardData(await dashboardRes.json());
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate stats client-side or use server-side (using client for now for consistency with legacy)
    const totalRevenue = bookings.reduce((sum, b) => b.status !== 'CANCELLED' ? sum + (b.totalPrice || 0) : sum, 0);
    const totalBookings = bookings.length;
    // Mock active users for now
    const activeUsers = 124;
    const growth = 12.5;

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Overview of your bookings and performance.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
            </div>

            <StatsCards
                totalRevenue={totalRevenue}
                totalBookings={totalBookings}
                activeUsers={activeUsers}
                growth={growth}
            />

            <div className="grid grid-cols-12 gap-6">
                <UrgentTasks stats={dashboardData?.urgentStats} />
                <div className="col-span-12 lg:col-span-9">
                    <RevenueChart />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <GeographicStats bookings={bookings} />
                <EngagementIndex topServices={dashboardData?.topServices} />
                <RecentBookings bookings={bookings} />
            </div>
        </div>
    );
}
