import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    const session = await getSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const users = await prisma.user.findMany({
            where: { role: 'USER' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' }
        })

        const usersWithStats = await Promise.all(users.map(async (user) => {
            const bookingCount = user.email ? await prisma.booking.count({
                where: { user: { email: user.email } }
            }) : 0
            return {
                ...user,
                source: 'REGISTERED',
                createdAt: user.createdAt,
                _count: {
                    bookings: bookingCount
                }
            }
        }))

        // Removed newsletter logic

        const allCustomers = [...usersWithStats].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        return NextResponse.json(allCustomers)
    } catch (error) {
        console.error('[CUSTOMERS_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
