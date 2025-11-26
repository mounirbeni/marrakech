import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Booking } from "@/types/admin"

interface RecentBookingsProps {
    bookings: Booking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    if (bookings.length === 0) {
        return <div className="text-sm text-muted-foreground">No recent bookings.</div>
    }

    return (
        <div className="space-y-8">
            {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{booking.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{booking.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {booking.email}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">
                        {booking.status === 'CONFIRMED' ? (
                            <span className="text-green-600">Confirmed</span>
                        ) : booking.status === 'CANCELLED' ? (
                            <span className="text-red-600">Cancelled</span>
                        ) : (
                            <span className="text-yellow-600">Pending</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
