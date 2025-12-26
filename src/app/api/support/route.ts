import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { subject, message, phone } = body;

        if (!subject || !message) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const supportRequest = await prisma.supportRequest.create({
            data: {
                name: session.name || 'User',
                email: session.email,
                phone: phone || null,
                subject,
                message,
                status: 'PENDING'
            }
        });

        // Optional: Create a notification for the user confirming receipt
        try {
            await prisma.notification.create({
                data: {
                    userId: session.id,
                    title: 'Support Request Received',
                    message: `We received your request: "${subject}". Our team will get back to you shortly.`,
                    type: 'INFO'
                }
            });
        } catch (e) {
            // Ignore notification error if schema isn't fully ready yet, but it should be.
        }

        return NextResponse.json(supportRequest);
    } catch (error) {
        console.error("Support API Error:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
