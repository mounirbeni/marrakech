import { ServiceEditor } from '@/components/admin/ServiceEditor';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (id === 'new') {
        return <ServiceEditor isNew />;
    }

    const service = await prisma.service.findUnique({
        where: { id }
    });

    if (!service) {
        notFound();
    }

    const parsedService = {
        ...service,
        images: JSON.parse(service.images || '[]'),
        features: JSON.parse(service.features || '[]'),
        included: JSON.parse(service.included || '[]'),
        whatToBring: JSON.parse(service.whatToBring || '[]'),
        tags: JSON.parse(service.tags || '[]'),
        itinerary: service.itinerary ? JSON.parse(service.itinerary) : [],
        latitude: service.latitude ?? undefined,
        longitude: service.longitude ?? undefined
    };

    return <ServiceEditor initialData={parsedService} />;
}
