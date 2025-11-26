'use client'

import useSWR from 'swr'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, DollarSign, Package, Activity } from 'lucide-react'
import { Overview } from '@/components/admin/Overview'
import { RecentBookings } from '@/components/admin/RecentBookings'
import { format, subDays } from 'date-fns'
import { Booking, Service } from '@/types/admin'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const text = await res.text()
    try {
        return JSON.parse(text)
    } catch (e) {
        console.error(`JSON Parse Error for ${url}:`, text)
        throw e
    }
}

export default function AdminDashboardPage() {
    const { data: bookings, error: bookingsError } = useSWR<Booking[]>('/api/bookings', fetcher)
    const { data: services, error: servicesError } = useSWR<Service[]>('/api/services', fetcher)

    if (bookingsError || servicesError) return <div>Failed to load dashboard data</div>
    if (!bookings || !services) return <div>Loading dashboard...</div>

    // Calculate Stats
    const totalBookings = bookings.length
    const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED').length
    const totalRevenue = bookings
        .filter((b) => b.status === 'CONFIRMED')
        .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)
    const activeServices = services.length

    // Prepare Chart Data (Last 7 days)
    const chartData = Array.from({ length: 7 }).map((_, i) => {
        const date = subDays(new Date(), 6 - i)
        const dateStr = format(date, 'yyyy-MM-dd')
        const dayRevenue = bookings
            .filter((b) =>
                format(new Date(b.date), 'yyyy-MM-dd') === dateStr &&
                b.status === 'CONFIRMED'
            )
            .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)

        return {
            name: format(date, 'MMM dd'),
            total: dayRevenue,
        }
    })

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            From confirmed bookings
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Bookings
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{totalBookings}</div>
                        <p className="text-xs text-muted-foreground">
                            {confirmedBookings} confirmed
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeServices}</div>
                        <p className="text-xs text-muted-foreground">
                            Available for booking
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Bookings
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {bookings.filter((b) => b.status === 'PENDING').length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Requires action
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={chartData} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                        <CardDescription>
                            You made {bookings.filter((b) => new Date(b.date) > subDays(new Date(), 30)).length} bookings this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentBookings bookings={bookings} />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Most Booked Services</CardTitle>
                        <CardDescription>
                            Top performing services by booking count.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {services
                                .map(service => ({
                                    ...service,
                                    bookingCount: bookings.filter(b => b.activityTitle === service.title).length
                                }))
                                .sort((a, b) => b.bookingCount - a.bookingCount)
                                .slice(0, 5)
                                .map(service => (
                                    <div key={service.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{service.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {service.category}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            {service.bookingCount} bookings
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Customer Activity</CardTitle>
                        <CardDescription>
                            Recent actions by your customers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {bookings.slice(0, 5).map((booking, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {booking.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.status === 'CONFIRMED' ? 'Confirmed booking for' : 'Created booking for'} {booking.activityTitle}
                                        </p>
                                    </div>
                                    <div className="ml-auto text-xs text-muted-foreground">
                                        {format(new Date(booking.date), 'MMM dd')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
