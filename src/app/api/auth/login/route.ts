
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { comparePassword, loginUser } from '@/lib/auth';

export async function POST(request: Request) {
    // Artificial delay to mitigate brute force attacks
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !(await comparePassword(password, user.password))) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        await loginUser({ id: user.id, email: user.email, role: user.role, name: user.name });

        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Login failed' },
            { status: 500 }
        );
    }
}
