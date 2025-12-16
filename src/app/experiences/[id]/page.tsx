import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import {
    MapPin,
    Star,
    Clock,
    Users,
    Languages,
    CheckCircle,
    Sun,
    Package,
    Award,
    Heart,

    Info,
    Camera,
    Sparkles,
    Check,
    Calendar,
    ArrowRight,
    Palmtree,
    Accessibility,
    ThermometerSun,
    Gem
} from "lucide-react";
import Script from 'next/script';
import { BookingForm } from "@/components/experiences/BookingForm";
import { WeatherWidget } from "@/components/experiences/WeatherWidget"; // Added
import { TrustBadge } from "@/components/ui/trust-badge"; // Added
import { ActivityCard } from "@/components/shared/ActivityCard";
import { ActivityGallery } from "@/components/experiences/ActivityGallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity } from "@/lib/types";
import { activities } from "@/lib/data/activities-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getActivity(id: string): Promise<Activity | null> {
    const staticActivity = activities.find(a => a.id === id) || null;
    return staticActivity;
}

// Generate comprehensive metadata with structured data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const activity = await getActivity(id);

    if (!activity) {
        return {
            title: "Experience Not Found",
            description: "The requested experience could not be found."
        };
    }

    const fallbackImage = "/localexpert.jpg";
    const validImage = activity.image && activity.image.trim() !== "" ? activity.image : fallbackImage;
    const ogImages = activity.images && activity.images.length > 0 ?
        activity.images.filter(img => img && img.trim() !== "") :
        [validImage];

    const generateStructuredData = () => {
        const baseData: any = {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": activity.title,
            "description": activity.subtitle || activity.description,
            "image": ogImages,
            "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": activity.price.toString(),
                "availability": "https://schema.org/InStock",
                "validFrom": new Date().toISOString()
            },
            "duration": activity.duration.includes("hour") ?
                `PT${activity.duration.match(/\d+/)?.[0] || '1'}H` : "PT1H",
            "touristType": activity.targetAudience || "Tourists",
            "location": {
                "@type": "Place",
                "name": activity.location,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Marrakech",
                    "addressCountry": "MA"
                }
            },
            "provider": {
                "@type": "Organization",
                "name": "Marrakech Luxe Experiences",
                "url": "https://marrakechluxe.com"
            },
            ...(activity.rating ? {
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": activity.rating.toString(),
                    "reviewCount": activity.reviews.toString()
                }
            } : {}),
            ...(activity.itinerary && activity.itinerary.length > 0 ? {
                "hasPart": activity.itinerary.map(step => ({
                    "@type": "HowToStep",
                    "name": step.title,
                    "itemListElement": [{
                        "@type": "HowToDirection",
                        "text": step.description
                    }]
                }))
            } : {})
        };
        return baseData;
    };

    return {
        title: `${activity.title} | Luxury Experience in Marrakech`,
        description: activity.subtitle || activity.description.substring(0, 160),
        openGraph: {
            title: activity.title,
            description: activity.subtitle || activity.description.substring(0, 160),
            images: ogImages.map(img => ({
                url: img,
                width: 1200,
                height: 630,
                alt: activity.title
            })),
            type: "website",
            locale: "en_US",
            siteName: "Marrakech Luxe Experiences"
        },
        alternates: {
            canonical: `https://marrakechluxe.com/experiences/${id}`
        },
        other: {
            "application/ld+json": JSON.stringify(generateStructuredData())
        }
    };
}

