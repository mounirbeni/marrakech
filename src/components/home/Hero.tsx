"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section ref={ref} className="relative h-[90dvh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Parallax Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 hero-bg-image h-full w-full transition-opacity duration-500"
                    style={{
                        backgroundImage: "url('/homepage.jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-white/60 dark:bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background dark:from-black/40 dark:via-black/20 dark:to-black/60" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight drop-shadow-sm dark:drop-shadow-2xl font-serif leading-[1.1]">
                        Uncover the Secrets <br className="hidden md:block" />
                        <span className="text-primary italic">of Marrakech</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg sm:text-xl md:text-2xl text-muted-foreground dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
                >
                    Experience the magic of the Red City with trusted local guides.
                    Curated tours, authentic encounters, and unforgettable memories.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link href="/experiences">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Explore Experiences
                        </Button>
                    </Link>
                    <Link href="/how-it-works">
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-background/50 backdrop-blur-sm border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            How it Works
                        </Button>
                    </Link>
                </motion.div>
            </div>


        </section>
    );
}
