
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CreditCard, TrendingUp, Users } from "lucide-react";
import prisma from "@/lib/prisma";

async function getStats() {
    // Basic stats fetching
    const [bookingsCount, usersCount, servicesCount] = await Promise.all([
        prisma.booking.count(),
        prisma.user.count(),
        prisma.service.count()
    ]);

    // Calculate total revenue (very basic)
    const bookings = await prisma.booking.findMany({
        select: { totalPrice: true }
    });
    const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

    return { bookingsCount, usersCount, servicesCount, totalRevenue };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your platform performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Revenue" value={`€${stats.totalRevenue.toLocaleString()}`} icon={CreditCard} description="+20.1% from last month" />
                <StatsCard title="Bookings" value={stats.bookingsCount.toString()} icon={CalendarDays} description="+15 since last week" />
                <StatsCard title="Active Users" value={stats.usersCount.toString()} icon={Users} description="+10 new signups" />
                <StatsCard title="Active Experiences" value={stats.servicesCount.toString()} icon={TrendingUp} description="Currently listed" />
            </div>

            {/* Recent Bookings Table placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">No recent sales data yet.</div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">System logs will appear here.</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, description }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
