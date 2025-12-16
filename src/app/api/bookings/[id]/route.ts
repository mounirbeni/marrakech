import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET: Fetch single booking for editing
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: params.id },
            include: { user: true }
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Security: Ensure owner or Admin
        if (booking.userId !== session.id && session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("GET Booking Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH: Update booking details
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: params.id },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Security: Ensure owner
        if (booking.userId !== session.id && session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (booking.status === 'CANCELLED') {
            return NextResponse.json({ error: 'Cannot edit a cancelled booking' }, { status: 400 });
        }

        // 5-Hour Modification Window enforced for Clients
        if (session.role !== 'ADMIN') {
            const bookingTime = new Date(booking.createdAt).getTime();
            const now = Date.now();
            const hoursSinceBooking = (now - bookingTime) / (1000 * 60 * 60);

            if (hoursSinceBooking > 5) {
                return NextResponse.json({
                    error: 'Modification window expired (5 hours limit)'
                }, { status: 403 });
            }
        }

        const body = await request.json();

        // Handle explicit status change requests (e.g. from Admin or Cancellation)
        // If the body is JUST status='CANCELLED', allow it.
        if (body.status === 'CANCELLED') {
            const updatedBooking = await prisma.booking.update({
                where: { id: params.id },
                data: { status: 'CANCELLED' },
            });
            return NextResponse.json(updatedBooking);
        }

        // Regular Booking Updates
        const { date, guests, pickupLocation, specialRequests, contactPhone } = body;
        const updateData: any = {};

        if (date) updateData.date = new Date(date);
        if (guests) updateData.guests = parseInt(guests);
        if (pickupLocation !== undefined) updateData.pickupLocation = pickupLocation;
        if (specialRequests !== undefined) updateData.specialRequests = specialRequests;
        if (contactPhone !== undefined) updateData.phone = contactPhone;

        // Simple price scaling if guests change
        if (guests && guests !== booking.guests && booking.guests > 0) {
            const pricePerHead = booking.totalPrice / booking.guests;
            updateData.totalPrice = pricePerHead * guests;
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: params.id },
            data: updateData,
        });

        return NextResponse.json(updatedBooking);

    } catch (error) {
        console.error("PATCH Booking Error:", error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

// DELETE: Cancel booking (Soft delete / Status update)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: params.id },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.userId !== session.id && session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: params.id },
            data: { status: 'CANCELLED' },
        });

        return NextResponse.json(updatedBooking);

    } catch (error) {
        console.error("DELETE Booking Error:", error);
        return NextResponse.json({ error: 'Cancellation failed' }, { status: 500 });
    }
}
