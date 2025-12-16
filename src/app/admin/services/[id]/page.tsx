import { ServiceEditor } from '@/components/admin/ServiceEditor';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: { id: string } }) {
    if (params.id === 'new') {
        return <ServiceEditor isNew />;
    }

    const service = await prisma.service.findUnique({
        where: { id: params.id }
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
        itinerary: service.itinerary ? JSON.parse(service.itinerary) : []
    };

    return <ServiceEditor initialData={parsedService} />;
}
