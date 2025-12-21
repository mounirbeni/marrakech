
"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/types";
import { useWishlist } from "@/lib/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { TrustBadge } from "@/components/ui/trust-badge";

interface ActivityCardProps {
    activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    if (!activity || !activity.id) return null;

    const inWishlist = isInWishlist(activity.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) removeFromWishlist(activity.id);
        else addToWishlist(activity.id);
    };

    return (
        <Link href={`/experiences/${activity.id}`} className="block h-full group">
            <Card className="h-full flex flex-col overflow-hidden rounded-2xl border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white">
                <div className="relative aspect-[4/5] md:aspect-[4/3] overflow-hidden">
                    {activity.image ? (
                        <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {activity.rating >= 4.8 && <TrustBadge type="bestseller" />}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute top-3 right-3 h-10 w-10 rounded-full backdrop-blur-md transition-all z-10",
                            inWishlist
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-white/80 text-gray-700 hover:bg-white hover:text-[var(--color-primary)]"
                        )}
                        onClick={toggleWishlist}
                    >
                        <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
                    </Button>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                            <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                            <span>{activity.duration}</span>
                        </div>
                    </div>
                </div>

                <CardContent className="flex flex-col flex-grow p-6 gap-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-1 text-[var(--color-accent)] font-bold">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{activity.rating}</span>
                            <span className="text-gray-400 font-normal">({activity.reviews})</span>
                        </div>
                        {activity.location && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs uppercase tracking-wide">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                            </div>
                        )}
                    </div>

                    <h3 className="font-serif font-bold text-xl leading-tight text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                        {activity.title}
                    </h3>

                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {activity.description}
                    </p>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto border-t border-gray-100/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">From</span>
                        <div className="text-2xl font-serif font-bold text-[var(--color-primary)]">{activity.price} €</div>
                    </div>
                    <Button className="rounded-full px-6 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white shadow-md group-hover:shadow-lg transition-all">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
