
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { MapPin, Star, Clock, Users, Languages, CheckCircle, Sun, Package } from "lucide-react";
import prisma from "@/lib/prisma";
import { BookingForm } from "@/components/experiences/BookingForm";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Activity } from "@/lib/types";
import { activities } from "@/lib/data/activities-data";

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getActivity(id: string): Promise<Activity | null> {
    const service = await prisma.service.findUnique({
        where: { id }
    });

    // Fallback to static data if not found in DB, or to get packages
    const staticActivity = activities.find(a => a.id === id || (service && a.title === service.title));

    if (!service && !staticActivity) return null;

    if (!service && staticActivity) return staticActivity;

    if (service) {
        return {
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
            exclusions: (service as any).exclusions || [],
            meetingPoint: (service as any).meetingPoint || "",
            endingPoint: (service as any).endingPoint || "",
            cancellationPolicy: (service as any).cancellationPolicy || "",
            requirements: (service as any).requirements || [],
            ageRestrictions: (service as any).ageRestrictions || "",
            whatToBring: service.whatToBring,
            experienceHighlights: (service as any).experienceHighlights || [],
            additionalInfo: (service as any).additionalInfo || "",
            itinerary: (service.itinerary as unknown as { time: string; title: string; description: string }[]) || [],
            minGroupSize: (service as any).minGroupSize || 1,
            maxGroupSize: (service as any).maxGroupSize || 8,
            packages: staticActivity?.packages || [],
            packageCategories: staticActivity?.packageCategories || []
        };
    }

    return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const activity = await getActivity(id);

    if (!activity) {
        return {
            title: "Experience Not Found",
        };
    }

    return {
        title: `${activity.title} | Explore Marrakech like local`,
        description: activity.description,
        openGraph: {
            images: [activity.image],
        },
    };
}

