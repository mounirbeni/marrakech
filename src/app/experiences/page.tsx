import prisma from "@/lib/prisma";
import ExperiencesClient from "./ExperiencesClient";
import { Activity } from "@/lib/types";
import { activities as staticActivities } from "@/lib/data/activities-data";

export const dynamic = 'force-dynamic'; // Ensure real-time updates

export default async function ExperiencesPage() {
    // Use static luxury data as the primary source
    let activities: Activity[] = staticActivities;

    // TODO: Re-enable Prisma when database is fully seeded with luxury content
    /*
    try {
        // Try to fetch from database first
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' }
        });

        if (services.length > 0) {
            // Map Prisma Service to Activity type
            activities = services.map(service => ({
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
                host: (service.host as unknown as { name: string; image: string }) || { name: "Marrakech Host", image: "/localexpert.jpg" },
                description: service.description,
                included: service.included,
                exclusions: [],
                meetingPoint: "Not specified",
                endingPoint: "Not specified",
                cancellationPolicy: "Standard cancellation policy applies",
                requirements: [],
                ageRestrictions: "None",
                experienceHighlights: [],
                additionalInfo: "",
                minGroupSize: 1,
                maxGroupSize: 10,
                whatToBring: service.whatToBring,
                itinerary: (service.itinerary as unknown as { time: string; title: string; description: string }[]) || [],
                packages: [], // Not yet in DB, can add later if needed
                packageCategories: [],

                // Luxury enhancement fields (defaults if not in DB)
                subtitle: "",
                targetAudience: "",
                uniqueSellingPoints: [],
                premiumAddons: [],
                importantNotes: [],
                whatToExpect: "",
                authenticMoroccanElements: [],
                difficulty: "Easy",
                languages: ["English", "French", "Arabic"],
                accessibility: "",
                seasonalNotes: ""
            }));
        }
    } catch (error) {
        console.warn("Database connection failed, using static data fallback.");
    }
    */

    return <ExperiencesClient initialActivities={activities} />;
}