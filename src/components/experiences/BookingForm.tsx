"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    CalendarIcon,
    MessageCircle,
    Clock,
    User,
    Mail,
    Phone,
    Euro,
    Star,
    Award,
    Heart,
    MapPin,
    Plane,
    Languages,
    Utensils,
    FileText,
    Check,
    ArrowRight,
    CheckCircle,
    LogIn,
    UserPlus
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from "@/lib/types";

interface BookingFormProps {
    activity: Activity;
}

export function BookingForm({ activity }: BookingFormProps) {
    // Core Booking State
    const [date, setDate] = useState<Date>();
    const [guests, setGuests] = useState(2);
    const [selectedTime, setSelectedTime] = useState<string>("");

    // Contact Information
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Logistics & Preferences
    const [pickupLocation, setPickupLocation] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [language, setLanguage] = useState("English");
    const [dietary, setDietary] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    // UI State
    const [isLoading, setIsLoading] = useState(false);

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/status');
                const data = await res.json();
                setIsAuthenticated(data.authenticated);
            } catch (error) {
                console.error("Auth check failed", error);
            } finally {
                setAuthLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Activity Category Logic
    const isTransfer = activity.category === 'Transfers';
    const hasFood = ['City Trips & Excursions', 'Workshops', 'Entertainment'].includes(activity.category) || activity.tags?.includes('Food & Drink');

    // Helper: Package Logic
    const getFirstPackageName = () => {
        if (activity.packageCategories && activity.packageCategories.length > 0) {
            return activity.packageCategories[0]?.packages[0]?.name;
        }
        return activity.packages?.[0]?.name;
    };

    const findPackage = (packageName: string | undefined) => {
        if (!packageName) return undefined;
        if (activity.packageCategories) {
            for (const category of activity.packageCategories) {
                const pkg = category.packages.find(p => p.name === packageName);
                if (pkg) return pkg;
            }
        }
        return activity.packages?.find(p => p.name === packageName);
    };

    const [selectedPackageName, setSelectedPackageName] = useState<string | undefined>(
        getFirstPackageName()
    );

    // Reset state on activity change
    const [prevActivityId, setPrevActivityId] = useState(activity.id);
    if (activity.id !== prevActivityId) {
        setPrevActivityId(activity.id);
        setSelectedPackageName(getFirstPackageName());
        setDate(undefined);
        setSelectedTime("");
    }

    const selectedPackage = findPackage(selectedPackageName);
    const pricePerPerson = selectedPackage ? selectedPackage.price : activity.price;
    const totalPrice = pricePerPerson * guests;


    // Time Slots (Default 09:00 - 18:00 if not specified)
    // In a real app, this would come from availability API
    const timeSlots = Array.from({ length: 14 }, (_, i) => {
        const hour = i + 8; // 8 AM to 9 PM
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleSubmit = async () => {
        // Auth Guard
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        if (!date) {
            toast.error("Please select a preferred date");
            return;
        }
        if (!selectedTime && !isTransfer) { // Transfers might be 24/7, handled by flight time usually, but let's require 'Preferred Time' roughly
            toast.error("Please select a preferred time");
            return;
        }
        if (!name || !email || !phone) {
            toast.error("Please fill in all contact details");
            return;
        }
        if (isTransfer && !pickupLocation) {
            toast.error("Please provide flight details or pickup address");
            return;
        }

        setIsLoading(true);

        try {
            // Real API call
            const bookingData = {
                activityId: activity.id,
                activityTitle: activity.title,
                date: date.toISOString(),
                guests,
                totalPrice,
                package: selectedPackageName,
                contact: { name, email, phone },
                logistics: { pickupLocation, flightNumber },
                preferences: { language, dietary, specialRequests }
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Server API Error:", errorData);
                throw new Error(errorData.details || errorData.error || 'Booking submission failed');
            }

            const result = await response.json();
            console.log("Booking Success:", result);

            toast.success("Booking Request Sent!", {
                description: "Our concierge will contact you shortly to confirm details.",
                duration: 5000,
            });

            // Reset optional fields
            setName("");
            setEmail("");
            setPhone("");
            setSpecialRequests("");
            setDietary("");
            setFlightNumber("");

        } catch (err: any) {
            console.error("Submission Error:", err);
            toast.error(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="border-border/50 shadow-xl sticky top-24 bg-card ring-1 ring-white/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-amber-400 to-primary opacity-80" />

                <CardHeader className="pb-6 pt-8 bg-gradient-to-b from-secondary/30 to-transparent">
                    <div className="text-center space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Reserve Your Spot</p>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm text-muted-foreground align-top mt-2">from €</span>
                            <span className="text-5xl font-bold text-foreground tracking-tight font-serif">
                                {pricePerPerson}
                            </span>
                            <span className="text-muted-foreground text-sm font-medium">/ person</span>
                        </div>

                        {guests > 1 && (
                            <div className="pt-2 text-sm text-muted-foreground/80">
                                Total Estimate: <span className="text-foreground font-semibold">€{totalPrice}</span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-6 pb-6 space-y-8">
                    {/* 1. Review Package */}
                    {((activity.packageCategories && activity.packageCategories.length > 0) ||
                        (activity.packages && activity.packages.length > 0)) && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                                    <Award className="w-3 h-3" /> Select Package
                                </Label>
                                <RadioGroup
                                    value={selectedPackageName}
                                    onValueChange={setSelectedPackageName}
                                    className="flex flex-col gap-3"
                                >
                                    {activity.packageCategories ? (
                                        activity.packageCategories.map(cat => (
                                            <div key={cat.name} className="space-y-2">
                                                <p className="text-xs font-semibold text-primary/80 pl-1">{cat.name}</p>
                                                {cat.packages.map(pkg => (
                                                    <div key={pkg.name} className={`
                                                relative flex items-start space-x-3 rounded-xl border p-4 transition-all cursor-pointer hover:bg-secondary/40
                                                ${selectedPackageName === pkg.name ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border bg-card'}
                                            `}>
                                                        <RadioGroupItem value={pkg.name} id={pkg.name} className="mt-1" />
                                                        <div className="grid gap-1.5 w-full">
                                                            <div className="flex justify-between items-start">
                                                                <Label htmlFor={pkg.name} className="font-semibold cursor-pointer">{pkg.name}</Label>
                                                                <span className="font-bold text-primary">€{pkg.price}</span>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground leading-relaxed">{pkg.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))
                                    ) : (
                                        activity.packages?.map(pkg => (
                                            <div key={pkg.name} className={`
                                        relative flex items-start space-x-3 rounded-xl border p-4 transition-all cursor-pointer hover:bg-secondary/40
                                        ${selectedPackageName === pkg.name ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border bg-card'}
                                    `}>
                                                <RadioGroupItem value={pkg.name} id={pkg.name} className="mt-1" />
                                                <div className="grid gap-1.5 w-full">
                                                    <div className="flex justify-between items-start">
                                                        <Label htmlFor={pkg.name} className="font-semibold cursor-pointer">{pkg.name}</Label>
                                                        <span className="font-bold text-primary">€{pkg.price}</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">{pkg.description}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </RadioGroup>
                            </div>
                        )}

                    <Separator className="bg-border/50" />

                    {/* 2. Date & Time */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Date & Time
                        </Label>

                        <div className="grid gap-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal h-12 border-input/60 bg-background/80 hover:bg-background transition-colors",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
                                        {date ? format(date, "EEE, MMMM do, yyyy") : <span>Select preferred date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(d) => d < new Date()}
                                        initialFocus
                                        className="p-3 pointer-events-auto"
                                    />
                                </PopoverContent>
                            </Popover>

                            {!isTransfer && (
                                <Select value={selectedTime} onValueChange={setSelectedTime}>
                                    <SelectTrigger className="h-12 border-input/60 bg-background/80 hover:bg-background transition-colors">
                                        <SelectValue placeholder="Select start time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map(time => (
                                            <SelectItem key={time} value={time}>{time}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>

                    {/* 3. Guests */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                            <User className="w-3 h-3" /> Guests
                        </Label>
                        <div className="flex items-center justify-between rounded-xl border border-input/60 bg-background/80 p-3 shadow-sm">
                            <span className="text-sm font-medium pl-2">Number of people</span>
                            <div className="flex items-center gap-3">
                                <Button
                                    type="button" variant="outline" size="icon" className="h-8 w-8 rounded-full border-input/60 hover:bg-secondary"
                                    onClick={() => setGuests(Math.max(1, guests - 1))}
                                    disabled={guests <= 1}
                                >
                                    -
                                </Button>
                                <span className="w-4 text-center font-bold text-lg">{guests}</span>
                                <Button
                                    type="button" variant="outline" size="icon" className="h-8 w-8 rounded-full border-input/60 hover:bg-secondary"
                                    onClick={() => setGuests(Math.min(activity.maxGroupSize || 20, guests + 1))}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-border/50" />

                    {/* 4. Contact & Logistics */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                            <FileText className="w-3 h-3" /> Your Details
                        </Label>

                        <div className="grid gap-3">
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                                <Input className="pl-10 h-12 bg-background/80 border-input/60 focus:bg-background transition-colors text-base" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                                <Input className="pl-10 h-12 bg-background/80 border-input/60 focus:bg-background transition-colors text-base" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                                <Input className="pl-10 h-12 bg-background/80 border-input/60 focus:bg-background transition-colors text-base" type="tel" placeholder="WhatsApp Number (e.g. +44...)" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>

                            {/* Logistics */}
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                                <Input
                                    className="pl-10 h-12 bg-background/80 border-input/60 focus:bg-background transition-colors text-base"
                                    placeholder={isTransfer ? "Pick-up Address / Hotel" : "Pick-up Hotel / Riad"}
                                    value={pickupLocation}
                                    onChange={e => setPickupLocation(e.target.value)}
                                />
                            </div>

                            {isTransfer && (
                                <div className="relative">
                                    <Plane className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                                    <Input
                                        className="pl-10 h-11 bg-background/80 border-input/60 focus:bg-background transition-colors"
                                        placeholder="Flight Number (if airport pickup)"
                                        value={flightNumber}
                                        onChange={e => setFlightNumber(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 5. Preferences */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                            <Check className="w-3 h-3" /> Preferences
                        </Label>

                        <div className="grid gap-3">
                            <div className="relative">
                                <Languages className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger className="pl-10 h-11 bg-background/80 border-input/60 focus:bg-background transition-colors">
                                        <SelectValue placeholder="Preferred Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="French">French</SelectItem>
                                        <SelectItem value="Spanish">Spanish</SelectItem>
                                        <SelectItem value="Arabic">Arabic</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {hasFood && (
                                <div className="relative">
                                    <Utensils className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                                    <Input
                                        className="pl-10 h-11 bg-background/80 border-input/60 focus:bg-background transition-colors"
                                        placeholder="Dietary Requirements (e.g. Vegetarian)"
                                        value={dietary}
                                        onChange={e => setDietary(e.target.value)}
                                    />
                                </div>
                            )}

                            <Textarea
                                className="min-h-[80px] bg-background/80 border-input/60 focus:bg-background resize-none text-sm transition-colors"
                                placeholder="Any special requests or celebrations? (Birthday, Anniversary...)"
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <CardFooter className="flex flex-col gap-4 py-6 bg-gradient-to-t from-background to-transparent border-t border-border/40">
                    <Button
                        className="w-full h-14 text-base font-bold tracking-wide rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98] bg-gradient-to-r from-primary to-amber-600 hover:to-amber-500 text-white"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isLoading || authLoading}
                    >
                        {isLoading ? (
                            "Processing Request..."
                        ) : authLoading ? (
                            "Checking availability..."
                        ) : (
                            <span className="flex items-center gap-2">
                                Request Availability <ArrowRight className="w-5 h-5" />
                            </span>
                        )}
                    </Button>

                    <div className="space-y-3 w-full">
                        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground px-1">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-primary" /> Free Cancellation
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-primary" /> No Payment Required
                            </span>
                        </div>

                        <div className="bg-secondary/30 rounded-lg p-3 text-center border border-primary/10 space-y-2">
                            <p className="text-xs text-muted-foreground text-center">
                                <span className="font-semibold text-foreground">Concierge Promise:</span> You&apos;ll receive a personalized confirmation within 2 hours.
                            </p>
                            <p className="text-[10px] text-muted-foreground/80 border-t border-primary/5 pt-2">
                                Every experience is verified for quality and safety standards.
                            </p>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold text-primary">Join us to Reserve</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            Please log in or create an account to book your experience. This allows you to manage your bookings and get real-time updates.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button
                            className="w-full text-base font-semibold"
                            size="lg"
                            onClick={() => {
                                const returnUrl = encodeURIComponent(window.location.href);
                                window.location.href = `/login?from=${returnUrl}`;
                            }}
                        >
                            <LogIn className="w-4 h-4 mr-2" /> Log In
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full text-base font-semibold"
                            size="lg"
                            onClick={() => {
                                const returnUrl = encodeURIComponent(window.location.href);
                                window.location.href = `/register?from=${returnUrl}`;
                            }}
                        >
                            <UserPlus className="w-4 h-4 mr-2" /> Create Account
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}