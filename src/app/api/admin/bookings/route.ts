import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const bookings = await prisma.booking.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { id, status } = body

        const booking = await prisma.booking.update({
            where: { id },
            data: { status }
        })

        return NextResponse.json(booking)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
        }

        await prisma.booking.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Booking deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
    }
}
