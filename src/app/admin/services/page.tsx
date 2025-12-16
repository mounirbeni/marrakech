'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import Image from 'next/image'
import { Plus, Pencil, Trash2, MoreHorizontal, Search, Filter, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Service } from '@/types/admin'
import Link from 'next/link'

const fetcher = async (url: string) => {
    const res = await fetch(url)
    const text = await res.text()
    try {
        const data = JSON.parse(text)
        if (Array.isArray(data)) {
            return data.map((service: any) => ({
                ...service,
                images: typeof service.images === 'string' ? JSON.parse(service.images) : service.images,
                features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
                included: typeof service.included === 'string' ? JSON.parse(service.included) : service.included,
                whatToBring: typeof service.whatToBring === 'string' ? JSON.parse(service.whatToBring) : service.whatToBring,
                tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
                itinerary: typeof service.itinerary === 'string' ? JSON.parse(service.itinerary) : service.itinerary,
                host: typeof service.host === 'string' ? JSON.parse(service.host) : service.host,
            }))
        }
        return data
    } catch (e) {
        console.error(`JSON Parse Error for ${url}:`, text)
        throw e
    }
}

export default function ServicesPage() {
    const { data: services, error, isLoading } = useSWR<Service[]>('/api/services', fetcher)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('ALL')

    const handleCreate = async (data: Omit<Service, 'id'> | Partial<Service>) => {
        await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        mutate('/api/services')
        setIsDialogOpen(false)
    }

    const handleUpdate = async (data: Omit<Service, 'id'> | Partial<Service>) => {
        if (!editingService) return
        await fetch(`/api/services/${editingService.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        mutate('/api/services')
        setIsDialogOpen(false)
        setEditingService(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return
        await fetch(`/api/services/${id}`, {
            method: 'DELETE',
        })
        mutate('/api/services')
    }

    // Client-side filtering
    const filteredServices = services?.filter((service) => {
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = categoryFilter === 'ALL' || service.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const categories = Array.from(new Set(services?.map(s => s.category) || []))

    if (error) return <div>Failed to load services</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Services</h2>
                    <p className="text-muted-foreground">
                        Manage your services and experiences.
                    </p>
                </div>
                <Link href="/admin/services/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Services</CardTitle>
                    <CardDescription>
                        A list of all available services.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 flex-1 w-full md:max-w-sm">
                            <div className="relative flex-1">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search services..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <SelectValue placeholder="Filter by category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {(searchQuery || categoryFilter !== 'ALL') && (
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setSearchQuery('')
                                        setCategoryFilter('ALL')
                                    }}
                                    className="h-8 px-2 lg:px-3"
                                >
                                    Reset
                                    <XCircle className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredServices?.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell>
                                            {service.images[0] && (
                                                <div className="relative h-10 w-16 rounded overflow-hidden">
                                                    <Image
                                                        src={service.images[0]}
                                                        alt={service.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{service.title}</TableCell>
                                        <TableCell>{service.category}</TableCell>
                                        <TableCell>${service.price}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/services/${service.id}`} className="flex items-center">
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(service.id)} className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredServices?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No services found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
