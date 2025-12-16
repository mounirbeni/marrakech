import { NextResponse } from 'next/server';
import { getAdminStats, getAdminAlerts, getUrgentStats, getTopServices } from '@/lib/admin-logic';

export async function GET() {
    try {
        // TODO: Admin Auth Check

        const [stats, alerts, urgentStats, topServices] = await Promise.all([
            getAdminStats(),
            getAdminAlerts(),
            getUrgentStats(),
            getTopServices()
        ]);

        return NextResponse.json({
            stats,
            alerts,
            urgentStats,
            topServices
        });

    } catch (error) {
        console.error('Admin API Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
