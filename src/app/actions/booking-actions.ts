'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getBookings() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: {
                date: 'desc',
            },
        })
        return { success: true, data: bookings }
    } catch (error) {
        console.error('Failed to fetch bookings:', error)
        return { success: false, error: 'Failed to fetch bookings' }
    }
}

export async function confirmBooking(id: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { status: 'CONFIRMED' },
        })
        revalidatePath('/admin/bookings')
        return { success: true }
    } catch (error) {
        console.error('Failed to confirm booking:', error)
        return { success: false, error: 'Failed to confirm booking' }
    }
}

export async function deleteBooking(id: string) {
    try {
        await prisma.booking.delete({
            where: { id },
        })
        revalidatePath('/admin/bookings')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete booking:', error)
        return { success: false, error: 'Failed to delete booking' }
    }
}
