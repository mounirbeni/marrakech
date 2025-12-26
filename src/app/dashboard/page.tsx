'use client';

import { Calendar, MessageSquare, Heart, MapPin, Clock, ArrowRight, Star, Award, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface DashboardStats {
    user: {
        name: string;
        loyaltyPoints: number;
        wishlistCount: number;
    };
    stats: {
        totalBookings: number;
        unreadMessages: number;
    };
    upcomingTrip: {
        id: string;
        date: string;
        activityTitle: string;
        activityId: string;
        imageUrl?: string;
    } | null;
    recommendations: Array<{
        id: string;
        title: string;
        price: number;
        rating: number;
        imageUrl?: string;
    }>;
}

export default function DashboardPage() {
    const { data: session } = useSession();
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number }>({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/dashboard/stats');
                if (res.ok) {
                    const jsonData = await res.json();
                    setData(jsonData);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Countdown Timer Logic
    useEffect(() => {
        if (!data?.upcomingTrip?.date) return;

        const timer = setInterval(() => {
            const tripDate = new Date(data.upcomingTrip!.date).getTime();
            const now = new Date().getTime();
            const distance = tripDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            });
        }, 60000); // Update every minute to save resources

        return () => clearInterval(timer);
    }, [data?.upcomingTrip]);

    const getLoyaltyTier = (points: number) => {
        if (points >= 1000) return { name: 'Platinum', color: 'from-slate-700 to-slate-900', next: 2000 };
        if (points >= 500) return { name: 'Gold', color: 'from-amber-400 to-amber-600', next: 1000 };
        if (points >= 200) return { name: 'Silver', color: 'from-gray-300 to-gray-500', next: 500 };
        return { name: 'Explorer', color: 'from-orange-400 to-orange-600', next: 200 };
    };

    const tier = getLoyaltyTier(data?.user?.loyaltyPoints || 0);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-12"
        >
            {/* 1. Welcome & Loyalty Hero */}
            <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-[#FF5F00] to-[#E55500] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-orange-500/20">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2 opacity-90">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">Premium Member</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                                Good Morning, {session?.user?.name?.split(' ')[0] || 'Traveler'}!
                            </h1>
                            <p className="text-orange-100 text-lg font-medium max-w-lg">
                                Ready to discover the hidden gems of Marrakech today?
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/search">
                                <Button className="bg-white text-[#FF5F00] hover:bg-orange-50 font-bold rounded-full px-6 h-12 shadow-lg transition-transform hover:-translate-y-1">
                                    Book New Adventure
                                </Button>
                            </Link>
                            <Link href="/dashboard/wishlist">
                                <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-bold rounded-full px-6 h-12">
                                    View Wishlist ({data?.user?.wishlistCount || 0})
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10" />
                </div>

                {/* Loyalty Card */}
                <Card className="bg-white border-none shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] rounded-3xl relative overflow-hidden flex flex-col justify-between p-6">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Loyalty Status</h3>
                                <div className={`text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${tier.color} mt-1`}>
                                    {tier.name}
                                </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center text-white shadow-md`}>
                                <Award className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="mb-2">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-gray-900">{data?.user?.loyaltyPoints || 0} Points</span>
                                <span className="text-gray-400">{tier.next} Goal</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${tier.color} transition-all duration-1000 ease-out`}
                                    style={{ width: `${Math.min(((data?.user?.loyaltyPoints || 0) / tier.next) * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-2 font-medium">
                                Earn {tier.next - (data?.user?.loyaltyPoints || 0)} more points to reach next tier.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link href="/dashboard/rewards" className="flex items-center justify-between text-sm font-bold text-[#FF5F00] hover:text-[#E55500] transition-colors group">
                            View Rewards Catalog
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </Card>
            </motion.div>

            {/* 2. Stats & Trip Countdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Countdown Widget (Double Width) */}
                <motion.div variants={item} className="md:col-span-2">
                    <Card className="h-full border-none shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden relative group">
                        {data?.upcomingTrip ? (
                            <>
                                <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/50" />
                                {data.upcomingTrip.imageUrl && (
                                    <Image
                                        src={data.upcomingTrip.imageUrl}
                                        alt="Trip"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                                <CardContent className="relative z-20 flex flex-col justify-between h-full p-6 text-white">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-[#FF5F00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide animate-pulse">
                                            Upcoming
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-1 leading-tight">{data.upcomingTrip.activityTitle}</h3>
                                        <div className="flex items-center gap-2 text-white/90 text-sm mb-4">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(data.upcomingTrip.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                                            <div className="text-center">
                                                <span className="block text-xl font-bold">{timeLeft.days}</span>
                                                <span className="text-[10px] uppercase text-white/70">Days</span>
                                            </div>
                                            <div className="text-center border-l border-white/20">
                                                <span className="block text-xl font-bold">{timeLeft.hours}</span>
                                                <span className="text-[10px] uppercase text-white/70">Hours</span>
                                            </div>
                                            <div className="text-center border-l border-white/20">
                                                <span className="block text-xl font-bold">{timeLeft.minutes}</span>
                                                <span className="text-[10px] uppercase text-white/70">Mins</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </>
                        ) : (
                            <CardContent className="h-full flex flex-col items-center justify-center p-8 bg-gray-50/50">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                                    <MapPin className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No upcoming trips</h3>
                                <p className="text-gray-500 text-center text-sm mb-4">
                                    Your next adventure is waiting for you!
                                </p>
                                <Link href="/search">
                                    <Button variant="outline" className="rounded-full border-[#FF5F00] text-[#FF5F00] hover:bg-[#FF5F00] hover:text-white transition-all text-xs font-bold h-9">
                                        Explore Experiences
                                    </Button>
                                </Link>
                            </CardContent>
                        )}
                    </Card>
                </motion.div>

                {/* Quick Stats Grid */}
                <motion.div variants={item} className="grid grid-cols-2 gap-4 md:col-span-2">
                    <Link href="/dashboard/bookings" className="group">
                        <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-3xl p-5 flex flex-col justify-center items-center text-center cursor-pointer border border-gray-50 hover:border-orange-100">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-extrabold text-gray-900 mb-1">{data?.stats?.totalBookings || 0}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Trips</span>
                        </Card>
                    </Link>

                    <Link href="/dashboard/messages" className="group">
                        <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-3xl p-5 flex flex-col justify-center items-center text-center cursor-pointer border border-gray-50 hover:border-orange-100">
                            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative">
                                <MessageSquare className="w-6 h-6" />
                                {(data?.stats?.unreadMessages || 0) > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                                )}
                            </div>
                            <span className="text-3xl font-extrabold text-gray-900 mb-1">{data?.stats?.unreadMessages || 0}</span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">New Messages</span>
                        </Card>
                    </Link>

                    <Link href="/dashboard/wishlist" className="col-span-2 group">
                        <Card className="h-full border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white rounded-3xl p-4 flex items-center justify-between cursor-pointer border border-gray-50 hover:border-orange-100 relative overflow-hidden">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-lg font-bold text-gray-900">{data?.user?.wishlistCount || 0} Items</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">In My Wishlist</span>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF5F00] relative z-10 transition-colors" />

                            {/* Decorative Blob */}
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Card>
                    </Link>
                </motion.div>
            </div>

            {/* 3. Recommended / Trending (Mocked for now but visually integrated) */}
            <motion.div variants={item}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#FF5F00]" />
                        Recommended for You
                    </h2>
                    <Link href="/search" className="text-sm font-bold text-gray-400 hover:text-[#FF5F00] transition-colors">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data?.recommendations?.length ? (
                        data.recommendations.map((item, i) => (
                            <Link href={`/experiences/${item.id}`} key={i} className="group">
                                <Card className="h-full border-none shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300">
                                    <div className="h-48 relative bg-gray-200 overflow-hidden">
                                        {item.imageUrl ? (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-700" />
                                        )}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold shadow-sm">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            {item.rating}
                                        </div>
                                    </div>
                                    <CardContent className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#FF5F00] transition-colors line-clamp-1">{item.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-1">Unforgettable experience tailored for you.</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-extrabold text-xl text-gray-900">€{item.price}</span>
                                            <Button size="sm" className="rounded-full bg-black text-white hover:bg-[#FF5F00] transition-colors text-xs font-bold px-4">
                                                View
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        /* Fallback skeleton or empty state if no services found */
                        [1, 2, 3].map((_, i) => (
                            <Card key={i} className="border-none shadow-sm rounded-3xl overflow-hidden h-72 animate-pulse bg-gray-50">
                                <div className="h-40 bg-gray-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
