import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl
    const isLoggedIn = !!session?.user

    // 1. Protect /dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!isLoggedIn) {
            const url = new URL('/login', request.url)
            url.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(url)
        }
    }

    // 2. Protect /admin routes
    if (pathname.startsWith('/admin')) {
        // Check if user is logged in
        if (!isLoggedIn) {
            // If trying to access admin login page, let them through
            if (pathname === '/admin/login') {
                return NextResponse.next()
            }
            const url = new URL('/admin/login', request.url)
            url.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(url)
        }

        // Check if user has admin role (assuming role is in session)
        // Note: You might need to extend the session type to include role
        if (session?.user?.role !== 'ADMIN') {
            // Redirect to dashboard if logged in but not admin
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    // 3. Redirect logged-in users away from auth pages
    if (isLoggedIn) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if (pathname === '/admin/login') {
            if (session?.user?.role === 'ADMIN') {
                return NextResponse.redirect(new URL('/admin', request.url))
            } else {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|webp)).*)',
    ],
}
