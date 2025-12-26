"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Wallet, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function PaymentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Payments & Billing</h1>
                <p className="text-muted-foreground">
                    Manage your payment methods and view transaction history.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-dashed border-2 border-primary/20 bg-muted/5">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
                            <CreditCard className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Payment System Integration</CardTitle>
                        <CardDescription className="text-lg">
                            We are currently upgrading our secure payment infrastructure.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-sm font-medium">
                            <AlertCircle className="h-4 w-4" />
                            <span>Coming Soon</span>
                        </div>

                        <p className="text-center max-w-md text-muted-foreground">
                            Secure credit card processing and alternative payment methods will be available shortly. in the meantime, please contact support for any billing inquiries.
                        </p>

                        <div className="flex gap-4 opacity-50 pointer-events-none grayscale">
                            <div className="h-12 w-20 bg-card border rounded flex items-center justify-center">
                                <span className="font-bold text-xs">VISA</span>
                            </div>
                            <div className="h-12 w-20 bg-card border rounded flex items-center justify-center">
                                <span className="font-bold text-xs">Mastercard</span>
                            </div>
                            <div className="h-12 w-20 bg-card border rounded flex items-center justify-center">
                                <Wallet className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
