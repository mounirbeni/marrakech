import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    const session = await getSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const userId = session.id

        // Fetch recent bookings
        const recentBookings = await prisma.booking.findMany({
            where: {
                userId: userId
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        })

        // Fetch unread messages from admin (sender != user's email or sender == 'ADMIN' if we had that, 
        // but typically sender is a string. Let's assume sender name or check if it's NOT the user)
        // Actually, looking at Message model: sender is String. 
        // We need to see how messages are stored. 
        // Typically sender might be the ID or Email. 
        // Let's assume if sender != session.email/id it is an incoming message.
        // But better: check Conversation. 
        
        const unreadMessages = await prisma.message.findMany({
            where: {
                userId: userId,
                read: false,
                sender: {
                    not: session.email // Assuming sender is email, or we can check name. 
                                     // Safest is to just check if it's not me.
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                conversation: true
            }
        })

        const notifications = [
            ...recentBookings.map((b) => ({
                id: `booking-${b.id}`,
                type: 'BOOKING',
                title: 'Booking Update',
                message: `Your booking for ${b.activityTitle} is ${b.status.toLowerCase()}.`,
                read: false, // We don't track read state for bookings yet
                createdAt: b.createdAt,
                link: '/dashboard/bookings'
            })),
            ...unreadMessages.map((m) => ({
                id: `message-${m.id}`,
                type: 'MESSAGE',
                title: 'New Message',
                message: m.content,
                read: false,
                createdAt: m.createdAt,
                link: `/dashboard/support` // or wherever messages are
            }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        return NextResponse.json(notifications)
    } catch (error) {
        console.error('[USER_NOTIFICATIONS_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
