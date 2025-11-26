
import prisma from "@/lib/prisma";
import ExperiencesClient from "./ExperiencesClient";
import { Activity } from "@/lib/types";

export const dynamic = 'force-dynamic'; // Ensure real-time updates

export default async function ExperiencesPage() {
    const services = await prisma.service.findMany({
        orderBy: { createdAt: 'desc' }
    });

    // Map Prisma Service to Activity type
    const activities: Activity[] = services.map(service => ({
        id: service.id,
        title: service.title,
        price: service.price,
        rating: service.rating,
        reviews: service.reviews,
        category: service.category,
        image: service.images[0] || "",
        duration: service.duration,
        features: service.features,
        location: service.location,
        tags: service.tags,
        images: service.images,
        host: service.host as any || { name: "Marrakech Host", image: "/localexpert.jpg" },
        description: service.description,
        included: service.included,
        whatToBring: service.whatToBring,
        itinerary: service.itinerary as any || [],
        packages: [], // Not yet in DB, can add later if needed
        packageCategories: []
    }));

    return <ExperiencesClient initialActivities={activities} />;
}
