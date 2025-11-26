"use client";

import { ShieldCheck, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Trusted Local Guides",
        description: "Every guide is vetted and verified to ensure you have a safe and authentic experience.",
    },
    {
        icon: Heart,
        title: "Curated Experiences",
        description: "We handpick every activity to guarantee quality, uniqueness, and unforgettable memories.",
    },
    {
        icon: Award,
        title: "Best Price Guarantee",
        description: "Find a better price elsewhere? We'll match it. No hidden fees, just great value.",
    },
];

export function WhyBookWithUs() {
    return (
        <section className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12 sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif"
                    >
                        Why Book With Us?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        We go the extra mile to make your Marrakech adventure seamless and special.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                                <feature.icon className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3 font-serif">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
