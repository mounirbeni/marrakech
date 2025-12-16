"use client";

import { SupportSection } from "@/components/dashboard/SupportSection";

export default function SupportPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
                <p className="text-muted-foreground">
                    Need help with your trip? We're here for you.
                </p>
            </div>

            <div className="max-w-2xl">
                <SupportSection />
            </div>
        </div>
    );
}
