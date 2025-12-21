
"use client";

import { useSearchParams } from "next/navigation";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { activitiesData } from "@/lib/data/activities-data";
import { Activity } from "@/lib/types";

export function SearchResults() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    // Implement more filters logic here

    // Transform static data to flat array for now
    const allActivities = Object.values(activitiesData).flat();

    const filteredActivities = allActivities.filter(activity => {
        if (category && !activity.category.toLowerCase().includes(category.toLowerCase())) return false;
        return true;
    });

    if (filteredActivities.length === 0) {
        return <div className="text-center py-20 text-muted-foreground">No experiences found. Try adjusting your filters.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.filter(a => a.id).map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
            ))}
        </div>
    );
}
