module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
};
const prisma = globalThis.prisma ?? prismaClientSingleton();
const __TURBOPACK__default__export__ = prisma;
if ("TURBOPACK compile-time truthy", 1) globalThis.prisma = prisma;
}),
"[project]/src/lib/admin-logic.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAdminAlerts",
    ()=>getAdminAlerts,
    "getAdminStats",
    ()=>getAdminStats,
    "getTopServices",
    ()=>getTopServices,
    "getUrgentStats",
    ()=>getUrgentStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
async function getAdminStats() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // Revenue Today
    const bookingsToday = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].booking.findMany({
        where: {
            createdAt: {
                gte: startOfDay
            },
            status: 'CONFIRMED'
        }
    });
    const revenueToday = bookingsToday.reduce((acc, b)=>acc + (b.totalPrice || 0), 0);
    return {
        revenueToday,
        bookingsToday: bookingsToday.length,
        activeUsers: 42,
        conversionRate: 3.2
    };
}
async function getAdminAlerts() {
    // 1. Unconfirmed bookings > 24h
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const unconfirmed = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].booking.findMany({
        where: {
            status: 'PENDING',
            createdAt: {
                lt: yesterday
            }
        }
    });
    const alerts = [];
    unconfirmed.forEach((b)=>{
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
    return alerts.sort((a, b)=>b.rawDate.getTime() - a.rawDate.getTime());
}
async function getUrgentStats() {
    const pendingBookings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].booking.count({
        where: {
            status: 'PENDING'
        }
    });
    const pendingSupport = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].supportRequest.count({
        where: {
            status: 'PENDING'
        }
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
async function getTopServices() {
    // 1. Group bookings by activityId
    const bookings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].booking.findMany({
        where: {
            status: 'CONFIRMED'
        },
        select: {
            activityId: true,
            activityTitle: true,
            totalPrice: true
        }
    });
    const serviceStats = {};
    bookings.forEach((b)=>{
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
        serviceStats[b.activityId].revenue += b.totalPrice || 0;
    });
    return Object.values(serviceStats).sort((a, b)=>b.bookingsCount - a.bookingsCount).slice(0, 5);
}
}),
"[project]/src/app/api/admin/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-logic.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        // TODO: Admin Auth Check
        const [stats, alerts, urgentStats, topServices] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminStats"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminAlerts"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUrgentStats"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTopServices"])()
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            stats,
            alerts,
            urgentStats,
            topServices
        });
    } catch (error) {
        console.error('Admin API Error:', error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Internal Server Error', {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2b531adc._.js.map