
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Booking } from '@prisma/client';

// Helper to generate short readable IDs (e.g., "BK-X7Y2Z")
function generateBookingId() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Removed confusing chars (0, O, 1, I)
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result; // Result: "X7Y2Z9"
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic Validation
        if (!body.contact?.name || !body.contact?.email || !body.activityId || !body.date) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const booking = await prisma.booking.create({
            data: {
                id: generateBookingId(),
                name: body.contact.name,
                email: body.contact.email,
                phone: body.contact.phone,
                activityId: body.activityId,
                activityTitle: body.activityTitle,
                date: new Date(body.date),
                guests: body.guests,
                totalPrice: body.totalPrice,
                packageName: body.package,

                pickupLocation: body.logistics.pickupLocation,
                flightNumber: body.logistics.flightNumber,

                language: body.preferences.language,
                dietary: body.preferences.dietary,
                specialRequests: body.preferences.specialRequests,

                status: 'PENDING'
            }
        });

        return NextResponse.json(booking, { status: 201 });

    } catch (error) {
        console.error('Booking Error:', error);
        return NextResponse.json(
            {
                error: 'Internal Server Error',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        // Auto-update past bookings to COMPLETED
        await prisma.booking.updateMany({
            where: {
                status: 'CONFIRMED',
                date: {
                    lt: new Date()
                }
            },
            data: {
                status: 'COMPLETED'
            }
        });

        // In a real app, you would verify admin session here
        const bookings = await prisma.booking.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}
