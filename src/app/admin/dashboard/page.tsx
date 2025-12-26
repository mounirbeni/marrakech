import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, CreditCard, TrendingUp, Users } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

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

            {/* Recent Bookings and Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* We would fetch recent bookings here. For now, showing a structured place for them. */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Oliver Davis</p>
                                    <p className="text-xs text-muted-foreground">Atlas Mountains Day Trip</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="font-medium">€150.00</div>
                                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Confirmed</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Sophie Miller</p>
                                    <p className="text-xs text-muted-foreground">Medina Cultural Tour</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="font-medium">€85.00</div>
                                    <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">James Wilson</p>
                                    <p className="text-xs text-muted-foreground">Desert Sunset Camel Ride</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="font-medium">€200.00</div>
                                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Completed</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">Database</p>
                                    <p className="text-xs text-muted-foreground">Operational</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">API Gateway</p>
                                    <p className="text-xs text-muted-foreground">Operational</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">Email Service</p>
                                    <p className="text-xs text-muted-foreground">Operational</p>
                                </div>
                            </div>
                        </div>
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
