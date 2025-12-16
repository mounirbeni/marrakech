"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, HelpCircle, Send, MessageSquare, Phone, Mail } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"

export function SupportSection() {
    const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq')

    return (
        <div className="space-y-6">
            {/* Custom Tabs */}
            <div className="flex p-1 bg-muted/50 rounded-xl w-full max-w-md mx-auto backdrop-blur-sm">
                <button
                    onClick={() => setActiveTab('faq')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'faq'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                        }`}
                >
                    <HelpCircle className="h-4 w-4" /> FAQ
                </button>
                <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'contact'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                        }`}
                >
                    <MessageSquare className="h-4 w-4" /> Contact Us
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'faq' ? <FAQPanel /> : <ContactFormPanel />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function FAQPanel() {
    const faqs = [
        {
            question: "How can I modify my booking?",
            answer: "You can modify your booking details (such as date, guests, or pickup location) up to 5 hours after making the reservation. Simply go to 'My Bookings', click the menu icon, and select 'Edit Details'."
        },
        {
            question: "What happens if I need to cancel?",
            answer: "Cancellations can be made through the 'My Bookings' section. If you cancel at least 24 hours before your trip, you are eligible for a full refund. Late cancellations may be subject to fees."
        },
        {
            question: "Where do I meet my driver?",
            answer: "If you provided a pickup location, your driver will meet you there. You will receive a notification with the driver's details and specific meeting point instructions 2 hours before your scheduled time."
        },
        {
            question: "Are tickets mobile-friendly?",
            answer: "Yes! You do not need to print anything. Just show the confirmation on your phone from the 'My Bookings' tab or the email sent to you."
        },
        {
            question: "How do I contact support in an emergency?",
            answer: "For urgent matters during a trip, please use the emergency phone number listed in your booking confirmation email. For general inquiries, use the 'Contact Us' form."
        }
    ]

    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions about your trip.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}

function ContactFormPanel() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        }

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error("Failed to submit support request")

            setSuccess(true)
            e.currentTarget.reset()
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-border/50 shadow-sm">
                <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>We typically respond within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-green-50/50 text-green-800 rounded-xl border border-green-100">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Message Sent!</h3>
                                <p className="text-muted-foreground">We'll get back to you shortly at your email address.</p>
                            </div>
                            <Button variant="outline" onClick={() => setSuccess(false)} className="mt-2">
                                Send another
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" name="name" placeholder="Your name" required className="bg-muted/30" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-muted/30" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <Input id="subject" name="subject" placeholder="What can we help with?" required className="bg-muted/30" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Describe your issue detailedly..."
                                    rows={5}
                                    required
                                    className="bg-muted/30 resize-none"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md text-sm">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                                {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5" /> Call Us
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-primary-foreground/80 text-sm mb-4">
                            Available daily from 8:00 AM to 8:00 PM (GMT+1)
                        </p>
                        <div className="text-2xl font-bold">+212 524 00 00 00</div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Mail className="h-5 w-5 text-primary" /> Email Support
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            For non-urgent inquiries:
                        </p>
                        <a href="mailto:support@marrakechEvent.com" className="text-primary hover:underline font-medium">
                            support@marrakechEvent.com
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
