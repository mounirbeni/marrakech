import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
// import { v4 as uuidv4 } from 'uuid';
// Schema: id String @id. No default(uuid()). I need to generate it.
// Actually standard Prisma convention with UUID is often @default(uuid()).
// Let me re-read schema.
// Schema line 14: id String @id
// It does NOT have @default(uuid()). So I must provide it.

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            activityId,
            activityTitle,
            date,
            guests,
            totalPrice,
            pickupLocation,
            phone,
            name, // Optional fallback if not in session?
            email
        } = body;

        if (!activityId || !date || !guests || !totalPrice) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                id: crypto.randomUUID(), // Native node method
                userId: session.id,
                name: name || session.name || 'Unknown User',
                email: email || session.email,
                phone: phone || null,
                activityId,
                activityTitle,
                date: new Date(date),
                guests: parseInt(guests),
                totalPrice: parseFloat(totalPrice),
                pickupLocation: pickupLocation || null,
                status: 'UNPROCESSED' // Default status for new bookings
            }
        });

        return NextResponse.json({ success: true, bookingId: booking.id });

    } catch (error) {
        console.error('Booking creation error:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}
