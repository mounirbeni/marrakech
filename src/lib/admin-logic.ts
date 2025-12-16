import prisma from '@/lib/prisma';
import { Booking } from '@prisma/client';

export interface AdminStats {
    revenueToday: number;
    bookingsToday: number;
    activeUsers: number; // Mocked for now
    conversionRate: number; // Mocked for now
}

export interface AdminAlert {
    id: string;
    type: 'CRITICAL' | 'WARNING' | 'INFO';
    title: string;
    time: string; // Relative time string for UI
    action: string;
    rawDate: Date;
}

export interface TopService {
    id: string;
    title: string;
    bookingsCount: number;
    revenue: number;
    rating: number;
}

export interface UrgentStats {
    pendingBookings: number;
    pendingSupport: number;
    pendingReviews: number;
}

export async function getAdminStats(): Promise<AdminStats> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Revenue Today
    const bookingsToday = await prisma.booking.findMany({
        where: {
            createdAt: { gte: startOfDay },
            status: 'CONFIRMED'
        }
    });

    const revenueToday = bookingsToday.reduce((acc: number, b: Booking) => acc + (b.totalPrice || 0), 0);

    return {
        revenueToday,
        bookingsToday: bookingsToday.length,
        activeUsers: 42, // Mock
        conversionRate: 3.2, // Mock
    };
}

export async function getAdminAlerts(): Promise<AdminAlert[]> {
    // 1. Unconfirmed bookings > 24h
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const unconfirmed = await prisma.booking.findMany({
        where: {
            status: 'PENDING',
            createdAt: { lt: yesterday }
        }
    });

    const alerts: AdminAlert[] = [];

    unconfirmed.forEach((b: Booking) => {
        alerts.push({
            id: `booking-${b.id}`,
            type: 'WARNING',
            title: `Unconfirmed Booking: ${b.name}`,
            time: '24h+',
            action: 'Review',
            rawDate: b.createdAt
        });
    });

    // 2. Mock some critical alerts for demo
    alerts.push({
        id: 'mock-1',
        type: 'CRITICAL',
        title: 'Payment Failed: Booking #B-998',
        time: '12m ago',
        action: 'Retry',
        rawDate: new Date(Date.now() - 12 * 60 * 1000)
    });

    return alerts.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
}

export async function getUrgentStats(): Promise<UrgentStats> {
    const pendingBookings = await prisma.booking.count({
        where: { status: 'PENDING' }
    });

    const pendingSupport = await prisma.supportRequest.count({
        where: { status: 'PENDING' }
    });

    // Assuming Review has some status or just recent ones, but schema has no status for Review.
    // We'll mimic this by checking reviews in the last 24h or just return 0 for now as 'Moderation Pending'
    // Actually schema has no status for review. Let's ignore or use a placeholder.
    const pendingReviews = 0;

    return {
        pendingBookings,
        pendingSupport,
        pendingReviews
    };
}

export async function getTopServices(): Promise<TopService[]> {
    // 1. Group bookings by activityId
    const bookings = await prisma.booking.findMany({
        where: { status: 'CONFIRMED' },
        select: { activityId: true, activityTitle: true, totalPrice: true }
    });

    const serviceStats: Record<string, TopService> = {};

    bookings.forEach(b => {
        if (!serviceStats[b.activityId]) {
            serviceStats[b.activityId] = {
                id: b.activityId,
                title: b.activityTitle,
                bookingsCount: 0,
                revenue: 0,
                rating: 4.8 // Mock rating for now as we don't have easy access to Service table relation here yet
            };
        }
        serviceStats[b.activityId].bookingsCount += 1;
        serviceStats[b.activityId].revenue += (b.totalPrice || 0);
    });

    return Object.values(serviceStats)
        .sort((a, b) => b.bookingsCount - a.bookingsCount)
        .slice(0, 5);
}
