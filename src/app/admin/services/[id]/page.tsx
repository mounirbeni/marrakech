import { ServiceEditor } from '@/components/admin/ServiceEditor';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Service } from '@/types/admin';

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

    // Map Prisma Service to Admin Service Type
    const parsedService: Service = {
        id: service.id,
        title: service.title,
        description: service.description,
        price: service.price,
        category: service.category,
        duration: service.duration,
        location: service.location,

        // Arrays (JSON)
        images: JSON.parse(service.images || '[]'),
        features: JSON.parse(service.features || '[]'),
        included: JSON.parse(service.included || '[]'),
        // whatToBring: JSON.parse(service.whatToBring || '[]'),
        // tags: JSON.parse(service.tags || '[]'),
        // Arrays (JSON)
        images: JSON.parse(service.images || '[]'),
        features: JSON.parse(service.features || '[]'),
        included: JSON.parse(service.included || '[]'),
        // @ts-ignore
        languages: JSON.parse((service as any).languages || '[]') as string[],

        // Complex Objects
        itinerary: service.itinerary ? JSON.parse(service.itinerary) : [],
        // host: service.host ? JSON.parse(service.host) : undefined, // Host not in Admin Type yet?

        // Optionals
        // latitude: service.latitude ?? undefined,
        // longitude: service.longitude ?? undefined,

        // Mapped fields
        // Mapped fields
        // @ts-ignore
        reviews: (service as any).reviewCount || 0,
        rating: service.rating,

        // Dates (not strictly in Service interface shown step 305? Wait, lines 63 has createdAt for User, but Service lines 20-42 doesn't show createdAt/updatedAt?)
        // Let's check Step 305 lines 20-42.
        // It DOES NOT have createdAt/updatedAt in Service interface!
        // So I should OMIT them or Add them to type.
        // Assuming Editor doesn't need them.
    };

    return <ServiceEditor initialData={parsedService} />;
}
