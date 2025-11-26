'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { format } from 'date-fns'
import { Mail, Trash2, CheckCircle, XCircle, Filter, Search, MoreHorizontal, Calendar as CalendarIcon, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Booking } from "@/types/admin"
import { toast } from "sonner"

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
}

export default function BookingsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [date, setDate] = useState<Date>()

    const { data: bookings, error, isLoading } = useSWR<Booking[]>('/api/admin/bookings', fetcher)

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await fetch('/api/admin/bookings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            })

            if (!res.ok) throw new Error('Failed to update status')

            mutate('/api/admin/bookings')
            toast.success(`Booking status updated to ${newStatus}`)
        } catch (error) {
            toast.error('Failed to update booking status')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return

        try {
            const res = await fetch(`/api/admin/bookings?id=${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete booking')

            mutate('/api/admin/bookings')
            toast.success('Booking deleted successfully')
        } catch (error) {
            toast.error('Failed to delete booking')
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED':
                return 'bg-green-500 hover:bg-green-600'
            case 'CANCELLED':
                return 'bg-red-500 hover:bg-red-600'
            default:
                return 'bg-yellow-500 hover:bg-yellow-600'
        }
    }

    // Client-side filtering
    const filteredBookings = bookings?.filter((booking) => {
        let matchesSearch = true
        let matchesDate = true

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            matchesSearch = (
                booking.name.toLowerCase().includes(query) ||
                booking.email.toLowerCase().includes(query) ||
                booking.activityTitle.toLowerCase().includes(query)
            )
        }

        if (date) {
            const bookingDate = new Date(booking.date)
            matchesDate =
                bookingDate.getDate() === date.getDate() &&
                bookingDate.getMonth() === date.getMonth() &&
                bookingDate.getFullYear() === date.getFullYear()
        }

        if (statusFilter !== 'ALL') {
            if (booking.status !== statusFilter) return false
        }

        return matchesSearch && matchesDate
    })

    if (error) return <div>Failed to load bookings</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
                    <p className="text-muted-foreground">
                        Manage your bookings and reservations here.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>
                        A list of all bookings including pending, confirmed, and cancelled.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 flex-1 w-full md:max-w-sm">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search bookings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full md:w-[240px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <SelectValue placeholder="Filter by status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Statuses</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            {(date || searchQuery || statusFilter !== 'ALL') && (
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setDate(undefined)
                                        setSearchQuery('')
                                        setStatusFilter('ALL')
                                    }}
                                    className="h-8 px-2 lg:px-3"
                                >
                                    Reset
                                    <XCircle className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings?.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>
                                            <div className="font-medium">{booking.name}</div>
                                            <div className="text-sm text-muted-foreground">{booking.email}</div>
                                            <div className="text-sm text-muted-foreground">{booking.phone}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{booking.activityTitle}</div>
                                            <div className="text-sm text-muted-foreground">{booking.guests} guests</div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(booking.date), 'PPP')}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(booking.status)}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => window.open(`mailto:${booking.email}`, '_blank')}
                                                    title="Send Email"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                </Button>
                                                {booking.phone && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                                                        onClick={() => {
                                                            const phone = booking.phone?.replace(/\D/g, '')
                                                            window.open(`https://wa.me/${phone}`, '_blank')
                                                        }}
                                                        title="Open WhatsApp"
                                                    >
                                                        <MessageCircle className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        {booking.status !== 'CONFIRMED' && (
                                                            <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}>
                                                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                                                Confirm Booking
                                                            </DropdownMenuItem>
                                                        )}
                                                        {booking.status !== 'CANCELLED' && (
                                                            <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}>
                                                                <XCircle className="mr-2 h-4 w-4 text-orange-600" />
                                                                Cancel Booking
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleDelete(booking.id)} className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete Booking
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredBookings?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No bookings found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
