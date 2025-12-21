
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewExperiencePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Simplistic form state
    const [formData, setFormData] = useState({
        title: "",
        category: "desert",
        price: "",
        duration: "",
        description: "",
        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call for now, can be implemented later
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Experience created successfully!");
            router.push("/admin/experiences");
        } catch (error) {
            toast.error("Failed to create experience");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Create New Experience</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Experience Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <select
                                    id="category"
                                    name="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="desert">Desert</option>
                                    <option value="medina">Medina</option>
                                    <option value="atlas">Atlas Mountains</option>
                                    <option value="food">Food & Drink</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (€)</Label>
                                <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input id="duration" name="duration" placeholder="e.g. 4 hours" value={formData.duration} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="min-h-[100px]" required />
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create Experience"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
