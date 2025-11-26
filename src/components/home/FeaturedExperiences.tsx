"use client";

import { ActivityCard } from "@/components/shared/ActivityCard";
import { activities } from "@/lib/data/activities-data";
import { motion } from "framer-motion";

export function FeaturedExperiences() {
    return (
        <section className="py-16 sm:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="text-center mb-12 sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif tracking-tight"
                    >
                        Featured Things to do
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Handpicked activities to help you discover the authentic soul of Marrakech.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.slice(0, 6).map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ActivityCard activity={activity} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
