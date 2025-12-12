
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

import { getSession } from '@/lib/auth';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];

        if (!status || !validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        // Fetch existing booking to check ownership/status
        const booking = await prisma.booking.findUnique({ where: { id } });
        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Authorization Logic
        if (session.role !== 'ADMIN') {
            // Client Logic
            // 1. Must own the booking
            if ((booking as any).userId !== session.id && booking.email !== session.email) {
                return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
            }
            // 2. Can only Cancel
            if (status !== 'CANCELLED') {
                return NextResponse.json({ error: 'Clients can only cancel bookings' }, { status: 403 });
            }
            // 3. Can only Cancel if PENDING
            if (booking.status !== 'PENDING') {
                return NextResponse.json({ error: 'Cannot cancel processed booking' }, { status: 400 });
            }
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            { error: 'Failed to update booking' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.booking.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting booking:', error);
        return NextResponse.json(
            { error: 'Failed to delete booking' },
            { status: 500 }
        );
    }
}
