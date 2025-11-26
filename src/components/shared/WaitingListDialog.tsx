"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Mail, CheckCircle2 } from "lucide-react";

interface WaitingListDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WaitingListDialog({ open, onOpenChange }: WaitingListDialogProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Save to localStorage
        const existingEmails = JSON.parse(localStorage.getItem("marrakech-waitlist") || "[]");
        if (!existingEmails.includes(email)) {
            existingEmails.push(email);
            localStorage.setItem("marrakech-waitlist", JSON.stringify(existingEmails));
        }

        setSubmitted(true);
        setEmail("");

        // Reset after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            onOpenChange(false);
        }, 3000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                {!submitted ? (
                    <>
                        <DialogHeader>
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Gift className="h-6 w-6 text-primary" />
                            </div>
                            <DialogTitle className="text-center text-2xl">Join Our Waiting List</DialogTitle>
                            <DialogDescription className="text-center">
                                Be the first to know about exclusive discounts, special offers, and new experiences in Marrakech!
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full rounded-full py-6">
                                Join Waiting List
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                We&apos;ll never share your email. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="py-8 text-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">You&apos;re on the list!</h3>
                        <p className="text-muted-foreground">
                            We&apos;ll notify you about exclusive offers and discounts soon.
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
