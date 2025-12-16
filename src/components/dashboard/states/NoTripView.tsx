import React from 'react';
import Link from 'next/link';
import { Compass, Map, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const NoTripView = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-6 relative overflow-hidden"
        >
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-10 right-10 text-primary/10">
                <Map className="h-32 w-32" />
            </div>

            <div className="relative h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner ring-4 ring-background">
                <Compass className="h-10 w-10 text-primary animate-pulse" />
            </div>

            <div className="space-y-3 max-w-md relative z-10">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Where to next?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    You don't have an active journey at the moment.
                    <br />
                    Marrakech is full of hidden gems waiting for you.
                </p>
            </div>

            <Link href="/experiences" className="relative z-10">
                <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </motion.div>
    );
};
