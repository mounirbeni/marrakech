import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(services)
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, description, price, images, category } = body

        const service = await prisma.service.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                images: JSON.stringify(images || []),
                category,
                duration: body.duration || 'TBD',
                location: body.location || 'Marrakech',
                features: JSON.stringify([]),
                included: JSON.stringify([]),
                whatToBring: JSON.stringify([]),
                tags: JSON.stringify([]),
                itinerary: JSON.stringify([]),
                host: JSON.stringify({}),
            },
        })

        return NextResponse.json(service)
    } catch (error) {
        console.error('Create service error:', error)
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        )
    }
}