import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const where = status && status !== 'ALL' ? { status } : {}

        const bookings = await prisma.booking.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(bookings)
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, activityId, activityTitle, date, guests, totalPrice } = body

        // Basic validation
        if (!name || !email || !activityId || !date || !guests) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const booking = await prisma.booking.create({
            data: {
                name,
                email,
                phone,
                activityId,
                activityTitle,
                date: new Date(date),
                guests: parseInt(guests),
                totalPrice: parseFloat(totalPrice),
                status: 'PENDING'
            },
        })

        return NextResponse.json({ booking }, { status: 201 })
    } catch (error) {
        console.error('Booking error:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        )
    }
}
