"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Utensils, Palette, Mountain, Camera, Users } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
    { name: "Adventures", icon: Mountain, href: "/experiences?category=Adventures" },
    { name: "City Tours", icon: Compass, href: "/experiences?category=City+Tours" },
    { name: "Food & Drink", icon: Utensils, href: "/experiences?category=Food+%26+Drink" },
    { name: "Cultural", icon: Palette, href: "/experiences?category=Cultural" },
    { name: "Wellness", icon: Users, href: "/experiences?category=Wellness" },
    { name: "Excursions", icon: Camera, href: "/experiences?category=Excursions" },
];

export function Categories() {
    return (
        <section className="py-12 sm:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-8 sm:mb-12 font-serif"
                >
                    Explore by Category
                </motion.h2>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    asChild
                                    className="rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 gap-2 px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-medium shadow-sm hover:shadow-md"
                                >
                                    <Link href={category.href}>
                                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                        {category.name}
                                    </Link>
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
