import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default-secret-key-change-this'
);

async function getUserFromToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { id: string; email: string; role: string };
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get auth token from cookies
    const token = request.cookies.get('auth_token')?.value;
    const user = token ? await getUserFromToken(token) : null;
    const isAuthenticated = !!user;

    // Protected routes
    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isAdminRoute = pathname.startsWith('/admin');
    const isProfileRoute = pathname.startsWith('/profile');
    const isProtectedRoute = isDashboardRoute || isAdminRoute || isProfileRoute;

    // Public auth routes
    const isLoginRoute = pathname.startsWith('/login');
    const isRegisterRoute = pathname.startsWith('/register');

    // Redirect unauthenticated users to login
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Check admin role for admin routes
    if (isAdminRoute && isAuthenticated && user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect authenticated users away from login/register
    if ((isLoginRoute || isRegisterRoute) && isAuthenticated) {
        if (user?.role === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/profile/:path*',
        '/login',
        '/register'
    ],
}
