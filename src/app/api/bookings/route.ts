import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { generateBookingId } from '@/lib/utils/id-generator';
// import { v4 as uuidv4 } from 'uuid';
// Schema: id String @id. No default(uuid()). I need to generate it.
// Actually standard Prisma convention with UUID is often @default(uuid()).
// Let me re-read schema.
// Schema line 14: id String @id
// It does NOT have @default(uuid()). So I must provide it.

// GET: Fetch all bookings (Admin only)
export async function GET(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Only admins can fetch all bookings
        if (session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const bookings = await prisma.booking.findMany({
            include: {
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        
        const body = await request.json();
        const {
            activityId,
            activityTitle,
            date,
            guests,
            totalPrice,
            pickupLocation,
            phone,
            name,
            email
        } = body;

        if (!activityId || !date || !guests || !totalPrice) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Validate activityId is a string
        if (typeof activityId !== 'string') {
            return NextResponse.json({ error: 'Invalid activity ID' }, { status: 400 });
        }

        // Validate email is provided (required for all bookings)
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                id: generateBookingId(), // Short booking ID
                userId: session?.id || null, // Use session ID if available, otherwise null
                name: name || session?.name || email.split('@')[0] || 'Valued Customer',
                email: email || session?.email || '',
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

        // Create Admin Notification
        try {
            await prisma.notification.create({
                data: {
                    type: 'BOOKING',
                    title: 'New Booking',
                    message: `New booking received from ${booking.name} for ${booking.activityTitle}`,
                    link: '/admin/bookings',
                    read: false
                }
            });
        } catch (notifError) {
            console.error('Failed to create notification:', notifError);
            // Don't fail the request if notification creation fails
        }

        return NextResponse.json({ success: true, booking: booking });

    } catch (error) {
        console.error('Booking creation error:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}