import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    const session = await getSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const [users, subscribers] = await Promise.all([
            prisma.user.findMany({
                where: { role: 'USER' },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.newsletterSubscriber.findMany({
                where: { active: true },
                orderBy: { createdAt: 'desc' }
            })
        ])

        const usersWithStats = await Promise.all(users.map(async (user: { email: string; createdAt: Date; id: string; name: string | null; role: string }) => {
            const bookingCount = await prisma.booking.count({
                where: { email: user.email }
            })
            return {
                ...user,
                source: 'REGISTERED',
                createdAt: user.createdAt,
                _count: {
                    bookings: bookingCount
                }
            }
        }))

        // Filter out subscribers who are already registered users
        const registeredEmails = new Set(users.map((u: { email: string }) => u.email))

        const subscribersList = subscribers
            .filter((s: { email: string }) => !registeredEmails.has(s.email))
            .map((s: { id: string; email: string; createdAt: Date }) => ({
                id: s.id,
                name: null,
                email: s.email,
                role: 'USER',
                source: 'NEWSLETTER',
                createdAt: s.createdAt,
                _count: {
                    bookings: 0
                }
            }))

        const allCustomers = [...usersWithStats, ...subscribersList].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        return NextResponse.json(allCustomers)
    } catch (error) {
        console.error('[CUSTOMERS_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
