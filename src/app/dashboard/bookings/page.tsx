"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, ArrowRight, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");

    // Mock data
    const bookings = [
        // Populate with mock data later or fetch from API
    ];

    const EmptyState = ({ type }: { type: string }) => (
        <Card className="border-dashed border-2 border-gray-200 shadow-none bg-gray-50/50 rounded-3xl py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <Calendar className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No {type} Bookings</h3>
                <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                    You don't have any {type} bookings at the moment.
                </p>
                <Link href="/search">
                    <Button className="rounded-full bg-[#FF5F00] hover:bg-[#E55500] text-white font-bold px-6">
                        Find an Adventure
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Bookings</h1>
                    <p className="text-gray-500 mt-1">Manage your upcoming and past trips.</p>
                </div>
                <Link href="/search">
                    <Button className="hidden md:flex bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-[#FF5F00] hover:text-[#FF5F00] font-bold rounded-full transition-all">
                        + Book New Trip
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-white border border-gray-100 p-1 rounded-full mb-8 h-auto shadow-sm inline-flex">
                    <TabsTrigger
                        value="upcoming"
                        className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-[#FF5F00] data-[state=active]:text-white transition-all"
                    >
                        Upcoming
                    </TabsTrigger>
                    <TabsTrigger
                        value="past"
                        className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-[#FF5F00] data-[state=active]:text-white transition-all"
                    >
                        Past
                    </TabsTrigger>
                    <TabsTrigger
                        value="cancelled"
                        className="rounded-full px-6 py-2.5 font-bold data-[state=active]:bg-[#FF5F00] data-[state=active]:text-white transition-all"
                    >
                        Cancelled
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {bookings.filter(b => b.status === "upcoming").length > 0 ? (
                        <div className="grid gap-4">
                            {/* Map bookings here */}
                        </div>
                    ) : (
                        <EmptyState type="upcoming" />
                    )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                    <EmptyState type="past" />
                </TabsContent>

                <TabsContent value="cancelled" className="space-y-4">
                    <EmptyState type="cancelled" />
                </TabsContent>
            </Tabs>
        </motion.div>
    );
}
