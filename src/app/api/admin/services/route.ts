import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const services = await prisma.service.findMany({
            where: category ? { category } : undefined,
            orderBy: { createdAt: 'desc' }
        });

        // Parse JSON strings back to arrays
        const parsedServices = services.map(s => ({
            ...s,
            images: JSON.parse(s.images || '[]'),
            features: JSON.parse(s.features || '[]'),
            included: JSON.parse(s.included || '[]'),
            whatToBring: JSON.parse(s.whatToBring || '[]'),
            tags: JSON.parse(s.tags || '[]'),
            // Itinerary is a bit complex, strictly it's a string in schema too
            itinerary: s.itinerary ? JSON.parse(s.itinerary) : []
        }));

        return NextResponse.json(parsedServices);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        // TODO: Enforce admin role
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Serialize arrays to JSON strings for DB
        const data = {
            title: body.title,
            description: body.description,
            price: parseFloat(body.price),
            category: body.category,
            duration: body.duration,
            location: body.location,
            latitude: body.latitude ? parseFloat(body.latitude) : null,
            longitude: body.longitude ? parseFloat(body.longitude) : null,
            images: JSON.stringify(body.images || []),
            features: JSON.stringify(body.features || []),
            included: JSON.stringify(body.included || []),
            whatToBring: JSON.stringify(body.whatToBring || []),
            tags: JSON.stringify(body.tags || []),
            itinerary: JSON.stringify(body.itinerary || []),
            host: body.host || "Marrakech Tours" // simplified for now
        };

        const service = await prisma.service.create({ data });

        return NextResponse.json(service);
    } catch (error) {
        console.error("Create Service Error:", error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}
