"use client";

import React, { useEffect, useState } from 'react';
import { TripStateWrapper } from '@/components/dashboard/TripStateWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Calendar, Map, TrendingUp, Sun, CloudSun, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/lib/contexts/WishlistContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DashboardData {
    stats: {
        totalBookings: number;
        loyaltyPoints: number;
        nextTrip: {
            days: number;
            title: string;
            date: string;
        } | null;
    };
    user: {
        name: string;
    };
}

export default function DashboardPage() {
    const { wishlist } = useWishlist();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/dashboard');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const userName = data?.user.name || "Traveler";
    const firstName = userName.split(' ')[0];
    const totalBookings = data?.stats?.totalBookings || 0;
    const loyaltyPoints = data?.stats?.loyaltyPoints || 0;
    const nextTrip = data?.stats?.nextTrip;

    // Loyalty Tier Logic
    const reliabilityTier = loyaltyPoints > 5000 ? "Gold Member" : loyaltyPoints > 1000 ? "Silver Member" : "Bronze Member";

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Map className="h-6 w-6 text-primary/50" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 to-primary/70 p-8 text-primary-foreground shadow-2xl"
            >
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Bonjour, {firstName}! 🌿
                        </h1>
                        <p className="text-primary-foreground/90 text-lg md:text-xl max-w-xl">
                            Ready to explore the magic of Marrakech? Your next adventure awaits.
                        </p>
                    </div>
                    {nextTrip && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[200px]">
                            <div className="text-sm font-medium text-white/80 uppercase tracking-wider">Next Trip In</div>
                            <div className="text-4xl font-bold text-white my-1">{nextTrip.days} Days</div>
                            <div className="text-sm text-white/90 truncate max-w-[200px]">{nextTrip.title}</div>
                        </div>
                    )}
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-black/5 blur-2xl"></div>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Bookings"
                    value={totalBookings.toString()}
                    icon={Calendar}
                    description="Lifetime explorations"
                    delay={0.1}
                />
                <StatsCard
                    title="Loyalty Points"
                    value={loyaltyPoints.toLocaleString()}
                    icon={Activity}
                    description={reliabilityTier}
                    delay={0.2}
                />
                <StatsCard
                    title="Wishlist"
                    value={wishlist.length.toString()}
                    icon={TrendingUp}
                    description="Saved experiences"
                    delay={0.3}
                />

            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Primary Column - Trip Status */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Current Journey</h2>
                        <Link href="/dashboard/bookings" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
                        <TripStateWrapper />
                    </div>
                </motion.div>

                {/* Secondary Column - Quick Actions or Notifications */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Concierge</h2>

                    <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -mr-6 -mt-6" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CloudSun className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                Need Inspiration?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 relative z-10">
                                Unsure what to do next? Our local experts have curated a list of hidden gems just for you.
                            </p>
                            <Link href="/services" className="w-full">
                                <button className="w-full bg-card hover:bg-accent text-foreground border py-2 px-4 rounded-xl font-medium transition-all text-sm shadow-sm hover:shadow-md">
                                    Explore Experiences
                                </button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Need Assistance?</CardTitle>
                            <CardDescription>We are here 24/7</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/dashboard/support">
                                <button className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 py-2.5 px-4 rounded-xl font-medium hover:bg-primary/90 transition-all active:scale-[0.98]">
                                    Contact Support
                                </button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, description, delay }: { title: string, value: string, icon: any, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + delay, duration: 0.4 }}
        >
            <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm group cursor-default hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        {title}
                    </CardTitle>
                    <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold tracking-tight">{value}</div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
