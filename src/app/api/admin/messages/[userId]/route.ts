import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // userId param is actually conversationId (folder named [userId])
        const { userId: conversationId } = await params;

        // Verify conversation exists
        const conversation = await (prisma as any).conversation.findUnique({
            where: { id: conversationId }
        });

        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        const messages = await (prisma as any).message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' }
        });

        // Mark user messages as read
        await (prisma as any).message.updateMany({
            where: { conversationId, sender: 'USER', read: false },
            data: { read: true }
        });

        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // userId param is actually conversationId (folder named [userId])
        const { userId: conversationId } = await params;
        const { content } = await request.json();

        // Verify conversation exists
        const conversation = await (prisma as any).conversation.findUnique({
            where: { id: conversationId }
        });

        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        const message = await (prisma as any).message.create({
            data: {
                content,
                sender: 'ADMIN',
                conversationId,
                userId: conversation.userId,
                read: true // Admin messages are auto-marked read
            }
        });

        // Update conversation timestamp
        await (prisma as any).conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
