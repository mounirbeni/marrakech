import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Calendar, MapPin, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

export const UpcomingView = () => {

    const [checklist, setChecklist] = React.useState([
        { id: 1, label: "Check visa requirements", done: true },
        { id: 2, label: "Download offline maps", done: false },
        { id: 3, label: "Pack sunscreen", done: false }
    ]);

    const toggleItem = (id: number) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, done: !item.done } : item
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Hero Card */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground overflow-hidden relative">
                {/* Abstract Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <Badge variant="secondary" className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-none px-3 py-1">
                                <Plane className="w-3.5 h-3.5 mr-2" />
                                Upcoming Trip
                            </Badge>
                            <h1 className="text-3xl font-bold tracking-tight mb-2">Adventure in Marrakech</h1>
                            <div className="flex items-center gap-2 text-primary-foreground/90">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">Morocco</span>
                                <span className="opacity-60">•</span>
                                <span>3 Days to go</span>
                            </div>
                        </div>

                        {/* Countdown */}
                        <div className="flex gap-3">
                            {['03', '14', '25'].map((val, i) => (
                                <div key={i} className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-3 min-w-[70px] border border-white/10">
                                    <span className="text-2xl font-bold font-mono">{val}</span>
                                    <span className="text-[10px] uppercase tracking-wider opacity-80">
                                        {['Days', 'Hrs', 'Mins'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Itinerary */}
                <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Itinerary Preview
                            </h3>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                View Full <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>

                        <div className="relative border-l border-border/50 ml-3 space-y-6">
                            <div className="pl-6 relative">
                                <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-foreground">Arrival & Transfer</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Dec 18 • 14:00 PM
                                    </p>
                                </div>
                            </div>
                            <div className="pl-6 relative">
                                <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-foreground">Medina Food Tour</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Dec 19 • 10:00 AM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Checklist */}
                <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            Preparation
                        </h3>
                        <div className="space-y-3">
                            {checklist.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => toggleItem(item.id)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                                >
                                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all duration-200 ${item.done
                                            ? 'bg-primary border-primary text-primary-foreground scale-110'
                                            : 'border-muted-foreground/30 group-hover:border-primary/50'
                                        }`}>
                                        {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={`text-sm transition-all duration-200 ${item.done
                                            ? 'text-muted-foreground line-through opacity-70'
                                            : 'text-foreground'
                                        }`}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};
