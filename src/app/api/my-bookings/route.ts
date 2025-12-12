
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Fetch bookings linked to user OR matches email
        const bookings = await prisma.booking.findMany({
            where: {
                OR: [
                    { userId: session.id as string },
                    { email: session.email as string }
                ]
            },
            orderBy: { createdAt: 'desc' },
            include: { review: true } // Include review status
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}
