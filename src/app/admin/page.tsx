
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, MapPin, MessageSquare, Info } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface Booking {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    phone?: string;
    activityTitle: string;
    date: string;
    guests: number;
    totalPrice: number;
    status: string;
    pickupLocation?: string;
    flightNumber?: string;
    language?: string;
    dietary?: string;
    specialRequests?: string;
    packageName?: string;
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Fetch bookings
        fetch('/api/bookings')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch bookings", err);
                setIsLoading(false);
            });

        // Fetch unread count and set up polling
        const fetchUnread = () => {
            fetch('/api/admin/conversations')
                .then(res => res.json())
                .then(data => {
                    // Check if data is an array before using reduce
                    if (Array.isArray(data)) {
                        const total = data.reduce((sum: number, conv: any) => sum + (conv.unreadCount || 0), 0);
                        setUnreadCount(total);
                    } else {
                        setUnreadCount(0);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setUnreadCount(0);
                });
        };

        fetchUnread(); // Initial fetch
        const interval = setInterval(fetchUnread, 5000); // Poll every 5s
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) throw new Error("Failed to update status");

            toast.success(`Booking marked as ${newStatus}`);

            // Update local state
            setBookings(prev => prev.map(b =>
                b.id === id ? { ...b, status: newStatus } : b
            ));

            // Update selected booking if open
            if (selectedBooking && selectedBooking.id === id) {
                setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (error) {
            toast.error("Failed to update booking status");
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage bookings and client communications</p>
                </div>
                <Button onClick={() => window.location.href = '/admin/messages'} className="gap-2 relative">
                    <MessageSquare className="w-4 h-4" />
                    Support Messages
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600">
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Booking Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date Booked</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Activity</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Guests</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Location/Flight</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center h-24">
                                            No bookings found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    bookings.map((booking) => (
                                        <TableRow
                                            key={booking.id}
                                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            <TableCell className="font-medium">
                                                {format(new Date(booking.createdAt), "MMM d, HH:mm")}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{booking.name}</span>
                                                    <span className="text-xs text-muted-foreground">{booking.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{booking.activityTitle}</TableCell>
                                            <TableCell>
                                                {format(new Date(booking.date), "MMM d, yyyy")}
                                            </TableCell>
                                            <TableCell>{booking.guests}</TableCell>
                                            <TableCell>€{booking.totalPrice}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    {booking.pickupLocation && (
                                                        <span className="text-xs bg-secondary px-2 py-0.5 rounded truncate max-w-[120px]">
                                                            {booking.pickupLocation}
                                                        </span>
                                                    )}
                                                    {booking.flightNumber && (
                                                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                                                            ✈ {booking.flightNumber}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={
                                                    booking.status === 'CONFIRMED' ? 'bg-green-500 hover:bg-green-600' :
                                                        booking.status === 'CANCELLED' ? 'bg-red-500 hover:bg-red-600' :
                                                            booking.status === 'COMPLETED' ? 'bg-orange-500 hover:bg-orange-600' :
                                                                'bg-yellow-500 hover:bg-yellow-600' // PENDING
                                                }>
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden flex flex-col">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                            Booking Details
                            {selectedBooking && selectedBooking.status && (
                                <Badge className={
                                    selectedBooking.status === 'CONFIRMED' ? 'bg-green-500 hover:bg-green-600' :
                                        selectedBooking.status === 'CANCELLED' ? 'bg-red-500 hover:bg-red-600' :
                                            selectedBooking.status === 'COMPLETED' ? 'bg-orange-500 hover:bg-orange-600' :
                                                'bg-yellow-500 hover:bg-yellow-600'
                                }>
                                    {selectedBooking.status}
                                </Badge>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            ID: {selectedBooking?.id} • Booked on {selectedBooking && format(new Date(selectedBooking.createdAt), "PPP p")}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6">
                            <div className="space-y-6 pt-4">
                                {/* Activity Info */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        <Info className="w-4 h-4" /> Activity Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 bg-secondary/20 p-4 rounded-xl">
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Activity</span>
                                            <span className="font-semibold">{selectedBooking.activityTitle}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Package</span>
                                            <span className="font-medium">{selectedBooking.packageName || "Standard"}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Date</span>
                                            <span className="font-medium">{format(new Date(selectedBooking.date), "PPP")}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Guests</span>
                                            <span className="font-medium">{selectedBooking.guests} People</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Customer Info */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        <User className="w-4 h-4" /> Guest Details
                                    </h3>
                                    <div className="bg-card border rounded-xl p-4 space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-xs text-muted-foreground block">Full Name</span>
                                                <span className="font-semibold">{selectedBooking.name}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground block">Email</span>
                                                <span className="font-medium">{selectedBooking.email}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground block">Phone</span>
                                                <span className="font-medium font-mono">{selectedBooking.phone || "N/A"}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-muted-foreground block">Language</span>
                                                <span className="font-medium">{selectedBooking.language || "English"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Logistics */}
                                {(selectedBooking.pickupLocation || selectedBooking.flightNumber) && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> Logistics
                                        </h3>
                                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 space-y-2">
                                            {selectedBooking.pickupLocation && (
                                                <div className="flex gap-2">
                                                    <span className="text-sm font-medium min-w-[100px] text-muted-foreground">Pick-up:</span>
                                                    <span className="text-sm">{selectedBooking.pickupLocation}</span>
                                                </div>
                                            )}
                                            {selectedBooking.flightNumber && (
                                                <div className="flex gap-2">
                                                    <span className="text-sm font-medium min-w-[100px] text-muted-foreground">Flight No:</span>
                                                    <span className="text-sm font-mono bg-background px-1.5 rounded border">{selectedBooking.flightNumber}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Special Requests */}
                                {(selectedBooking.specialRequests || selectedBooking.dietary) && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" /> Preferences & Notes
                                        </h3>
                                        <div className="grid gap-3">
                                            {selectedBooking.dietary && (
                                                <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-3 rounded-lg">
                                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block mb-1">Dietary Requirements</span>
                                                    <p className="text-sm">{selectedBooking.dietary}</p>
                                                </div>
                                            )}
                                            {selectedBooking.specialRequests && (
                                                <div className="bg-muted p-3 rounded-lg">
                                                    <span className="text-xs font-bold text-muted-foreground block mb-1">Special Requests</span>
                                                    <p className="text-sm italic">"{selectedBooking.specialRequests}"</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Separator />

                                <div className="flex justify-between items-center bg-secondary/50 p-4 rounded-xl">
                                    <span className="font-semibold text-lg">Total Amount</span>
                                    <span className="font-bold text-2xl text-primary">€{selectedBooking.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="p-6 pt-2 gap-2 sm:justify-between">
                        {selectedBooking && selectedBooking.status !== 'CANCELLED' && (
                            <div className="flex gap-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleUpdateStatus(selectedBooking.id, 'CANCELLED')}
                                >
                                    Cancel Booking
                                </Button>
                            </div>
                        )}
                        <div className="flex gap-2 justify-end flex-1">
                            {selectedBooking && selectedBooking.status === 'PENDING' && (
                                <Button
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleUpdateStatus(selectedBooking.id, 'CONFIRMED')}
                                >
                                    Confirm Booking
                                </Button>
                            )}
                            {selectedBooking && selectedBooking.status === 'CONFIRMED' && (
                                <Button
                                    variant="secondary"
                                    onClick={() => handleUpdateStatus(selectedBooking.id, 'COMPLETED')}
                                >
                                    Mark as Completed
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
