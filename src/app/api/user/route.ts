import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.id },
            select: {
                id: true,
                name: true,
                email: true,
                // phone: true, // Field does not exist on User model
            }
        });

        // Wait, I need to check if schema has phone for User. 
        // If not, I should add it or just stick to name.

        return NextResponse.json(user);
    } catch (error) {
        console.error("User API Error:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { name } = body;

        const updatedUser = await prisma.user.update({
            where: { id: session.id },
            data: {
                name
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("User Update Error:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
