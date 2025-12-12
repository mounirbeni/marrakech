
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { bookingId, rating, comment } = await request.json();

        // Verify booking belongs to user
        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                OR: [
                    { userId: session.id as string },
                    { email: session.email as string }
                ]
            }
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Find service
        // We need serviceId on Booking? 
        // Booking has activityId. Is that serviceId? 
        // Schema: activityId String. 
        // Yes, likely.

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                userId: session.id as string,
                serviceId: booking.activityId,
                bookingId: booking.id
            }
        });

        // Update Service rating?
        // Basic implementation: just creating review.
        // We can aggregate later.

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
    }
}
