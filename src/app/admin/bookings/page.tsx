
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
import { Check, X, Eye } from "lucide-react";
import Link from 'next/link';

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
                                        <div className="flex justify-end gap-2">
                                            {/* In a real app, these would wrap server actions or API calls */}
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
