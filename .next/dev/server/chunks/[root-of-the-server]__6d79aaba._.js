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
"[project]/src/lib/trip-logic.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "determineTripState",
    ()=>determineTripState
]);
function determineTripState(bookings) {
    if (!bookings || bookings.length === 0) {
        return 'NO_TRIP';
    }
    const now = new Date();
    // Sort bookings by date, most recent first
    const sortedBookings = [
        ...bookings
    ].sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    // Find the most relevant booking
    // Logic: 
    // 1. Is there a booking happening right now? (Ongoing)
    // 2. Is there a booking in the future? (Upcoming)
    // 3. Was there a booking recently? (Completed)
    // This is a simplified logic. In reality, a "Trip" might define a range of dates containing multiple bookings.
    // For now, we look at individual bookings.
    const upcomingBookings = sortedBookings.filter((b)=>new Date(b.date) > now && b.status === 'CONFIRMED');
    const pastBookings = sortedBookings.filter((b)=>new Date(b.date) <= now && b.status === 'CONFIRMED'); // And not cancelled
    if (upcomingBookings.length > 0) {
        // Check if the closest upcoming booking is actually "ongoing" (e.g. started 1 hour ago but lasts 4 hours)
        // For now, assuming "Upcoming" if start date is in future.
        // But wait, if we have a booking TODAY, it might be ongoing.
        // Let's refine.
        const nextBooking = upcomingBookings[upcomingBookings.length - 1]; // closest future booking
        const timeDiff = new Date(nextBooking.date).getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        if (hoursDiff < 24 && hoursDiff > -24) {
            // If it's within 24 hours? 
            // Actually, "Ongoing" usually means the user is physically there.
            // Let's assume distinct states for now.
            return 'UPCOMING';
        }
        return 'UPCOMING';
    }
    // If no upcoming bookings, check if we have any active/ongoing ones.
    // Since we filtered "upcoming" as > now, "past" is <= now.
    // If a booking started 1 hour ago, it's in "pastBookings" but technically "Ongoing" if it has duration.
    // We need duration.
    // For this MVP logic without duration parsing:
    // If the most recent past booking was within 24 hours, call it "ONGOING" or "COMPLETED" depending on logic.
    // Let's assume if it started < 12 hours ago, it's ONGOING.
    if (pastBookings.length > 0) {
        const lastBooking = pastBookings[0];
        const timeSinceStart = now.getTime() - new Date(lastBooking.date).getTime();
        const hoursSinceStart = timeSinceStart / (1000 * 60 * 60);
        if (hoursSinceStart < 12) {
            return 'ONGOING';
        }
        return 'COMPLETED';
    }
    return 'NO_TRIP';
}
}),
"[project]/src/app/api/dashboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trip$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trip-logic.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        // TODO: Get real User ID from session
        // const session = await getServerSession(authOptions);
        // if (!session) return new NextResponse('Unauthorized', { status: 401 });
        // const userId = session.user.id;
        // For development, we'll try to find a user with bookings, or fall back to a demo user.
        // Ideally, pass ?userId=... query param for testing if not auth.
        const { searchParams } = new URL(request.url);
        const userIdInfo = searchParams.get('userId');
        let userId = userIdInfo;
        if (!userId) {
            // Find a user with bookings for demo
            const demoUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findFirst({
                where: {
                    bookings: {
                        some: {}
                    }
                }
            });
            if (demoUser) userId = demoUser.id;
        }
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                state: 'NO_TRIP',
                bookings: [],
                message: 'No user found or no bookings.'
            });
        }
        const bookings = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].booking.findMany({
            where: {
                userId: userId
            },
            include: {
            }
        });
        const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trip$2d$logic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["determineTripState"])(bookings);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            state,
            bookings
        });
    } catch (error) {
        console.error('Dashboard API Error:', error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Internal Server Error', {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d79aaba._.js.map