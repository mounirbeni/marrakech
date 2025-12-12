import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// Get all conversations for the logged-in user
export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const conversations = await (prisma as any).conversation.findMany({
            where: { userId: session.id as string },
            orderBy: { updatedAt: 'desc' },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1 // Get last message for preview
                }
            }
        });

        return NextResponse.json(conversations);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
    }
}

// Create a new conversation
export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { subject, content } = await request.json();

        if (!subject || !content) {
            return NextResponse.json({ error: 'Subject and content required' }, { status: 400 });
        }

        // Create conversation
        const conversation = await (prisma as any).conversation.create({
            data: {
                subject,
                userId: session.id as string,
                status: 'OPEN'
            }
        });

        // Create first message
        await (prisma as any).message.create({
            data: {
                content,
                sender: 'USER',
                conversationId: conversation.id,
                userId: session.id as string
            }
        });

        // Send auto-acknowledgment
        await (prisma as any).message.create({
            data: {
                content: "Thank you for submitting your support ticket. We've received your request and will respond as soon as possible. Feel free to add any additional information below.",
                sender: 'ADMIN',
                conversationId: conversation.id,
                userId: session.id as string,
                read: true
            }
        });

        return NextResponse.json(conversation);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
    }
}
