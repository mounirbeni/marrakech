'use client'

import { useState, useEffect } from 'react'
import { Service } from '@/types/admin'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services')
                if (!response.ok) {
                    throw new Error('Failed to fetch services')
                }
                const data = await response.json()
                setServices(data)
            } catch (err) {
                setError('Failed to load services')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchServices()
    }, [])

    if (loading) {
        return (
            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-6">Our Services</h1>
                <p>Loading services...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-6">Our Services</h1>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">Our Services</h1>
            <p className="text-muted-foreground mb-8">
                Explore our wide range of luxury services and experiences.
            </p>
            
            {services.length === 0 ? (
                <p>No services available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <Card key={service.id} className="flex flex-col">
                            {service.images && service.images[0] && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={service.images[0]}
                                        alt={service.title}
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                                <CardDescription>{service.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {service.description}
                                </p>
                                <div className="mt-4">
                                    <span className="text-lg font-bold">${service.price.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/services/${service.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}