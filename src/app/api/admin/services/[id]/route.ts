import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const service = await prisma.service.findUnique({
            where: { id: params.id }
        });

        if (!service) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Parse JSON fields
        const parsedService = {
            ...service,
            images: JSON.parse(service.images || '[]'),
            features: JSON.parse(service.features || '[]'),
            included: JSON.parse(service.included || '[]'),
            whatToBring: JSON.parse(service.whatToBring || '[]'),
            tags: JSON.parse(service.tags || '[]'),
            itinerary: service.itinerary ? JSON.parse(service.itinerary) : []
        };

        return NextResponse.json(parsedService);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();

        // Prepare data for update, only serializing what's present
        const data: any = {};
        if (body.title) data.title = body.title;
        if (body.description) data.description = body.description;
        if (body.price) data.price = parseFloat(body.price);
        if (body.category) data.category = body.category;
        if (body.duration) data.duration = body.duration;
        if (body.location) data.location = body.location;
        if (body.latitude !== undefined) data.latitude = body.latitude ? parseFloat(body.latitude) : null;
        if (body.longitude !== undefined) data.longitude = body.longitude ? parseFloat(body.longitude) : null;
        if (body.images) data.images = JSON.stringify(body.images);
        if (body.features) data.features = JSON.stringify(body.features);
        if (body.included) data.included = JSON.stringify(body.included);
        if (body.whatToBring) data.whatToBring = JSON.stringify(body.whatToBring);
        if (body.tags) data.tags = JSON.stringify(body.tags);
        if (body.itinerary) data.itinerary = JSON.stringify(body.itinerary);

        const updated = await prisma.service.update({
            where: { id: params.id },
            data
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Update Failed' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await prisma.service.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete Failed' }, { status: 500 });
    }
}
