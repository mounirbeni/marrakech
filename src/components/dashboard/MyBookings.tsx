"use client"

import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Calendar, MapPin, Clock, MoreVertical, Pencil, Trash2, XCircle, CheckCircle2, Ticket
} from "lucide-react"
import { format } from "date-fns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { EditBookingModal } from "@/components/bookings/EditBookingModal"
import { motion, AnimatePresence } from "framer-motion"

interface Booking {
    id: string
    activityTitle: string
    date: string
    status: string
    totalPrice: number
    guests: number
    pickupLocation?: string
    imageUrl?: string | null
    createdAt: string
    specialRequests?: string
}

export function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingBookingId, setEditingBookingId] = useState<string | null>(null)

    // View Details State
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

    const fetchBookings = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/my-bookings")
            const data = await res.json()
            if (Array.isArray(data)) {
                setBookings(data)
            }
        } catch (err) {
            console.error("Failed to fetch bookings", err)
            toast.error("Failed to load bookings")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchBookings()
    }, [fetchBookings])

    const handleEdit = (id: string) => {
        setEditingBookingId(id)
        setIsEditModalOpen(true)
    }

    const handleCancel = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error("Cancellation failed")

            toast.success("Booking cancelled successfully")
            fetchBookings() // Refresh list
        } catch (error) {
            console.error("Cancel error", error)
            toast.error("Failed to cancel booking")
        }
    }

    const upcomingBookings = bookings.filter(
        (b) => new Date(b.date) >= new Date() && b.status !== "CANCELLED"
    )
    const pastBookings = bookings.filter(
        (b) => new Date(b.date) < new Date() || b.status === "CANCELLED"
    )

    if (loading && bookings.length === 0) {
        return (
            <div className="flex bg-transparent h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Loading your adventures...</p>
                </div>
            </div>
        )
    }

    return (
        <Card className="h-full border-0 shadow-none bg-transparent">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">My Bookings</h2>
                    <p className="text-muted-foreground">Manage your upcoming trips and view past history</p>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-muted/50 rounded-xl w-fit backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'upcoming'
                            ? 'bg-background shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                            }`}
                    >
                        Upcoming ({upcomingBookings.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('past')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'past'
                            ? 'bg-background shadow-sm text-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                            }`}
                    >
                        Past / Cancelled
                    </button>
                </div>
            </div>

            <CardContent className="px-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 min-h-[300px]"
                    >
                        {activeTab === 'upcoming' ? (
                            upcomingBookings.length === 0 ? (
                                <EmptyState type="upcoming" />
                            ) : (
                                upcomingBookings.map((booking, index) => (
                                    <BookingItem
                                        key={booking.id}
                                        booking={booking}
                                        onEdit={handleEdit}
                                        onCancel={handleCancel}
                                        onView={() => setSelectedBooking(booking)}
                                        index={index}
                                    />
                                ))
                            )
                        ) : (
                            pastBookings.length === 0 ? (
                                <EmptyState type="past" />
                            ) : (
                                pastBookings.map((booking, index) => (
                                    <BookingItem
                                        key={booking.id}
                                        booking={booking}
                                        isPast
                                        onEdit={booking.status !== 'CANCELLED' && (new Date().getTime() - new Date(booking.createdAt).getTime() < 5 * 60 * 60 * 1000) ? handleEdit : undefined}
                                        onCancel={booking.status !== 'CANCELLED' && new Date(booking.date) > new Date() ? handleCancel : undefined}
                                        onView={() => setSelectedBooking(booking)}
                                        index={index}
                                    />
                                ))
                            )
                        )}
                    </motion.div>
                </AnimatePresence>

                <EditBookingModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    bookingId={editingBookingId}
                    onSuccess={fetchBookings}
                />

                {/* View Details Modal */}
                <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                    <DialogContent className="max-w-md md:max-w-xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Booking Details</DialogTitle>
                            <DialogDescription>
                                Reference ID: <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{selectedBooking?.id}</span>
                            </DialogDescription>
                        </DialogHeader>

                        {selectedBooking && (
                            <div className="grid gap-6 py-4">
                                <div className="space-y-4">
                                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted relative">
                                        {selectedBooking.imageUrl ? (
                                            <img src={selectedBooking.imageUrl} alt={selectedBooking.activityTitle} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                                <Calendar className="h-10 w-10 opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2">
                                            <StatusBadge status={selectedBooking.status} />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold">{selectedBooking.activityTitle}</h3>
                                        <div className="flex items-center text-muted-foreground mt-1">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {format(new Date(selectedBooking.date), "PPP")}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Guests</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-medium">{selectedBooking.guests} People</span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-muted/40 rounded-lg space-y-1">
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Price</div>
                                            <div className="text-lg font-bold text-primary">€{selectedBooking.totalPrice}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Pickup Location</div>
                                        <div className="flex items-start gap-2 p-3 border rounded-lg bg-card text-sm">
                                            <MapPin className="h-4 w-4 text-primary mt-0.5" />
                                            <span>{selectedBooking.pickupLocation || "Not specified"}</span>
                                        </div>
                                    </div>

                                    {selectedBooking.specialRequests && (
                                        <div className="space-y-2">
                                            <div className="text-sm font-medium">Special Requests</div>
                                            <p className="text-sm text-muted-foreground p-3 bg-muted/20 border rounded-lg italic">
                                                "{selectedBooking.specialRequests}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

function StatusBadge({ status }: { status: string }) {
    const styles = status === "CONFIRMED" ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" :
        status === "PENDING" ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800" :
            status === "UNPROCESSED" ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800" :
                "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";

    return (
        <Badge variant="outline" className={styles}>
            {status === 'UNPROCESSED' ? 'Awaiting Confirmation' : status}
        </Badge>
    );
}

function EmptyState({ type }: { type: 'upcoming' | 'past' }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-muted-foreground/20 rounded-2xl bg-muted/5">
            <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                {type === 'upcoming' ? <Ticket className="h-8 w-8 text-primary/50" /> : <Clock className="h-8 w-8 text-muted-foreground/50" />}
            </div>
            <h3 className="text-lg font-semibold mb-1">
                {type === 'upcoming' ? "No adventures planned yet" : "No past journeys"}
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-4">
                {type === 'upcoming'
                    ? "Your itinerary is empty. Transform your dream trip into reality today."
                    : "Your history of explorations will appear here once you complete a trip."}
            </p>
            {type === 'upcoming' && (
                <Button variant="outline">Explore Activities</Button>
            )}
        </div>
    )
}

function BookingItem({
    booking,
    onEdit,
    onCancel,
    onView,
    isPast,
    index
}: {
    booking: Booking,
    onEdit?: (id: string) => void,
    onCancel?: (id: string) => void,
    onView: () => void,
    isPast?: boolean,
    index: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="group relative border rounded-2xl p-5 flex flex-col md:flex-row items-stretch gap-6 bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300"
        >
            {/* Image Thumbnail */}
            <div className="relative h-48 w-full md:h-32 md:w-48 flex-shrink-0 rounded-xl overflow-hidden bg-muted shadow-sm">
                {booking.imageUrl ? (
                    <img
                        src={booking.imageUrl}
                        alt={booking.activityTitle}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/50">
                        <Calendar className="h-10 w-10 opacity-30" />
                    </div>
                )}
                <div className="absolute top-2 left-2 md:hidden">
                    <StatusBadge status={booking.status} />
                </div>
            </div>

            <div className="flex-grow flex flex-col justify-between py-1">
                <div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-xl leading-tight text-foreground/90 group-hover:text-primary transition-colors cursor-pointer" onClick={onView}>
                                {booking.activityTitle}
                            </h4>
                            <div className="hidden md:flex items-center gap-2 mt-2">
                                <StatusBadge status={booking.status} />
                            </div>
                        </div>

                        {/* Actions Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground hover:bg-muted">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={onView}>
                                    <Ticket className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                {onEdit && (
                                    <DropdownMenuItem onClick={() => onEdit(booking.id)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                    </DropdownMenuItem>
                                )}
                                {onCancel && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => onCancel(booking.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                            <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground mt-4">
                        <div className="flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-md">
                            <Calendar className="h-4 w-4 text-primary" />
                            {format(new Date(booking.date), "PPP")}
                        </div>
                        <div className="flex items-center gap-2 bg-muted/30 px-2 py-1 rounded-md">
                            <Clock className="h-4 w-4 text-primary" />
                            {booking.guests} Guests
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-4 md:mt-2">
                    {booking.pickupLocation ? (
                        <div className="text-sm text-muted-foreground flex items-center gap-1.5 max-w-[200px] md:max-w-xs">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground/70 flex-shrink-0" />
                            <span className="truncate">{booking.pickupLocation}</span>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total</span>
                        <span className="font-bold text-xl text-primary">€{booking.totalPrice}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
