"use client";

import { useWishlist } from "@/lib/contexts/WishlistContext";
import { activitiesData } from "@/lib/data/activities-data";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardWishlistPage() {
    const { wishlist } = useWishlist();

    const allActivities = Object.values(activitiesData).flat();
    const wishlistActivities = allActivities.filter(activity =>
        wishlist.includes(activity.id)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Wishlist</h1>
                <p className="text-muted-foreground">
                    Your favorite experiences saved for later.
                </p>
            </div>

            {wishlistActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistActivities.filter(activity => activity.id).map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                        <Heart className="h-10 w-10 text-[#FF5F00]" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6 max-w-sm text-center">
                        Start exploring our unique experiences and save the ones you love.
                    </p>
                    <Link href="/search">
                        <Button className="bg-[#FF5F00] hover:bg-[#E55500] text-white font-bold rounded-full px-8 transition-all hover:scale-105 active:scale-95">
                            Explore Experiences
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
