export interface Booking {
    id: string
    name: string
    email: string
    phone?: string
    activityTitle: string
    guests: number
    date: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
    totalPrice?: number
}

export interface Service {
    id: string
    title: string
    category: string
    price: number
    images: string[]
    description?: string
    duration?: string
    location?: string
    maxPeople?: number
    languages?: string[]
    included?: string[]
    requirements?: string[]
    rating?: number
    reviews?: number
    features?: string[]
    whatToBring?: string[]
    itinerary?: any
    host?: any
    tags?: string[]
}

export interface User {
    id: string
    name: string | null
    email: string
    role: 'ADMIN' | 'USER'
    source?: 'REGISTERED' | 'NEWSLETTER'
    createdAt: string
    _count?: {
        bookings: number
    }
}

export interface Notification {
    id: string
    type: 'BOOKING' | 'COMPLAINT' | 'SYSTEM'
    title: string
    message: string
    read: boolean
    createdAt: string
    link?: string
}