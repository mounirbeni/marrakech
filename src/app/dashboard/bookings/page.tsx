"use client";

import { MyBookings } from "@/components/dashboard/MyBookings";

export default function BookingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                <p className="text-muted-foreground">
                    View and manage your upcoming and past adventures.
                </p>
            </div>

            <MyBookings />
        </div>
    );
}
