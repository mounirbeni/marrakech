'use client'

import { useState, useEffect } from 'react'
import { Service } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

export default function ServiceDetailPage() {
    const params = useParams()
    const id = params?.id as string

    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;

            try {
                const response = await fetch(`/api/services/${id}`)
                if (!response.ok) {
                    if (response.status === 404) {
                        notFound()
                        return
                    }
                    throw new Error('Failed to fetch service')
                }
                const data = await response.json()
                setService(data)
            } catch (err) {
                setError('Failed to load service')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchService()
    }, [id])

    if (loading) {
        return (
            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-6">Service Details</h1>
                <p>Loading service...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-6">Service Details</h1>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!service) {
        return notFound()
    }

    return (
        <div className="container py-8">
            <Button variant="outline" className="mb-6" onClick={() => window.history.back()}>
                ← Back to Services
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
                    <p className="text-muted-foreground mb-6">{service.category}</p>

                    <div className="relative h-96 w-full rounded-lg overflow-hidden mb-6">
                        {service.images && service.images[0] ? (
                            <Image
                                src={service.images[0]}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                                <span className="text-gray-500">No image available</span>
                            </div>
                        )}
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{service.description}</p>
                        </CardContent>
                    </Card>

                    {service.itinerary && (
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Itinerary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {Array.isArray(service.itinerary) && service.itinerary.map((item: any, index: number) => (
                                        <li key={index} className="border-l-2 border-primary pl-4 py-1">
                                            <h3 className="font-semibold">{item.time} - {item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Information</CardTitle>
                            <CardDescription>
                                Reserve your spot for this experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Price:</span>
                                <span className="text-2xl font-bold">${service.price.toFixed(2)}</span>
                            </div>

                            <Button className="w-full" size="lg">
                                Book Now
                            </Button>

                            <div className="pt-4 border-t">
                                <h3 className="font-semibold mb-2">Details</h3>
                                <ul className="space-y-2 text-sm">
                                    {service.duration && (
                                        <li className="flex justify-between">
                                            <span>Duration:</span>
                                            <span>{service.duration}</span>
                                        </li>
                                    )}
                                    {service.location && (
                                        <li className="flex justify-between">
                                            <span>Location:</span>
                                            <span>{service.location}</span>
                                        </li>
                                    )}
                                    <li className="flex justify-between">
                                        <span>Rating:</span>
                                        <span>{service.rating}/5 ({service.reviews} reviews)</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}