'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { format } from 'date-fns'
import { Mail, Trash2, CheckCircle, XCircle, Filter, Search, MoreHorizontal, Calendar as CalendarIcon, MessageCircle, Download, LayoutList, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookingKanban } from '@/components/admin/bookings/BookingKanban'
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
}

export default function BookingsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [date, setDate] = useState<Date>()
    const [viewMode, setViewMode] = useState<'LIST' | 'BOARD'>('LIST')
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

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
            case 'UNPROCESSED':
                return 'bg-blue-500 hover:bg-blue-600'
            default:
                return 'bg-yellow-500 hover:bg-yellow-600'
        }
    }

    const handleExport = () => {
        if (!filteredBookings || filteredBookings.length === 0) {
            toast.error("No bookings to export");
            return;
        }

        const headers = ["ID", "Name", "Email", "Phone", "Activity", "Date", "Guests", "Status", "Total Price"];
        const csvContent = [
            headers.join(","),
            ...filteredBookings.map(b => [
                b.id,
                `"${b.name}"`,
                b.email,
                b.phone || "",
                `"${b.activityTitle}"`,
                format(new Date(b.date), 'yyyy-MM-dd'),
                b.guests,
                b.status,
                b.totalPrice
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `bookings_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Export started");
    };

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

    // ... (existing code, ensure to integrate this)

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {/* Same header... */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Bookings</h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Manage your bookings and reservations here.
                    </p>
                </div>
                <Button onClick={handleExport} variant="outline" className="gap-2 w-full md:w-auto">
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            <Card>
                {/* Same card header... */}
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>
                        A list of all bookings including pending, confirmed, and cancelled.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Filters ... */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 flex-1 w-full">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search bookings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-8 text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <div className="flex items-center bg-muted p-1 rounded-lg border">
                                <Button
                                    variant={viewMode === 'LIST' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('LIST')}
                                    className="h-8 px-3 text-xs md:text-sm"
                                >
                                    <LayoutList className="h-4 w-4 mr-1 md:mr-2" /> List
                                </Button>
                                <Button
                                    variant={viewMode === 'BOARD' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('BOARD')}
                                    className="h-8 px-3 text-xs md:text-sm"
                                >
                                    <LayoutGrid className="h-4 w-4 mr-1 md:mr-2" /> Board
                                </Button>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        size="sm"
                                        className={cn(
                                            "w-full md:w-[180px] justify-start text-left font-normal text-sm",
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
                                <SelectTrigger className="w-full md:w-[150px] text-sm">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <SelectValue placeholder="Status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Statuses</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="UNPROCESSED">Awaiting</SelectItem>
                                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            {(date || searchQuery || statusFilter !== 'ALL') && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setDate(undefined)
                                        setSearchQuery('')
                                        setStatusFilter('ALL')
                                    }}
                                    className="h-8 px-2 lg:px-3 text-sm"
                                >
                                    Reset
                                    <XCircle className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {viewMode === 'BOARD' ? (
                        <div className="h-[600px] overflow-hidden">
                            <BookingKanban
                                bookings={filteredBookings || []}
                                onStatusUpdate={handleStatusUpdate}
                            />
                        </div>
                    ) : (
                        <div className="rounded-md border overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="whitespace-nowrap">Customer</TableHead>
                                        <TableHead className="whitespace-nowrap">Service</TableHead>
                                        <TableHead className="whitespace-nowrap">Date</TableHead>
                                        <TableHead className="whitespace-nowrap">Status</TableHead>
                                        <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBookings?.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="max-w-[150px] md:max-w-xs">
                                                <div className="font-medium truncate">{booking.name}</div>
                                                <div className="text-sm text-muted-foreground truncate">{booking.email}</div>
                                                <div className="text-sm text-muted-foreground truncate">{booking.phone}</div>
                                            </TableCell>
                                            <TableCell className="max-w-[150px] md:max-w-xs">
                                                <div className="font-medium truncate">{booking.activityTitle}</div>
                                                <div className="text-sm text-muted-foreground">{booking.guests} guests</div>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                <div className="text-sm md:text-base">
                                                    {format(new Date(booking.date), 'PPP')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(booking.status)}>
                                                    <span className="hidden md:inline">
                                                        {booking.status === 'UNPROCESSED' ? 'Awaiting Confirmation' : booking.status}
                                                    </span>
                                                    <span className="md:hidden">
                                                        {booking.status.charAt(0) + booking.status.slice(1).toLowerCase().substring(1, 4)}
                                                    </span>
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1 md:gap-2">
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
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedBooking(booking)
                                                                setIsDetailsOpen(true)
                                                            }}>
                                                                View Details
                                                            </DropdownMenuItem>
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
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-[95vw] md:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg md:text-xl">Booking Details</DialogTitle>
                        <DialogDescription>Full details for booking #{selectedBooking?.id}</DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="grid gap-3 md:gap-4 py-2 md:py-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Customer</Label>
                                    <div className="font-medium text-sm md:text-base">{selectedBooking.name}</div>
                                    <div className="text-xs md:text-sm">{selectedBooking.email}</div>
                                    <div className="text-xs md:text-sm">{selectedBooking.phone}</div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Status</Label>
                                    <div>
                                        <Badge className={getStatusColor(selectedBooking.status)}>
                                            {selectedBooking.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label className="text-muted-foreground text-xs md:text-sm">Activity</Label>
                                <div className="font-medium text-base md:text-lg">{selectedBooking.activityTitle}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Date & Time</Label>
                                    <div className="text-sm md:text-base">{format(new Date(selectedBooking.date), 'PPP p')}</div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Guests</Label>
                                    <div className="text-sm md:text-base">{selectedBooking.guests} people</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Total Price</Label>
                                    <div className="font-bold text-sm md:text-base">€{selectedBooking.totalPrice}</div>
                                </div>
                            </div>
                            {selectedBooking.pickupLocation && (
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Pickup Location</Label>
                                    <div className="text-sm md:text-base">{selectedBooking.pickupLocation}</div>
                                </div>
                            )}
                            {selectedBooking.flightNumber && (
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Flight Number</Label>
                                    <div className="text-sm md:text-base">{selectedBooking.flightNumber}</div>
                                </div>
                            )}
                            {selectedBooking.specialRequests && (
                                <div>
                                    <Label className="text-muted-foreground text-xs md:text-sm">Special Requests</Label>
                                    <div className="text-xs md:text-sm">{selectedBooking.specialRequests}</div>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