export default async function ActivityPage({ params }: PageProps) {
    const { id } = await params;
    const activity = await getActivity(id);

    if (!activity) {
        notFound();
    }

    const relatedActivities: Activity[] = activities
        .filter(a => a.category === activity.category && a.id !== activity.id)
        .slice(0, 3);

    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground text-sm ml-1">({activity.reviews} reviews)</span>
            </div>
        );
    };

    const fallbackImage = "/localexpert.jpg";
    const validImage = activity.image && activity.image.trim() !== "" ? activity.image : fallbackImage;
    const validImages = activity.images && activity.images.length > 0 ?
        activity.images.filter(img => img && img.trim() !== "") :
        [validImage];

    return (
        <>
            <div className="min-h-screen bg-background pb-32">
                {/* Hero Section */}
                <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
                    {validImage && (
                        <Image
                            src={validImage}
                            alt={activity.title}
                            fill
                            className="object-cover"
                            priority
                            quality={95}
                            sizes="100vw"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="container mx-auto px-6 md:px-12 pb-20 pt-32 max-w-7xl">
                            <div className="max-w-4xl animate-fade-in-up space-y-6">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge className="text-sm font-medium bg-primary/95 text-primary-foreground backdrop-blur-md px-4 py-1.5 border-none shadow-lg">
                                        {activity.category}
                                    </Badge>
                                    {activity.difficulty && (
                                        <Badge variant="outline" className="text-sm font-medium text-white border-white/30 bg-black/20 backdrop-blur-md px-4 py-1.5">
                                            {activity.difficulty} Level
                                        </Badge>
                                    )}
                                    <TrustBadge type="verified" className="bg-white/90 text-primary border-none" />
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] shadow-sm">
                                    {activity.title}
                                </h1>

                                {activity.subtitle && (
                                    <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl text-shadow-sm">
                                        {activity.subtitle}
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-white font-medium pt-2">
                                    {renderRating(activity.rating)}
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        <span>{activity.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        <span>{activity.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <span>max {activity.maxGroupSize} Guests</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 md:px-12 max-w-7xl -mt-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* LEFT COLUMN */}
                        <div className="lg:col-span-2 space-y-20 pt-12">

                            {/* Overview */}
                            <section className="space-y-8">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground">Overview</h2>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                                    {activity.description}
                                </p>

                                {/* Unique Selling Points */}
                                {activity.uniqueSellingPoints && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                        {activity.uniqueSellingPoints.map((point, i) => (
                                            <div key={i} className="flex gap-3 items-start">
                                                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Gem className="h-3 w-3 text-primary" />
                                                </div>
                                                <span className="text-foreground/80 font-medium">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Gallery */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Visual Journey</h2>
                                </div>
                                <ActivityGallery images={validImages} title={activity.title} />
                            </section>

                            {/* Experience Details */}
                            <section className="space-y-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {activity.features?.slice(0, 8).map((feature, i) => (
                                        <div key={i} className="bg-secondary/20 rounded-xl p-4 text-center hover:bg-secondary/30 transition-colors">
                                            <span className="text-sm font-medium text-foreground/90">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Authentic Moroccan Elements */}
                            {activity.authenticMoroccanElements && activity.authenticMoroccanElements.length > 0 && (
                                <section className="bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl p-8 md:p-10 border border-amber-100 dark:border-amber-900/30">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Palmtree className="h-6 w-6 text-amber-600" />
                                        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Authentic Moroccan Experience</h2>
                                    </div>
                                    <div className="grid gap-4">
                                        {activity.authenticMoroccanElements.map((elem, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                                                <p className="text-amber-900/80 dark:text-amber-200/80 text-lg leading-relaxed">{elem}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Itinerary */}
                            {activity.itinerary && activity.itinerary.length > 0 && (
                                <section className="space-y-10">
                                    <h2 className="text-3xl font-bold">Your Itinerary</h2>
                                    <div className="relative pl-8 space-y-12 before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-primary/30 before:to-transparent">
                                        {activity.itinerary.map((step, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[41px] top-0 h-8 w-8 rounded-full bg-background border-4 border-primary shadow-sm flex items-center justify-center z-10">
                                                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-4">
                                                        <Badge variant="outline" className="px-3 py-1 font-mono text-xs">
                                                            {step.time}
                                                        </Badge>
                                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                                    </div>
                                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* What to Expect */}
                            {activity.whatToExpect && (
                                <section className="space-y-6">
                                    <h2 className="text-3xl font-bold">What to Expect</h2>
                                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground/90 leading-loose">
                                        {activity.whatToExpect}
                                    </div>
                                </section>
                            )}

                            {/* Premium Add-ons */}
                            {activity.premiumAddons && (
                                <section className="space-y-8">
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <Award className="h-6 w-6 text-primary" />
                                        Premium Upgrades
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {activity.premiumAddons.map((addon, i) => (
                                            <Card key={i} className="border-muted hover:border-primary/50 transition-colors cursor-pointer bg-card/50">
                                                <CardContent className="p-6 space-y-3">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-bold text-lg">{addon.name}</h3>
                                                        <span className="font-semibold text-primary">+€{addon.price}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Host Info */}
                            {activity.host && (
                                <section className="bg-secondary/20 rounded-3xl p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-xl">
                                            <AvatarImage src={activity.host.image} />
                                            <AvatarFallback>{activity.host.name?.charAt(0) || 'H'}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">Hosted by {activity.host.name}</h3>
                                                {activity.host.verified && (
                                                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                                        <CheckCircle className="h-4 w-4" /> Verified Expert
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-lg text-muted-foreground italic">&quot;{activity.host.bio}&quot;</p>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {activity.languages?.map((lang) => (
                                                    <Badge key={lang} variant="secondary" className="px-3 py-1">
                                                        <Languages className="h-3 w-3 mr-1" /> {lang}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Accordion Info */}
                            <section>
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    <AccordionItem value="included" className="border rounded-xl px-6">
                                        <AccordionTrigger className="text-lg font-semibold py-6">Inclusions & Exclusions</AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Included</h4>
                                                    <ul className="space-y-2">
                                                        {activity.included?.map((item, i) => (
                                                            <li key={i} className="text-muted-foreground text-sm flex gap-2">
                                                                <span className="block h-1.5 w-1.5 mt-1.5 rounded-full bg-green-500 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="font-medium text-rose-600 flex items-center gap-2"><XIcon className="h-4 w-4" /> Not Included</h4>
                                                    <ul className="space-y-2">
                                                        {activity.exclusions?.map((item, i) => (
                                                            <li key={i} className="text-muted-foreground text-sm flex gap-2">
                                                                <span className="block h-1.5 w-1.5 mt-1.5 rounded-full bg-rose-500 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="logistics" className="border rounded-xl px-6">
                                        <AccordionTrigger className="text-lg font-semibold py-6">Logistics & Practical Info</AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                {activity.meetingPoint && (
                                                    <div className="space-y-1">
                                                        <span className="text-sm font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Meeting Point</span>
                                                        <p className="text-muted-foreground text-sm">{activity.meetingPoint}</p>
                                                    </div>
                                                )}
                                                {activity.whatToBring && (
                                                    <div className="space-y-1">
                                                        <span className="text-sm font-semibold flex items-center gap-2"><Package className="h-4 w-4" /> What to Bring</span>
                                                        <p className="text-muted-foreground text-sm">{activity.whatToBring.join(", ")}</p>
                                                    </div>
                                                )}
                                                {activity.accessibility && (
                                                    <div className="space-y-1 md:col-span-2">
                                                        <span className="text-sm font-semibold flex items-center gap-2"><Accessibility className="h-4 w-4" /> Accessibility</span>
                                                        <p className="text-muted-foreground text-sm">{activity.accessibility}</p>
                                                    </div>
                                                )}
                                                {activity.seasonalNotes && (
                                                    <div className="space-y-1 md:col-span-2">
                                                        <span className="text-sm font-semibold flex items-center gap-2"><ThermometerSun className="h-4 w-4" /> Seasonal Notes</span>
                                                        <p className="text-muted-foreground text-sm">{activity.seasonalNotes}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="policy" className="border rounded-xl px-6">
                                        <AccordionTrigger className="text-lg font-semibold py-6">Cancellation Policy</AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <p className="text-muted-foreground">{activity.cancellationPolicy}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                        </div>

                        {/* RIGHT COLUMN - STICKY */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <WeatherWidget />
                                <BookingForm activity={activity} />


                            </div>
                        </div>

                    </div>

                    {/* Related */}
                    {relatedActivities.length > 0 && (
                        <div className="mt-32 pt-16 border-t">
                            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedActivities.map(rel => (
                                    <ActivityCard key={rel.id} activity={rel} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
