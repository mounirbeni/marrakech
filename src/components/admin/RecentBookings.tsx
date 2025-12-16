import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Booking } from "@/types/admin"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface RecentBookingsProps {
    bookings: Booking[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                    You have {bookings.length} total bookings this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                            <div className="ml-auto font-medium flex flex-col items-end gap-1">
                                <div className="text-sm font-bold">€{booking.totalPrice}</div>
                                <Badge variant={
                                    booking.status === 'CONFIRMED' ? 'default' :
                                        booking.status === 'CANCELLED' ? 'destructive' :
                                            'secondary'
                                } className="text-[10px] px-1.5 py-0 h-5">
                                    {booking.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                    {bookings.length === 0 && (
                        <div className="text-center text-sm text-muted-foreground py-4">
                            No recent bookings found.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
