'use client'

import { useState, useTransition } from 'react'
import { Booking } from '@prisma/client'
import { confirmBooking, deleteBooking } from '@/app/actions/booking-actions'
import { toast } from 'sonner'
import { format } from 'date-fns'
import {
    Search,
    Calendar,
    CheckCircle,
    Trash2,
    ArrowUpDown,
    Phone,
    Mail,
    Users
} from 'lucide-react'

interface BookingsClientProps {
    initialBookings: Booking[]
}

export default function BookingsClient({ initialBookings }: BookingsClientProps) {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
    const [isPending, startTransition] = useTransition()

    // Filter and Sort
    const filteredBookings = bookings
        .filter((booking) => {
            const query = searchQuery.toLowerCase()
            return (
                booking.name.toLowerCase().includes(query) ||
                booking.email.toLowerCase().includes(query) ||
                booking.activityTitle.toLowerCase().includes(query)
            )
        })
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime()
            const dateB = new Date(b.date).getTime()
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })

    const handleConfirm = async (id: string) => {
        startTransition(async () => {
            const result = await confirmBooking(id)
            if (result.success) {
                toast.success('Booking confirmed successfully')
                // Optimistic update (or rely on revalidatePath from server action which might need router.refresh() if not automatic)
                // Since we are using state for display, we should update state or rely on router.refresh().
                // revalidatePath in server action updates the server data, but client state might need manual update or router.refresh()
                // For simplicity and speed, I'll update local state too.
                setBookings((prev) =>
                    prev.map((b) => b.id === id ? { ...b, status: 'CONFIRMED' } : b)
                )
            } else {
                toast.error('Failed to confirm booking')
            }
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return

        startTransition(async () => {
            const result = await deleteBooking(id)
            if (result.success) {
                toast.success('Booking deleted successfully')
                setBookings((prev) => prev.filter((b) => b.id !== id))
            } else {
                toast.error('Failed to delete booking')
            }
        })
    }

    const toggleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or activity..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button
                    onClick={toggleSort}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <ArrowUpDown className="h-4 w-4" />
                    Sort by Date ({sortOrder === 'asc' ? 'Oldest' : 'Newest'})
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-900">Guest</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Contact</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Activity</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Date & Guests</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No bookings found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{booking.name}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">ID: {booking.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail className="h-3.5 w-3.5" />
                                                {booking.email}
                                            </div>
                                            {booking.phone && (
                                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    {booking.phone}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{booking.activityTitle}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {format(new Date(booking.date), 'MMM d, yyyy')}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                                                <Users className="h-3.5 w-3.5" />
                                                {booking.guests} guest{booking.guests !== 1 && 's'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ${booking.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'CONFIRMED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : booking.status === 'CANCELLED'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {booking.status !== 'CONFIRMED' && (
                                                    <button
                                                        onClick={() => handleConfirm(booking.id)}
                                                        disabled={isPending}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                                        title="Confirm Booking"
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    disabled={isPending}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Delete Booking"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
