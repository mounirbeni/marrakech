"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/types";
import { useWishlist } from "@/lib/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface ActivityCardProps {
    activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(activity.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (inWishlist) {
            removeFromWishlist(activity.id);
        } else {
            addToWishlist(activity.id);
        }
    };

    return (
        <Link href={`/experiences/${activity.id}`} className="block h-full group">
            <Card className="h-full flex flex-col overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 dark-mode-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm",
                            inWishlist
                                ? "bg-primary text-white hover:bg-primary/90"
                                : "bg-white/90 text-foreground hover:bg-white hover:text-primary hover:scale-110"
                        )}
                        onClick={toggleWishlist}
                        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
                    </Button>


                </div>

                <CardContent className="flex flex-col flex-grow p-5 gap-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-bold text-foreground">{activity.rating}</span>
                            <span className="text-muted-foreground">({activity.reviews})</span>
                        </div>
                        {activity.location && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5" />
                                <span className="line-clamp-1 text-xs">{activity.location}</span>
                            </div>
                        )}
                    </div>

                    <h3 className="font-serif font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {activity.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {activity.description}
                    </p>

                    <div className="mt-auto pt-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span className="font-medium">{activity.duration}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/50 mt-auto bg-secondary/10">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Starting from</span>
                        <div className="text-xl font-bold text-primary">{activity.price} €</div>
                    </div>
                    <Button className="rounded-full px-6 font-medium shadow-md group-hover:shadow-lg transition-all group-hover:bg-primary/90">
                        Book Now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
