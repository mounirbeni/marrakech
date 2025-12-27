
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Check, X, Eye, FileText, MoreHorizontal } from "lucide-react";
import Link from 'next/link';
import { BookingActions } from "@/components/admin/BookingActions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const dynamic = 'force-dynamic';

async function getBookings() {
    return await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });
}

export default async function AdminBookingsPage() {
    const bookings = await getBookings();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Bookings Management</h1>
                <Button>Download Report</Button>
            </div>

            <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-mono text-xs">{booking.id}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{booking.name}</div>
                                        <div className="text-xs text-muted-foreground">{booking.email}</div>
                                    </TableCell>
                                    <TableCell>{booking.activityTitle}</TableCell>
                                    <TableCell>{format(new Date(booking.date), "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            booking.status === 'CONFIRMED' ? 'default' :
                                                booking.status === 'CANCELLED' ? 'destructive' :
                                                    'secondary'
                                        }>
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>€{booking.totalPrice}</TableCell>
                                    <TableCell className="text-right">
                                        <BookingActions bookingId={booking.id} status={booking.status} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div >
        </div >
    );
}
