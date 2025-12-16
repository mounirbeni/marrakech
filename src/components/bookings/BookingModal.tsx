"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    serviceTitle: string
    servicePrice: number
    serviceId: string
    onBookingSuccess: () => void
}

export function BookingModal({
    isOpen,
    onClose,
    serviceTitle,
    servicePrice,
    serviceId,
    onBookingSuccess,
}: BookingModalProps) {
    const [date, setDate] = useState<Date>()
    const [guests, setGuests] = useState(1)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const totalPrice = servicePrice * guests

    const handleBooking = async () => {
        if (!date) {
            setError("Please select a date")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    activityId: serviceId,
                    activityTitle: serviceTitle,
                    date: date.toISOString(),
                    guests,
                    totalPrice,
                    phone,
                    name
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to book")
            }

            onBookingSuccess()
            onClose()
        } catch (err: any) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Experience</DialogTitle>
                    <DialogDescription>
                        {serviceTitle}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Date Picker */}
                    <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Guests */}
                    <div className="grid gap-2">
                        <Label>Guests</Label>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <Input
                                type="number"
                                min={1}
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                            />
                        </div>
                    </div>

                    {/* Contact Info (Simple) */}
                    <div className="grid gap-2">
                        <Label>Full Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name for reservation"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Phone (Optional)</Label>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 234 567 890"
                        />
                    </div>

                    {/* Summary */}
                    <div className="bg-muted/50 p-4 rounded-lg mt-2">
                        <div className="flex justify-between font-medium">
                            <span>Total Price</span>
                            <span className="text-primary text-lg">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                    )}

                </div>
                <DialogFooter>
                    <Button disabled={loading} onClick={handleBooking} className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Confirm Booking
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
