import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { id: bookingId } = await params;
        const body = await request.json();
        const { action } = body; // expect 'CANCEL'

        if (action !== 'CANCEL') {
            return new NextResponse('Invalid action', { status: 400 });
        }

        // Fetch booking to verify ownership and status
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            return new NextResponse('Booking not found', { status: 404 });
        }

        if (booking.userId !== session.id && booking.email !== session.email) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        // Business Logic: Can only cancel if date is in future (e.g., > 24h)
        const bookingDate = new Date(booking.date);
        const now = new Date();
        const hoursDifference = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (hoursDifference < 24) {
            return NextResponse.json(
                { error: 'Cancellation is only allowed up to 24 hours before the activity.' },
                { status: 400 }
            );
        }

        if (booking.status === 'CANCELLED') {
            return NextResponse.json(
                { error: 'Booking is already cancelled.' },
                { status: 400 }
            );
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: 'CANCELLED' }
        });

        // Create notification
        await prisma.notification.create({
            data: {
                userId: session.id,
                title: 'Booking Cancelled',
                message: `Your booking for ${booking.activityTitle} has been cancelled.`,
                type: 'WARNING'
            }
        });

        return NextResponse.json(updatedBooking);

    } catch (error) {
        console.error("Booking Action Error:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
