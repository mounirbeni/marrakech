
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, loginUser } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || email.split('@')[0],
                role: 'CLIENT',
            },
        });

        // Link existing bookings to this new user (History matching)
        await prisma.booking.updateMany({
            where: { email: user.email },
            data: { userId: user.id }
        });

        // Auto login
        await loginUser({ id: user.id, email: user.email, role: user.role, name: user.name });

        return NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Registration failed' },
            { status: 500 }
        );
    }
}
