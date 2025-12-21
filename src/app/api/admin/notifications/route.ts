import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
    const session = await getSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        // Fetch notifications from the database
        // Fetch notifications from the database
        // const notifications = await prisma.notification.findMany({
        //     orderBy: { createdAt: 'desc' },
        //     take: 20
        // })
        const notifications: any[] = []

        return NextResponse.json(notifications)
    } catch (error) {
        console.error('[NOTIFICATIONS_GET]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH() {
    const session = await getSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        // Mark all notifications as read
        // Mark all notifications as read
        // await prisma.notification.updateMany({
        //     where: {
        //         read: false
        //     },
        //     data: {
        //         read: true
        //     }
        // })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('[NOTIFICATIONS_PATCH]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
