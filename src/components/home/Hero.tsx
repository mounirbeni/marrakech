"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { RotatingText } from "@/components/shared/RotatingText";
import { SearchBar } from "@/components/shared/SearchBar";

export function Hero() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const rotatingWords = [
        "Marrakech Markets",
        "Historical Landmarks",
        "Traditional Restaurants",
        "Luxury Experiences",
    ];

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <div className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-white" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                {/* Main Headline */}
                <h1 className="text-[#FF5F00] text-4xl md:text-6xl font-bold mb-4 text-center drop-shadow-sm">
                    Do more with your trip
                </h1>

                {/* Rotating Text Section */}
                <RotatingText
                    staticText="Discover"
                    rotatingWords={rotatingWords}
                    interval={2800}
                    className="text-xl md:text-2xl mb-8"
                />

                {/* Search Bar */}
                <SearchBar
                    variant="hero"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={handleSearch}
                />
            </div>
        </div>
    );
}
