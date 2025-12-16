import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, Phone, Ticket, LifeBuoy, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export const OngoingView = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Live Status Card */}
            <Card className="border-none shadow-xl bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />

                <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                                <span className="font-bold tracking-wider text-xs uppercase opacity-90">Happening Now</span>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold mb-2">Private Atlas Trek</h1>
                                <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        <span>Pickup at Hotel Lobby</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>Driver is 5 mins away</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button variant="secondary" className="rounded-full shadow-sm gap-2">
                                <Navigation className="w-4 h-4" /> Get Directions
                            </Button>
                            <Button variant="outline" className="rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white gap-2">
                                <Phone className="w-4 h-4" /> Contact Driver
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Actions */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    {[
                        { title: "My Tickets", icon: Ticket, color: "text-blue-500", bg: "bg-blue-500/10" },
                        { title: "Support", icon: LifeBuoy, color: "text-emerald-500", bg: "bg-emerald-500/10" }
                    ].map((item, i) => (
                        <Card key={i} className="hover:shadow-md transition-all cursor-pointer border-border/50 group">
                            <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <span className="font-medium">{item.title}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Suggestions */}
                <Card className="border-border/50 bg-muted/20">
                    <CardContent className="p-6">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">Recommended for Tonight</h3>
                        <div className="flex gap-4 items-center bg-background p-3 rounded-xl border border-border/50 shadow-sm">
                            <div className="h-12 w-12 bg-muted rounded-lg flex-shrink-0" />
                            <div>
                                <p className="font-medium text-sm">Sunset Dinner at Nomad</p>
                                <p className="text-xs text-muted-foreground">Perfect for after your trek.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};
