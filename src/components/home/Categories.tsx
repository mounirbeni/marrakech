"use client";

import Link from "next/link";
import { Tent, Utensils, Car, CloudSun, Droplets, Map, ChevronLeft, ChevronRight } from "lucide-react";

export function Categories() {
    const categories = [
        { label: "Desert Tours", icon: Tent, href: "/search?q=desert" },
        { label: "Food & Drink", icon: Utensils, href: "/search?q=food" },
        { label: "Quad/Buggy", icon: Car, href: "/search?q=quad" },
        { label: "Hot Air Balloon", icon: CloudSun, href: "/search?q=balloon" },
        { label: "Hammams", icon: Droplets, href: "/search?q=hammam" },
        { label: "Day Trips", icon: Map, href: "/search?q=trips" },
    ];

    return (
        <section className="py-12 bg-white border-b border-[#E0E0E0]">
            <div className="container mx-auto px-4 max-w-[1400px]">
                <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                    {categories.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="group flex flex-col items-center gap-3 min-w-[100px] cursor-pointer"
                            >
                                <div className="w-[60px] h-[60px] rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 group-hover:border-[#FF5F00] group-hover:shadow-md bg-white">
                                    <Icon className="w-6 h-6 text-gray-700 group-hover:text-[#FF5F00] transition-colors stroke-[1.5]" />
                                </div>
                                <span className="text-[12px] font-bold text-black text-center leading-tight">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
