"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Globe, Camera } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    const { data: session } = useSession();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
                </div>
                <Button className="bg-[#FF5F00] hover:bg-[#E55500] text-white">Save Changes</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Info */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-orange-100 to-orange-50" />
                        <CardContent className="relative pt-0 px-6 pb-6 text-center">
                            <div className="relative -mt-16 mb-4 inline-block">
                                <div className="h-32 w-32 rounded-full border-4 border-white bg-gradient-to-br from-[#FF5F00] to-[#E55500] flex items-center justify-center text-white text-4xl font-bold shadow-md">
                                    {session?.user?.name?.[0]?.toUpperCase() || 'T'}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-[#FF5F00] transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{session?.user?.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">{session?.user?.email}</p>
                            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                Verified Traveler
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Language</span>
                                <span className="text-sm font-medium text-gray-900">English (US)</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Currency</span>
                                <span className="text-sm font-medium text-gray-900">USD ($)</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Edit Form */}
                <div className="md:col-span-2">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullname">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="fullname" placeholder="John Doe" defaultValue={session?.user?.name || ''} className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="email" type="email" placeholder="john@example.com" defaultValue={session?.user?.email || ''} className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input id="location" placeholder="New York, USA" className="pl-10" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us a bit about yourself..."
                                />
                                <p className="text-xs text-gray-500">Brief description for your profile.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}