export default async function ActivityPage({ params }: PageProps) {
    const { id } = await params;
    const activity = await getActivity(id);

    if (!activity) {
        notFound();
    }

    // Get related activities (fetch from DB)
    const relatedServices = await prisma.service.findMany({
        where: {
            category: activity.category,
            id: { not: activity.id }
        },
        take: 3
    });

    const relatedActivities: Activity[] = relatedServices.map(service => ({
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
        exclusions: (service as any).exclusions || [],
        meetingPoint: (service as any).meetingPoint || "",
        endingPoint: (service as any).endingPoint || "",
        cancellationPolicy: (service as any).cancellationPolicy || "",
        requirements: (service as any).requirements || [],
        ageRestrictions: (service as any).ageRestrictions || "",
        whatToBring: service.whatToBring,
        experienceHighlights: (service as any).experienceHighlights || [],
        additionalInfo: (service as any).additionalInfo || "",
        itinerary: (service.itinerary as unknown as { time: string; title: string; description: string }[]) || [],
        minGroupSize: (service as any).minGroupSize || 1,
        maxGroupSize: (service as any).maxGroupSize || 8,
        packages: [],
        packageCategories: []
    }));

    return (
        <div className="min-h-screen bg-background pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                        {activity.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-accent text-accent" />
                            <span className="font-medium text-foreground">{activity.rating}</span>
                            <span>({activity.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                            <MapPin className="h-5 w-5" />
                            <span className="underline underline-offset-4">{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-5 w-5" />
                            <span>{activity.duration}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

                    {/* Left Column: Image & Details */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-8">

                        {/* Image */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={activity.image}
                                alt={activity.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700 dark-mode-image"
                                priority
                            />
                        </div>

                        {/* Service Details */}
                        <div className="space-y-12">

                            {/* Host Info */}
                            <div className="flex items-center justify-between border-b border-border pb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">
                                        Hosted by a Local Expert
                                    </h2>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Languages className="h-4 w-4" />
                                            <span>English, French, Arabic</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            <span>Max 8 guests</span>
                                        </div>
                                    </div>
                                </div>
                                <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                                    <AvatarImage src={activity.host?.image} />
                                    <AvatarFallback>{activity.host?.name?.[0] || 'H'}</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">About this experience</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {activity.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {activity.features?.map((feature) => (
                                        <Badge key={feature} variant="secondary" className="text-sm py-1 px-3">
                                            {feature}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Packages Section */}
                            {activity.packageCategories && activity.packageCategories.length > 0 && (
                                <div className="space-y-6 pt-6 border-t border-border mb-8">
                                    {activity.packageCategories.map((category, idx) => (
                                        <div key={idx} className="space-y-4">
                                            <h3 className="text-xl font-semibold">{category.name}</h3>
                                            {category.description && (
                                                <p className="text-muted-foreground">{category.description}</p>
                                            )}
                                            <div className="grid grid-cols-1 gap-4">
                                                {category.packages.map((pkg, pkgIdx) => (
                                                    <div key={pkgIdx} className="border rounded-lg p-4 space-y-3 bg-card hover:border-primary/50 transition-colors">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div>
                                                                <h4 className="font-semibold text-lg">{pkg.name}</h4>
                                                                <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                                                            </div>
                                                            <div className="text-lg font-bold text-primary whitespace-nowrap">
                                                                €{pkg.price}
                                                            </div>
                                                        </div>
                                                        {pkg.included && pkg.included.length > 0 && (
                                                            <div className="flex flex-wrap gap-2">
                                                                {pkg.included.map((item, i) => (
                                                                    <Badge key={i} variant="outline" className="text-xs bg-secondary/50">
                                                                        {item}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Accordions */}
                            <Accordion type="single" collapsible className="w-full">

                                <AccordionItem value="included">
                                    <AccordionTrigger className="text-lg font-semibold">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-primary" />
                                            What&apos;s Included
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                            {activity.included?.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="exclusions">
                                    <AccordionTrigger className="text-lg font-semibold">
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-primary" />
                                            What&apos;s Not Included
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                            {activity.exclusions?.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <CheckCircle className="h-5 w-5 text-red-500 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="bring">
                                    <AccordionTrigger className="text-lg font-semibold">
                                        <div className="flex items-center gap-3">
                                            <Sun className="h-5 w-5 text-primary" />
                                            What to Bring
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                            {activity.whatToBring?.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="itinerary">
                                    <AccordionTrigger className="text-lg font-semibold">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Itinerary
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="relative pl-4 border-l-2 border-border ml-2 space-y-8 py-4">
                                            {activity.itinerary?.map((stop, index) => (
                                                <div key={index} className="relative">
                                                    <div className="absolute -left-[21px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                                                    <div className="space-y-1">
                                                        <span className="text-sm font-medium text-primary">{stop.time}</span>
                                                        <h4 className="text-base font-semibold">{stop.title}</h4>
                                                        <p className="text-sm text-muted-foreground">{stop.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="highlights">
                                    <AccordionTrigger className="text-lg font-semibold">
                                        <div className="flex items-center gap-3">
                                            <Star className="h-5 w-5 text-primary" />
                                            Experience Highlights
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                            {activity.experienceHighlights?.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                                                    <CheckCircle className="h-5 w-5 text-yellow-500 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>

                            {/* Additional Information Sections */}
                            <div className="space-y-6 pt-6 border-t border-border">

                                {/* Meeting Point */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Meeting Point</h3>
                                    <p className="text-muted-foreground">{activity.meetingPoint}</p>
                                </div>

                                {/* Ending Point */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Ending Point</h3>
                                    <p className="text-muted-foreground">{activity.endingPoint}</p>
                                </div>

                                {/* Group Size */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Group Size</h3>
                                    <p className="text-muted-foreground">Minimum: {activity.minGroupSize} | Maximum: {activity.maxGroupSize}</p>
                                </div>

                                {/* Age Restrictions */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Age Restrictions</h3>
                                    <p className="text-muted-foreground">{activity.ageRestrictions}</p>
                                </div>

                                {/* Requirements */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Requirements</h3>
                                    <ul className="text-muted-foreground list-disc list-inside">
                                        {activity.requirements?.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cancellation Policy */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Cancellation Policy</h3>
                                    <p className="text-muted-foreground">{activity.cancellationPolicy}</p>
                                </div>

                                {/* Additional Info */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Additional Information</h3>
                                    <p className="text-muted-foreground">{activity.additionalInfo}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="sticky top-24">
                            <BookingForm activity={activity} />
                        </div>
                    </div>
                </div>

                {/* Related Experiences */}
                {relatedActivities.length > 0 && (
                    <div className="border-t border-border pt-12">
                        <h2 className="text-3xl font-bold mb-8">You might also like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedActivities.map((related) => (
                                <ActivityCard key={related.id} activity={related} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
