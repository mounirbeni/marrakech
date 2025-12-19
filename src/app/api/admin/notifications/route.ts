import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    const session = await getSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        // Since we don't have a dedicated Notification model in the schema yet,
        // we will generate notifications on the fly from recent events.
        // In a real app, you'd want a Notification table.
        // For this task, I'll simulate notifications based on recent bookings and complaints.

        const recentBookings = await prisma.booking.findMany({
            where: {
                status: 'PENDING'
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        })

        const recentComplaints = await prisma.supportRequest.findMany({
            where: {
                status: 'PENDING'
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        })

        // Fetch unread messages from users
        const unreadMessages = await (prisma as any).message.findMany({
            where: {
                sender: 'USER',
                read: false
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                user: {
                    select: { name: true }
                }
            }
        })

        const notifications = [
            ...recentBookings.map((b) => ({
                id: `booking-${b.id}`,
                type: 'BOOKING',
                title: 'New Booking',
                message: `${b.name} booked ${b.activityTitle}`,
                read: false, // In this simulation, pending items are "unread"
                createdAt: b.createdAt,
                link: '/admin/bookings'
            })),
            ...recentComplaints.map((c) => ({
                id: `complaint-${c.id}`,
                type: 'COMPLAINT',
                title: 'New Support Request',
                message: `${c.subject} from ${c.name}`,
                read: false,
                createdAt: c.createdAt,
                link: '/admin/complaints'
            })),
            ...unreadMessages.map((m: any) => ({
                id: `message-${m.id}`,
                type: 'MESSAGE',
                title: 'New Message',
                message: `From ${m.user?.name || 'User'}: ${m.content}`,
                read: false,
                createdAt: m.createdAt,
                link: '/admin/messages'
            }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        return NextResponse.json(notifications)
    } catch (error) {
        console.error('[NOTIFICATIONS_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
