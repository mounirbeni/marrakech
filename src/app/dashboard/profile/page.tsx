"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone, Shield, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "+212 600 000 000" // Mock phone for now
    });

    useEffect(() => {
        fetch("/api/user")
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("Failed to load user");
            })
            .then(data => {
                setUserData(prev => ({
                    ...prev,
                    name: data.name || "",
                    email: data.email || "",
                }));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Could not load profile");
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: userData.name }),
            });

            if (!res.ok) throw new Error("Failed to update");

            const updated = await res.json();
            setUserData(prev => ({ ...prev, name: updated.name }));
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 max-w-5xl mx-auto pb-10"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
                <p className="text-muted-foreground">
                    Manage your personal information and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar / User Card */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="overflow-hidden border-border/50 shadow-sm">
                        <div className="h-32 bg-gradient-to-r from-primary/80 to-primary/40"></div>
                        <CardContent className="pt-0 relative flex flex-col items-center text-center -mt-12">
                            <div className="relative">
                                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                                    <AvatarImage src="/avatars/01.png" />
                                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                                        {userData.name?.charAt(0) || "M"}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold mt-4">{userData.name || "User"}</h2>
                            <p className="text-sm text-muted-foreground">{userData.email}</p>

                            <div className="w-full mt-6 space-y-2">
                                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                                    <span className="text-muted-foreground">Member Since</span>
                                    <span className="font-medium">Dec 2025</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-muted/50 rounded-lg">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full text-xs">Active</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle>Personal Information</CardTitle>
                            </div>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        value={userData.name}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        value={userData.email}
                                        disabled
                                        className="pl-9 bg-muted/50"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Contact support to update your email address.</p>
                            </div>

                            <div className="grid gap-2 opacity-70">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        value={userData.phone}
                                        disabled
                                        className="pl-9 bg-muted/50"
                                        placeholder="+212 ..."
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Coming soon.</p>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end border-t bg-muted/20 py-4">
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-border/50 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle>Security & Preferences</CardTitle>
                            </div>
                            <CardDescription>Manage your security settings and notifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-card">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Bell className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive updates about your bookings.</p>
                                    </div>
                                </div>
                                <Input type="checkbox" className="h-5 w-5 accent-primary" defaultChecked disabled />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
}
