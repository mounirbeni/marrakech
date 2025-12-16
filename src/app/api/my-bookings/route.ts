
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
            include: { review: true }
        });

        // Manually fetch images for these bookings since there's no direct relation
        const activityIds = bookings.map(b => b.activityId);
        const services = await prisma.service.findMany({
            where: { id: { in: activityIds } },
            select: { id: true, images: true }
        });

        const bookingsWithImages = bookings.map(booking => {
            const service = services.find(s => s.id === booking.activityId);
            let imageUrl = null;
            if (service && service.images) {
                try {
                    const images = JSON.parse(service.images);
                    if (Array.isArray(images) && images.length > 0) {
                        imageUrl = images[0];
                    }
                } catch (e) {
                    // Ignore parse error
                }
            }
            return {
                ...booking,
                imageUrl
            };
        });

        return NextResponse.json(bookingsWithImages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}
